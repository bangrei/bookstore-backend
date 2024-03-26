import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

const findAll = async (page = 1, limit = 10) => {
    const num = page <= 0 ? 1 : page;
    const skip = limit * num - limit;
    const repo = AppDataSource.getRepository(Book);
    const books = await repo.find({
        take: limit,
        skip: skip
    });
    return books;
};

const findById = async (id: number) => {
    const repo = AppDataSource.getRepository(Book);
    const book = await repo.findOne({
      where: { id: id },
    });
    return book;
};

const save = async (book: Book) => {
    const repo = AppDataSource.getRepository(Book);
    const res = await repo.save(book);
    return res;
};

const remove = async (id: number) => {
    const repo = AppDataSource.getRepository(Book);
    const book = await repo.findOne({
      where: { id: id },
    });
    const res = await repo.remove(book);
    return res;
};

export default {
    findAll,
    findById,
    save,
    remove,
}
