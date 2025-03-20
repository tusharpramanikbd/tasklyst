/** @format */

// In a types file or near your models
import { Model } from "@nozbe/watermelondb";

export interface TaskDocType extends Model {
  taskDate: number;
}

export interface TaskType extends Model {
  title: string;
  isDone: boolean;
  createdAt: number;
  taskDoc: {
    set: (model: TaskDocType) => void;
  };
}
