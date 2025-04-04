const BookBorrowService = require("../services/bookborrow.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.user_id || !req.body?.book_id) {
    return next(new ApiError(400, "User, book information is missing"));
  }
  try {
    const service = new BookBorrowService(MongoDB.client);
    const document = await service.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        "An error occurred while creating the book borrowing tracking record"
      )
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const service = new BookBorrowService(MongoDB.client);
    documents = await service.find({});
  } catch (error) {
    return next(
      new ApiError(
        500,
        "An error occurred while retrieving the list of book borrowing tracking records"
      )
    );
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const service = new BookBorrowService(MongoDB.client);
    const document = await service.findById(req.params.id);
    if (!document) {
      return next(
        new ApiError(404, "Book borrowing tracking record not found")
      );
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Error retrieving book borrowing tracking record with id=${req.params.id}`
      )
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update cannot be empty"));
  }
  try {
    const service = new BookBorrowService(MongoDB.client);
    const document = await service.update(req.params.id, req.body);
    if (!document) {
      return next(
        new ApiError(404, "Book borrowing tracking record not found")
      );
    }
    return res.send({
      message: "Book borrowing tracking record updated successfully",
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Error updating book borrowing tracking record with id=${req.params.id}`
      )
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const service = new BookBorrowService(MongoDB.client);
    const document = await service.delete(req.params.id);
    if (!document) {
      return next(
        new ApiError(404, "Book borrowing tracking record not found")
      );
    }
    return res.send({
      message: "Book borrowing tracking record deleted successfully",
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Could not delete book borrowing tracking record with id=${req.params.id}`
      )
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const service = new BookBorrowService(MongoDB.client);
    const deleteCount = await service.deleteAll();
    return res.send({
      message: `${deleteCount} records were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "An error occurred while deleting all book borrowing tracking records"
      )
    );
  }
};
