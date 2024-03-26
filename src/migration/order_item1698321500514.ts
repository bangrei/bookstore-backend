import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class OrderItem1698321500514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "item_list",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "qty", type: "int" },
          { name: "point", type: "int" },
        ],
      }),
      true
    );
    await queryRunner.addColumn(
      "item_list",
      new TableColumn({
        name: "orderId",
        type: "int",
        unsigned: true,
      })
    );
    await queryRunner.addColumn(
      "item_list",
      new TableColumn({
        name: "bookId",
        type: "int",
        unsigned: true,
      })
    );
    await queryRunner.createForeignKey(
      "item_list",
      new TableForeignKey({
        columnNames: ["orderId"],
        referencedColumnNames: ["id"],
        referencedTableName: "order_list",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "item_list",
      new TableForeignKey({
        columnNames: ["bookId"],
        referencedColumnNames: ["id"],
        referencedTableName: "books",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "item_list"`, undefined);
  }
}
