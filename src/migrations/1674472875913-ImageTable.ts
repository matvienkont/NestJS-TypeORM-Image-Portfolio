import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class ImageTable1674472875913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'portfolio_id',
                type: 'int',
                isNullable: false,
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
            'images',
            new TableForeignKey({
                columnNames: ['portfolio_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'portfolios',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }
}
