/** @format */

import schema from "./schema";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Database } from "@nozbe/watermelondb";
import migrations from "./migrations";
import TaskDoc from "./models/TaskDoc";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
});

const database = new Database({
  adapter,
  modelClasses: [
    // Define models here
    TaskDoc,
  ],
});

export default database;
