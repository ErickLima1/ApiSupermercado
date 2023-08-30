import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProduto1692297823616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produto",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                    },
                    {
                        name: "quantidade",
                        type: "integer",
                        default: 0
                    },
                    {
                        name: "validade",
                        type: "timestamp",
                        default: `CURRENT_TIMESTAMP + INTERVAL '40 days'`,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_produto_category",
                        columnNames: ["category_id"],
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                    },
                ]
            })
        );
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produto");

    }
};

