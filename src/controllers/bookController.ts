import { Request, Response } from "express";
import { getBooks, saveBook } from "../services/bookService";

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await getBooks(req);
    res.status(200).json({
      success: true,
      books: books,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      error: error,
    });
  }
};
const createBook = async (req: Request, res: Response) => {
	try {
		const { title, writer, point, tags } = req.body;
		const book = await saveBook(title, writer, point, tags);
		res.json({
				success: true,
				book: book,
		});
	} catch (error) {
		res.json({
				success: false,
				error: error,
		});
	}
};

export default { getAllBooks, createBook };
