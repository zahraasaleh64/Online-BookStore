-- MySQL Dump generated from SQLite
SET FOREIGN_KEY_CHECKS=0;


DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  role VARCHAR(50) DEFAULT 'user'
) ENGINE=InnoDB;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  price VARCHAR(50),
  category VARCHAR(100),
  image TEXT
) ENGINE=InnoDB;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  customerName VARCHAR(255) NOT NULL,
  orderDate VARCHAR(50) NOT NULL,
  totalAmount VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL
) ENGINE=InnoDB;


-- Data for users
INSERT INTO users (`id`, `email`, `password`, `firstName`, `lastName`, `role`) VALUES (1, 'admin@bookstore.com', '$2b$08$hEjx8v4IknAYKku7I6kTK.LUiBVg6LdsbXZysygIjzdzVZySHC.Ku', 'Admin', 'User', 'admin');
INSERT INTO users (`id`, `email`, `password`, `firstName`, `lastName`, `role`) VALUES (2, 'iamhusseinsaleh@gmail.com', '$2b$08$OIEU5hWSKrr9WRxRcnEpeuvgkmHcunaMiILDd3YJz4kUnFm3CnEF6', 'brahim', 'younes', 'user');

-- Data for products
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (2, 'Cracking the PM Interview', 'Gayle Laakmann McDowell', '$14.77', 'Career', '/assets/products/book2.jpeg');
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (3, '1984', 'George Orwell', '$13.99', 'Fiction', '/assets/products/book3.jpg');
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (4, 'Pride and Prejudice', 'Jane Austen', '$11.99', 'Classic', '/assets/products/book4.jpg');
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (5, 'The Catcher in the Rye', 'J.D. Salinger', '$15.99', 'Fiction', '/assets/products/book5.jpg');
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (6, 'Lord of the Flies', 'William Golding', '$12.99', 'Fiction', '/assets/products/book6.jpg');
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (7, 'The Great Gatsby', 'F. Scott Fitzgerald', '$12.99', 'Classic', '/assets/products/book1.jpg');
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (8, 'To Kill a Mockingbird', 'Harper Lee', '$14.99', 'Classic', '/assets/products/book2.jpeg');
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (9, 'The Hobbit', 'J.R.R. Tolkien', '$16.99', 'Fantasy', '/assets/products/book3.jpg');
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (10, 'Harry Potter', 'J.K. Rowling', '$18.99', 'Fantasy', '/assets/products/book4.jpg');
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (11, 'The Alchemist', 'Paulo Coelho', '$13.99', 'Fiction', '/assets/products/book5.jpg');
INSERT INTO products (`id`, `title`, `author`, `price`, `category`, `image`) VALUES (12, 'Sapiens', 'Yuval Noah Harari', '$17.99', 'Non-Fiction', '/assets/products/book6.jpg');

-- Data for orders
INSERT INTO orders (`id`, `user_id`, `customerName`, `orderDate`, `totalAmount`, `status`) VALUES (1, NULL, 'John Doe', '2023-10-01', '$45.99', 'Delivered');
INSERT INTO orders (`id`, `user_id`, `customerName`, `orderDate`, `totalAmount`, `status`) VALUES (2, NULL, 'Jane Smith', '2023-10-05', '$29.97', 'Shipped');
INSERT INTO orders (`id`, `user_id`, `customerName`, `orderDate`, `totalAmount`, `status`) VALUES (3, NULL, 'Michael Brown', '2023-10-10', '$59.95', 'Pending');
INSERT INTO orders (`id`, `user_id`, `customerName`, `orderDate`, `totalAmount`, `status`) VALUES (4, NULL, 'Emily Wilson', '2023-10-12', '$15.99', 'Cancelled');
INSERT INTO orders (`id`, `user_id`, `customerName`, `orderDate`, `totalAmount`, `status`) VALUES (5, NULL, 'Fatima  Al Zahraa Saleh', '2026-01-02', '$14.77', 'Pending');
INSERT INTO orders (`id`, `user_id`, `customerName`, `orderDate`, `totalAmount`, `status`) VALUES (6, 2, 'brahim younes', '2026-01-03', '$14.77', 'Pending');

SET FOREIGN_KEY_CHECKS=1;
