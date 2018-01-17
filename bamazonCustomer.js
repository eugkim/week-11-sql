//required packages
var inquirer = require('inquirer');
var mysql = require('mysql');

//connect to database
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',

	password: '',
	database: 'bamazon'
});

//input validate to disallow decimals and zero
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter an integer greater than 0.';
	}
}

//prompt user to make a selectino and ask how many of that item requested
function promptUser() {
	inquirer.prompt([
	{
		type: 'input',
		name: 'item_id',
		message: 'Please enter Item ID number of your choice of item',
		validate: validateInput
		filter: Number
	},

	{
		type: 'input',
		name: 'quantity',
		message: 'How many would you like to purchase?',
		validate: validateInput,
		filter: Number
	}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		//query db to confirm item ID and quantity
		var queryString = 'SELECT * FROM products WHERE ?';

		connection.query(queryString, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('Invalid Item ID. Please enter a valid Item ID.');
				displayItems();

			} else {
				var productData = data[0];

				//if the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('We are placing your order now!');

					//create new query string
					var updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					//update inventory
					connection.query(updateQuery, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for choosing Bamazon!');

						//end connection
						connection.end();
					})
				} else {
					console.log('Not enough product! Please select a smaller quantity.');

					displayInventory();
				}
			}
		})
	})
}


//display items available for sale
function displayItems() {
	//create database query string
	queryString = 'SELECT * FROM products';

	//make database query
	connection.query(queryString, function(err, data) {
		if (err) throw err;

		console.log('Now Available for Sale: ');

		var stringList = '';
		for (var i = 0; i < data.length; i++) {
			stringList = '';
			stringList += 'Item ID: ' + data[i].item_id + '\n';
			stringList += 'Product Name: ' + data[i].product_name + '\n';
			stringList += 'Department: ' + data[i].department_name + '\n';
			stringList += 'Price: $' + data[i].price + '\n';

			console.log(stringList);
		}

	  	//prompt user for purchase
	  	promptUser();
	})
}

function runApp() {
	displayItems();
}

runApp();
