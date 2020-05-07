import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);

    const checkCategoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!checkCategoryExists) {
      const newCategory = await categoryRepository.create({ title: category });
      await categoryRepository.save(newCategory);

      const newTransaction = await transactionRepository.create({
        title,
        value,
        type,
        category_id: newCategory.id,
      });

      await transactionRepository.save(newTransaction);

      return newTransaction;
    }

    const newTransaction = await transactionRepository.create({
      title,
      value,
      type,
      category_id: checkCategoryExists.id,
    });

    await transactionRepository.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
