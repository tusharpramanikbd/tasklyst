/** @format */

import schema from "./schema";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Database } from "@nozbe/watermelondb";
import migrations from "./migrations";
import TaskDoc from "./models/TaskDoc";
import Task from "./models/Task";
const adapter = new SQLiteAdapter({
  schema,
  migrations,
});

const database = new Database({
  adapter,
  modelClasses: [
    // Define models here
    TaskDoc,
    Task,
  ],
});

export default database;
