const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } =
    request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
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
        bookId: newBook,
      },
    });
    response.code(201);
    return response;
  }
  
};

const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = books; // Use let to allow reassignment

  // Filter By Name
  if (name) {
    filteredBooks = filteredBooks.filter((book) => 
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter By Status Reading
  if (reading !== undefined) {
    const readingStatus = reading === "1";
    filteredBooks = filteredBooks.filter((book) => book.reading === readingStatus);
  }

  // Filter By Status Finished
  if (finished !== undefined) {
    const finishedStatus = finished === "1";
    filteredBooks = filteredBooks.filter((book) => book.finished === finishedStatus);
  }

  // Return response
  return h.response({
    status: "success",
    data: {
      books: filteredBooks.map((book) => ({
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

  if (book === undefined) {
    return h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
      data: [],
    });
  }
  return h.response({
    status: "success",
      data: {
        book,
      },
  }).code(200);
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, author, summary, publisher, pageCount, readPage, reading } =
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
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

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
