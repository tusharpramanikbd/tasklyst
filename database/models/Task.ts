/** @format */

import { Model } from "@nozbe/watermelondb";
import { field, date, relation } from "@nozbe/watermelondb/decorators";
import TaskDoc from "./TaskDoc";

export default class Task extends Model {
  static table = "tasks";

  @field("task_doc_id")
  taskDocId: string;

  @relation("task_docs", "task_doc_id")
  taskDoc: TaskDoc;

  @field("title")
  title: string;

  @field("is_done")
  isDone: boolean;

  @date("created_at")
  createdAt: Date;

  @date("updated_at")
  updatedAt: Date;
}
