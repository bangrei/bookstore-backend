import { Request, Response } from "express";
import bookRepo from "../repositories/bookRepo";
import { Book } from "../entity/Book";

export const getBooks = async (req: Request) => {
    const { page, limit } = req.query;
    const books = await bookRepo.findAll(+page, +limit);
    return books;
};

export const findBook = async (id: number) => {
    const book = await bookRepo.findById(id);
    return book;
};

export const saveBook = async (title: string, writer: string, point: number, tags: string) => {
    const imageUrl =
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg";
    const book = new Book();
    book.title = title;
    book.writer = writer;
    book.point = point;
    book.image = imageUrl;
    book.tags = tags;
    await bookRepo.save(book);
    return book;
};
