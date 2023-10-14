const express = require('express');
const { verifyToken } = require('../utils/auth');
const bookController = require('../controller/book.controller');

const router = express.Router();

router.post('/', verifyToken, bookController.createBook);
router.get('/', verifyToken, bookController.getAllBooks);
router.get('/:id', verifyToken, bookController.getBookById);
router.get('/search/:keyword', verifyToken, bookController.searchBooks);
router.get('/author/:author', verifyToken, bookController.getBooksByAuthor);
router.get('/price/:min/:max', verifyToken, bookController.getBooksByPrice);
router.get('/latest', verifyToken, bookController.getLatestBooks);
router.put('/:id', verifyToken, bookController.updateBook);
router.delete('/:id', verifyToken, bookController.deleteBook);

module.exports = router;