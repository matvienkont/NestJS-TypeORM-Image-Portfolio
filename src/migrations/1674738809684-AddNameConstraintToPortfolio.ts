import { MigrationInterface, QueryRunner, TableUnique } from "typeorm"

export class AddNameConstraintToPortfolio1674738809684 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createUniqueConstraint('portfolios', new TableUnique({ columnNames: ['name', 'user_id'] }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint('portfolios', new TableUnique({ columnNames: ['name', 'user_id'] }));
    }
}
