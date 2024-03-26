import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CustomerOrder1698321500514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order_list",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "canceled", type: "smallint" },
          { name: "qty", type: "int" },
          { name: "total", type: "int" },
        ],
      }),
      true
    );
    await queryRunner.addColumn(
      "order_list",
      new TableColumn({
        name: "userId",
        type: "int",
        unsigned: true,
      })
    );
    await queryRunner.createForeignKey(
      "order_list",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order_list"`, undefined);
  }
}
