DROP database products;

CREATE database products;

USE products;

CREATE table products (
item_id int not null primary key,
product_name varchar(45) not null,
department_name varchar(45) not null,
price decimal(2) not null,
stock_quantity int not null
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("spam", "canned", 2.49, 36);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jif", "condiments", 3.68, 49);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("original pringles", "snacks", 1.49, 38);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("spearmint trident", "gum", 1.19, 135);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("oikos peach", "dairy", 1.05, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toblerone", "candy", 3.39, 48);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jif", "condiments", 3.68, 49);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("original pringles", "snacks", 1.49, 38);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("spearmint trident", "gum", 1.19, 135);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("oikos peach", "dairy", 1.05, 26);
