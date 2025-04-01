/** @format */

import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "task_docs",
      columns: [
        {
          name: "task_date",
          type: "string",
        },
      ],
    }),
    tableSchema({
      name: "tasks",
      columns: [
        {
          name: "task_doc_id",
          type: "string",
          isIndexed: true,
        },
        {
          name: "title",
          type: "string",
        },
        {
          name: "is_done",
          type: "boolean",
        },
        {
          name: "created_at",
          type: "number",
        },
        {
          name: "updated_at",
          type: "number",
        },
      ],
    }),
  ],
});
