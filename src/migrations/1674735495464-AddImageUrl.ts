import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddImageUrl1674735495464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('images', new TableColumn({
            name: 'image_url',
            type: 'varchar',
            isNullable: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('images', 'image_url');
    }

}
