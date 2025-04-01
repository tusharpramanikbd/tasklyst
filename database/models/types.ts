/** @format */

import { Model } from "@nozbe/watermelondb";

export interface ITaskDocDB extends Model {
  taskDate: string;
}

export interface ITaskDB extends Model {
  title: string;
  isDone: boolean;
  createdAt: number;
  updatedAt: number;
  taskDoc: {
    set: (model: ITaskDocDB) => void;
  };
}
