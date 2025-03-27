/** @format */

import { useCallback, useEffect, useState } from "react";
import db from "@/database";
import { Q } from "@nozbe/watermelondb";
import { ITaskDocDB, ITaskDB } from "@/database/models/types";
import { ITask } from "@/components/TaskItem/types";

const convertDBTasksToTask = (tasks: ITaskDB[]): ITask[] => {
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
  const [taskDocId, setTaskDocId] = useState<string | null>(null);

  const taskDocsCollection = db.get<ITaskDocDB>("task_docs");
  const tasksCollection = db.get<ITaskDB>("tasks");

  useEffect(() => {
    if (!observingDate) return;

    let taskSubscription: any;
    let taskDocSubscription: any;

    const setupObservable = async () => {
      try {
        taskDocSubscription = taskDocsCollection
          .query(Q.where("task_date", Q.eq(observingDate)))
          .observe()
          .subscribe((taskDocs) => {
            if (taskDocs.length === 0) {
              setTaskLists([]);
              setTaskDocId(null);
              return;
            }

            setTaskDocId(taskDocs[0]?._raw?.id);
          });

        if (!taskDocId) return;

        const observable = tasksCollection
          .query(Q.where("task_doc_id", Q.eq(taskDocId)))
          .observe();

        taskSubscription = observable.subscribe((updatedTasks) => {
          setTaskLists(convertDBTasksToTask(updatedTasks));
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
      if (taskSubscription) {
        taskSubscription.unsubscribe();
      }

      if (taskDocSubscription) {
        taskDocSubscription.unsubscribe();
      }
    };
  }, [observingDate, taskDocId, taskDocsCollection, tasksCollection]);

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

  const deleteTask = async (taskId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const taskToDelete = await tasksCollection.find(taskId);
      if (!taskToDelete) {
        throw new Error(`Task with ID ${taskId} not found`);
      }

      await db.write(async () => {
        await taskToDelete.destroyPermanently();
      });

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete task";

      setError(new Error(errorMessage));
      console.error("Error deleting task:", err);
      return false;
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
    deleteTask,
  };
};

export default useDBTaskManager;
