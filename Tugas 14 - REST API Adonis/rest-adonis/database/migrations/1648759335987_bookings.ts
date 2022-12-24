import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Bookings extends BaseSchema {
  protected tableName = "bookings";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.datetime("play_date_start").notNullable();
      table.datetime("play_date_end").notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true);
      // table.timestamp("created_at", { useTz: true });
      // table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
