const Books = require("../models/books");
const InvalidParamException = require("../exceptions/invalid.param.exception");


// Adding data of new book
const create = (request, response, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bookData = {
        title: request.body.title.trim(),
        author: request.body.author.trim(),
        release_date: request.body.releaseDate,
        genre: request.body.genre,
        rating: request.body.rating,
      };

      const bookDataPayload = await Books.create(bookData);
      return resolve(
        response.json({
          success: true,
          message: "book data added successfully",
          result: bookDataPayload,
        })
      );
    } catch (error) {
      next(error);
    }
  });
};

// Fetching All Books
const fetchAll = (request, response, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bookData = await Books.find();

      return resolve(
        response.json({
          success: true,
          message: "book data fetched successfully",
          result: bookData,
        })
      );
    } catch (error) {
      next(error);
    }
  });
};

// Fetching book on the basis of id
const fetchOne = (request, response, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bookId = request.params.bookId;
      const bookData = await Books.findOne({ _id: bookId });

      if (!bookData) {
        throw new InvalidParamException("book data not found");
      }

      return resolve(
        response.json({
          success: true,
          message: "book data fetched successfully",
          result: bookData,
        })
      );
    } catch (error) {
      next(error);
    }
  });
};

// Updating book on the basis of id
const update = (request, response, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bookId = request.params.bookId;
      const bookData = await Books.findOne({ _id: bookId });
      if (!bookData) {
        throw new InvalidParamException("book data not found");
      }

      const bookDataPayload = await Books.updateOne({ _id: bookId },
        {
          $set: {
            title: request.body.title.trim(),
            author: request.body.author.trim(),
            release_date: request.body.releaseDate,
            genre: request.body.genre,
            rating: request.body.rating,
          },
        }
      );
      return resolve(
        response.json({
          success: true,
          message: "book data updated successfully",
          result: {},
        })
      );
    } catch (error) {
      next(error);
    }
  });
};

// Deleting book on the basis of id
const deleteBookData = (request, response, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bookId = request.params.bookId;
      const bookData = await Books.findOne({ _id: bookId });

      if (!bookData) {
        throw new InvalidParamException("book data not found");
      }
      const bookDataPayload = await Books.updateOne({ _id: bookId },
        {
          $set: {
            is_active:  0,
            is_deleted: 1
            
          },
        });
      return resolve(
        response.json({
          success: true,
          message: "book data deleted successfully",
          result: {},
        })
      );
    } catch (error) {
      next(error);
    }
  });
};
module.exports = { create, fetchAll, fetchOne, update, deleteBookData };
