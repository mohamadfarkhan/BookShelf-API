const { nanoid } = require("nanoid");
const book = require("./books");
const books = require("./books");

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } =
    request.payload;
    if (!name) {
      return h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      }).code(400);
    } else if (readPage > pageCount) {
      return h.response({
        status: "fail",
        message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      }).code(400);
    }
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if(isSuccess){
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: bookId,
      },
    });
    response.code(201);
    return response;
  }
};

const getAllBookHandler = (request, h) => {
  return h.response({
    status: "success",
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((n) => n.id === bookId)[0];

  if (book == undefined) {
    return{
      status: "success",
        data: {
          book,
        },
    }.code(200);
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } =
    request.payload;

  const index = books.findIndex((book) => book.id === bookId);
  
  if (!name) {
      const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      });
      response.code(400);
      return response;
    } else if (readPage > pageCount) {
      const response = h.response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    } else if (index !== -1) {
      const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      });
      response.code(400);
      return response;
    }

    const updateAt = new Date().toISOString();
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updateAt,
      };
    
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(201);
    return response;
};


const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    }).code(404);
  }

    books.splice(index, 1);

    return h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    }).code(200);
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
