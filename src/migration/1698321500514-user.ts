import { MigrationInterface, QueryRunner } from "typeorm";

export class Order1698321500514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        ` 
         CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);

    await queryRunner.query(
      ` 
      CREATE TABLE orders (
            order_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id),
            total_amount DECIMAL(10, 2) NOT NULL,
            payment_status VARCHAR(50) DEFAULT 'Pending',
            shipping_status VARCHAR(50) DEFAULT 'Pending',
            tracking_number VARCHAR(100),
            estimated_delivery DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
         `);



    //.. other tables
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
