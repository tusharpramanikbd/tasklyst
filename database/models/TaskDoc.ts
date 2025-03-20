/** @format */

import { Model } from "@nozbe/watermelondb";
import { children, date } from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";
import Task from "./Task";

export default class TaskDoc extends Model {
  static table = "task_docs";
  static associations: Associations = {
    tasks: {
      type: "has_many",
      foreignKey: "task_doc_id",
    },
  };

  @children("tasks") tasks: Task[];

  @date("task_date")
  taskDate: Date;
}
