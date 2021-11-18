var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
    }
});


// function to create a tables in the database
function createTable(db, tableName, tableSchema, callback) {
    db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${tableSchema})`, function(err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`${tableName} table created successfully`);
        callback(db);
    });
}

// function to insert data into the database
function insertData(db, tableName, data, callback) {
    db.run(`INSERT INTO ${tableName} VALUES (${data})`, function(err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id

        console.log(`A row has been inserted into ${tableName}`);
        callback(db);
    });
}


// calling the createTable function
createTable(db, 'users', '(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT, firstname TEXT, lastname TEXT, phone TEXT, address TEXT, city TEXT, state TEXT, zip TEXT, country TEXT, role TEXT)', function(db) {
});

// calling the insertData function



  

module.exports = db