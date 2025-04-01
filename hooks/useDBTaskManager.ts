/** @format */

import { useCallback, useEffect, useState } from "react";
import db from "@/database";
import { Q } from "@nozbe/watermelondb";
import { ITaskDocDB, ITaskDB } from "@/database/models/types";
import { ITask } from "@/components/Task/TaskItem/types";
import { useDateContext } from "@/contexts/DateContext";

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
  const { formattedDate } = useDateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [taskLists, setTaskLists] = useState<ITask[]>([]);

  const taskDocCollection = db.get<ITaskDocDB>("task_docs");
  const taskCollection = db.get<ITaskDB>("tasks");

  const fetchData = useCallback(async () => {
    if (!formattedDate) return;

    const taskDoc = await taskDocCollection
      .query(Q.where("task_date", Q.eq(formattedDate)))
      .fetch();

    if (taskDoc.length === 0) {
      setTaskLists([]);
      return;
    }

    const taskDocId = taskDoc[0]?._raw?.id;

    const tasks = await taskCollection
      .query(Q.where("task_doc_id", Q.eq(taskDocId)))
      .fetch();

    setTaskLists(() => {
      return [...convertDBTasksToTask(tasks)];
    });
  }, [formattedDate, taskCollection, taskDocCollection]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTask = async (title: string, date: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await db.write(async () => {
        const existingTaskDoc = await taskDocCollection
          .query(Q.where("task_date", Q.eq(date)))
          .fetch();

        let taskDoc;
        if (existingTaskDoc.length === 0) {
          taskDoc = await taskDocCollection.create((doc) => {
            doc.taskDate = date;
          });
        } else {
          taskDoc = existingTaskDoc[0];
        }

        await taskCollection
          .create((task) => {
            task.title = title;
            task.isDone = false;
            task.createdAt = Date.now();
            task.taskDoc.set(taskDoc);
          })
          .then(async () => {
            await fetchData();
          });
      });
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred"),
      );
      console.error("Error adding task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const taskToDelete = await taskCollection.find(taskId);
      if (!taskToDelete) {
        throw new Error(`Task with ID ${taskId} not found`);
      }

      await db.write(async () => {
        await taskToDelete.destroyPermanently().then(async () => {
          await fetchData();
        });
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete task";

      setError(new Error(errorMessage));
      console.error("Error deleting task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async ({
    taskId,
    taskName,
    isDone,
  }: {
    taskId: string;
    taskName?: string;
    isDone?: boolean;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const taskToUpdate = await taskCollection.find(taskId);
      if (!taskToUpdate) {
        throw new Error(`Task with ID ${taskId} not found`);
      }

      await db.write(async () => {
        await taskToUpdate
          .update((task) => {
            task.title = taskName ?? task.title;
            task.isDone = isDone ?? task.isDone;
          })
          .then(async () => {
            await fetchData();
          });
      });
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred"),
      );
      console.error("Error updating task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    taskLists,
    addTask,
    deleteTask,
    updateTask,
  };
};

export default useDBTaskManager;
