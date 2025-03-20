/** @format */

import { useState } from "react";
import db from "@/database";
import { Q } from "@nozbe/watermelondb";
import { TaskDocType, TaskType } from "@/database/models/types";

const useDBTaskManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const taskDocsCollection = db.get<TaskDocType>("task_docs");
  const tasksCollection = db.get<TaskType>("tasks");

  const addTask = async (
    title: string,
    date: Date,
  ): Promise<TaskType | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const dateTimestamp = new Date(date).getTime();

      let newTask: TaskType | null = null;

      await db.write(async () => {
        // Find or create task_doc for the given date
        const existingTaskDoc = await taskDocsCollection
          .query(Q.where("task_date", Q.eq(dateTimestamp)))
          .fetch();

        let taskDoc;
        if (existingTaskDoc.length === 0) {
          taskDoc = await taskDocsCollection.create((doc) => {
            doc.taskDate = dateTimestamp;
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

  const getTasksByDate = async (date: Date): Promise<TaskType[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const dateTimestamp = new Date(date).getTime();

      // Find the task_doc for this date
      const taskDocs = await taskDocsCollection
        .query(Q.where("task_date", Q.eq(dateTimestamp)))
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
  };
};

export default useDBTaskManager;
