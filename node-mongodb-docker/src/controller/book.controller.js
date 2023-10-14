const Book = require('../models/book.model');

const createBook = async (req, res) => {
    try {
        const { title, author, description, price, isbn } = req.body;
        
        if (!title || !author || !description || !price || !isbn) {
            return res.status(400).json({ 
                status: false,
                message: 'Required fields missing' 
            });
        }

        const bookBody = {
            title,
            author,
            description,
            price,
            isbn
        };

        const book = new Book(bookBody);
        await book.save();

        return res.status(201).json({ 
            status: true, 
            message: 'Book created successfully' 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({ 
            status: true, 
            message: 'Books fetched successfully',
            books 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ 
                status: false,
                message: 'Book not found' 
            });
        }
        return res.status(200).json({ 
            status: true, 
            book 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const getBooksByAuthor = async (req, res) => {
    try {
        const books = await Book.find({ author: req.params.author });
        if (!books) {
            return res.status(404).json({ 
                status: false,
                message: 'Books not found' 
            });
        }
        return res.status(200).json({ 
            status: true, 
            message: 'Books fetched successfully',
            books 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const getBooksByPrice = async (req, res) => {
    try {
        const books = await Book.find({ price: { $gte: req.params.min, $lte: req.params.max } });
        if (!books) {
            return res.status(404).json({ 
                status: false,
                message: 'Books not found' 
            });
        }
        return res.status(200).json({ status: true, books });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const searchBooks = async (req, res) => {
    try {
        const books = await Book.find({ $text: { $search: req.params.query } });
        if (!books) {
            return res.status(404).json({ 
                status: false,
                message: 'Books not found' 
            });
        }
        return res.status(200).json({ status: true, books });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const getLatestBooks = async (req, res) => {
    try {
        const books = await Book.find({}).sort({ created_at: -1 }).limit(5);
        if (!books) {
            return res.status(404).json({ 
                status: false,
                message: 'Books not found' 
            });
        }
        return res.status(200).json({ status: true, books });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const updateBook = async (req, res) => {
    try {

        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return res.status(401).json({
                status: false,
                message: 'Unauthorized access'
            });
        }

        const { title, author, description } = req.body;

        if (!title || !author || !description || !price || !isbn) {
            return res.status(400).json({ 
                status: false,
                message: 'Required fields missing' 
            });
        }

        const bookBody = {
            title,
            author,
            description,
            price,
            isbn
        };

        const book = await Book.findByIdAndUpdate(req.params.id, bookBody, { new: true });

        if (!book) {
            return res.status(404).json({ 
                status: false,
                message: 'Book not found' 
            });
        }

        return res.status(200).json({ status: true, message: 'Book updated successfully', book });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const deleteBook = async (req, res) => {
    try {

        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return res.status(401).json({
                status: false,
                message: 'Unauthorized access'
            });
        }
        
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ 
                status: false,
                message: 'Book not found' 
            });
        }
        return res.status(200).json({ status: true, message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    getBooksByAuthor,
    getBooksByPrice,
    searchBooks,
    getLatestBooks,
    updateBook,
    deleteBook
}