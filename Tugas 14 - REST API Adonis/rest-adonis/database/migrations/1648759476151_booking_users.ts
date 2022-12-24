import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class BookingUser extends BaseSchema {
  protected tableName = "booking_user";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().references("users.id");
      table.integer("booking_id").unsigned().references("bookings.id");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true);
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
