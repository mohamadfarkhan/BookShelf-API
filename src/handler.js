const { nanoid } = require("nanoid");
const book = require("./books");
const books = require("./books");

const addBookHandler = (request, h) => {
<<<<<<< HEAD
  const {
=======
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
>>>>>>> origin/main
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
<<<<<<< HEAD
    reading,
  } = request.payload;
=======
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
>>>>>>> origin/main

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if(isSuccess){
    const response = h.response({
<<<<<<< HEAD
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
=======
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: newBook,
      },
>>>>>>> origin/main
    });
    response.code(201);
    return response;
<<<<<<< HEAD
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
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

  const isSuccess = book.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
=======
  }
  
>>>>>>> origin/main
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

<<<<<<< HEAD
  if (book == undefined) {
    return {
      status: "success",
=======
  if (book === undefined) {
    return h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
      data: [],
    });
  }
  return h.response({
    status: "success",
>>>>>>> origin/main
      data: {
        book,
      },
  }).code(200);
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
<<<<<<< HEAD
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  //Periksa ID buku dengan ID yang diberikan
  const index = books.findIndex((book) => book.id === id);

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
  } else if (index === -1) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
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
  response.code(200);
  return response;
=======
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
>>>>>>> origin/main
};


const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
<<<<<<< HEAD
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  }
  books.splice(index, 1);
  return h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(200);
=======
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
>>>>>>> origin/main
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
