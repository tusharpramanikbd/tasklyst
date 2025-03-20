/** @format */

import { useCallback, useEffect, useState } from "react";
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
  const [observingDate, setObservingDate] = useState<string | null>(null);

  const taskDocsCollection = db.get<ITaskDocDB>("task_docs");
  const tasksCollection = db.get<ITaskDB>("tasks");

  useEffect(() => {
    if (!observingDate) return;

    let subscription: any;

    const setupObservable = async () => {
      try {
        const taskDocs = await taskDocsCollection
          .query(Q.where("task_date", Q.eq(observingDate)))
          .fetch();

        if (taskDocs.length === 0) {
          setTaskLists([]);
          return;
        }

        const observable = tasksCollection
          .query(Q.where("task_doc_id", Q.eq(taskDocs[0]?._raw?.id)))
          .observe();

        subscription = observable.subscribe((updatedTasks) => {
          setTaskLists(convertTasksDBToTask(updatedTasks));
        });
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred"),
        );
        console.error("Error setting up observable:", err);
      }
    };

    setupObservable();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [observingDate, taskDocsCollection, tasksCollection]);

  const observeTasksByDate = useCallback((date: string) => {
    setObservingDate(date);
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

  return {
    isLoading,
    error,
    addTask,
    taskLists,
    observeTasksByDate,
  };
};

export default useDBTaskManager;
