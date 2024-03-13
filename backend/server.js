const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyparser.json())
 
// const port = 3000;// Change the port number if needed


// MySQL connection configuration

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'product_management',
//   port: 3006
});


// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

// // Middleware
// app.use(express.json()); // Parse JSON bodies


// Get all categories
app.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    } else {
      res.json(result);
    }
  });
});

// Add new category
app.post('/categories', (req, res) => {
  const { categoryName } = req.body;
  const sql = 'INSERT INTO categories (CategoryName) VALUES (?)';
  db.query(sql, [categoryName], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add category' });
    } else {
      res.json({ message: 'Category added successfully' });
    }
  });
});

// Update category
app.put('/categories/:id', (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const sql = 'UPDATE categories SET CategoryName = ? WHERE CategoryId = ?';
  db.query(sql, [categoryName, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update category' });
    } else {
      res.json({ message: 'Category updated successfully' });
    }
  });
});

// Delete category
app.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM categories WHERE CategoryId = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete category' });
    } else {
      res.json({ message: 'Category deleted successfully' });
    }
  });
});

// Get all products
app.get('/products', (req, res) => {
  const sql = 'SELECT products.*, categories.CategoryName FROM products LEFT JOIN categories ON products.CategoryId = categories.CategoryId';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// Add a new product
app.post('/products', (req, res) => {
  const { ProductName, CategoryId } = req.body;
  const sql = `INSERT INTO products (ProductName, CategoryId) VALUES ('${ProductName}', ${CategoryId})`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Product added successfully');
    res.sendStatus(201);
  });
});

app.get('/products', (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const sql = `SELECT products.*, categories.CategoryName FROM products LEFT JOIN categories ON products.CategoryId = categories.CategoryId LIMIT ${offset}, ${pageSize}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});


// Routes for categories
app.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    } else {
      res.json(result);
    }
  });
});

// // Routes for products
app.get('/products', (req, res) => {
  const { pageSize, page } = req.query;
  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;

  const sql = `SELECT p.ProductId, p.ProductName, c.CategoryName, p.CategoryId
               FROM products p
               INNER JOIN categories c ON p.CategoryId = c.CategoryId
               LIMIT ?, ?`;
  db.query(sql, [offset, limit], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch products' });
    } else {
      res.json(result);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});