import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class PortfolioTable1674472866512 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'portfolios',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'name',
                type: 'varchar',
                isUnique: false,
                isNullable: false,
            }, {
                name: 'description',
                type: 'varchar',
                isUnique: false,
                isNullable: true,
            }, {
                name: 'user_id',
                type: 'int',
            }, {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }, {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }]
        }), true);

        await queryRunner.createForeignKey(
            'portfolios',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('portfolios');
    }
}