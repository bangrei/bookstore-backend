import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1698321500514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "firstName", type: "varchar" },
          { name: "lastName", type: "varchar" },
          { name: "email", type: "varchar" },
          { name: "password", type: "text" },
          { name: "points", type: "int" },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }
}
