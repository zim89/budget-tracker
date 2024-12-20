import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { Transaction } from './transaction/entities/transaction.entity';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'postgres',
      // database: 'budget_tracker',
      entities: [Category, Transaction],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Category, Transaction]),
  ],
  controllers: [CategoryController, TransactionController],
  providers: [CategoryService, TransactionService],
  exports: [TransactionService, CategoryService],
})
export class AppModule {}
