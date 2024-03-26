import { saveBook } from "../services/bookService";

const randomNumber = (num: number) => {
  const chars = "012345";
  const charsLength = chars.length;
  let result = [];
  for (let i = 0; i < (num || 5); ++i) {
    result.push(chars.charAt(Math.floor(Math.random() * charsLength)));
  }
  return result;
};
const bookseed = async () => {
  try {
    const num = 35;
    const tagList = ["fiction", "non-fiction", "science", "essay"];
    const points = [5, 4, 9, 7, 8, 12];
    for (let i = 1; i <= num; i++) {
      const title = `Book Title ${i}`;
      const writer = `Writer ${i}`;
      const diff = (i - 1) % points.length;
      const point = points[diff];
      const tags = [];
      const indexes = (i - 1) % tagList.length;
      const nums = randomNumber(indexes);
      for (let n = 0; n < nums.length; n++) {
        const x: number = +n;
        tags.push(tagList[x]);
      }
      await saveBook(title, writer, point, tags.join(","));
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default {
  bookseed,
};
