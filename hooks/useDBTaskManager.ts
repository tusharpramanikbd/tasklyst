/** @format */

import { useEffect, useState } from "react";
import db from "@/database";
import { Q } from "@nozbe/watermelondb";
import { ITaskDocDB, ITaskDB } from "@/database/models/types";
import { ITask } from "@/components/TaskItem/types";

const convertTasksDBToTask = (tasks: ITaskDB[]): ITask[] => {
  return tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      isDone: task.isDone,
    };
  });
};

const useDBTaskManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [taskLists, setTaskLists] = useState<ITask[]>([]);

  const taskDocsCollection = db.get<ITaskDocDB>("task_docs");
  const tasksCollection = db.get<ITaskDB>("tasks");

  useEffect(() => {
    const subscription = tasksCollection
      .query()
      .observe()
      .subscribe((tasks) => {
        setTaskLists(convertTasksDBToTask(tasks));
      });

    return () => subscription.unsubscribe();
  }, []);

  const addTask = async (
    title: string,
    date: string,
  ): Promise<ITaskDB | null> => {
    setIsLoading(true);
    setError(null);

    try {
      let newTask: ITaskDB | null = null;

      await db.write(async () => {
        // Find or create task_doc for the given date
        const existingTaskDoc = await taskDocsCollection
          .query(Q.where("task_date", Q.eq(date)))
          .fetch();

        let taskDoc;
        if (existingTaskDoc.length === 0) {
          taskDoc = await taskDocsCollection.create((doc) => {
            doc.taskDate = date;
          });
        } else {
          taskDoc = existingTaskDoc[0];
        }

        // Create the task
        newTask = await tasksCollection.create((task) => {
          task.title = title;
          task.isDone = false;
          task.createdAt = Date.now();
          task.taskDoc.set(taskDoc);
        });
      });

      return newTask;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred"),
      );
      console.error("Error adding task:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getTasksByDate = async (date: string): Promise<ITaskDB[]> => {
    setIsLoading(true);
    setError(null);

    try {
      // Find the task_doc for this date
      const taskDocs = await taskDocsCollection
        .query(Q.where("task_date", Q.eq(date)))
        .fetch();

      if (taskDocs.length === 0) {
        return [];
      }

      // Get all tasks associated with this task_doc
      const tasks = await tasksCollection
        .query(Q.where("task_doc_id", Q.eq(taskDocs[0].id)))
        .fetch();

      return tasks;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred"),
      );
      console.error("Error getting tasks by date:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    addTask,
    getTasksByDate,
    taskLists,
  };
};

export default useDBTaskManager;
