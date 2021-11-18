// Create express app
var express = require("express")
const path = require('path');

// database
var db = require("./database.js")

// routes
var apiRouter = require("./routes/apiRoutes")

var app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// setting up the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// // Root endpoint
// app.get("/", (req, res, next) => {
//     res.json({"message":"Ok"})
// });

// app.get("/api/users", (req, res, next) => {
//     var sql = "select * from volcanos"
//     var params = []
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//           res.status(400).json({"error":err.message});
//           return;
//         }
//         res.json({
//             "message":"success",
//             "data":rows
//         })
//       });
// });

// app.get('/index', function(req, resp){
//     resp.render('index')
// })


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});


// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});




let reseed = false;
if (reseed) {
    // calling the createTable function
    createTable(db, "volcanos", "id INTEGER PRIMARY KEY, volcano_name TEXT, location TEXT, history TEXT, active TEXT", function(db) {
        var insert = 'INSERT INTO volcanos (volcano_name, location, history, active) VALUES (?,?,?,?)'
        db.run(insert, ["Kilauea","United States","Kilauea, which overlaps the E flank of the massive Mauna Loa shield volcano, has been Hawaii's most active volcano during historical time. ","yes"])
        db.run(insert, ["La Palma","Spain","The 47-km-long wedge-shaped island of La Palma, the NW-most of the Canary Islands","yes"])
        db.run(insert, ["Pavlof","United States","The most active volcano of the Aleutian arc, Pavlof is a 2519-m-high Holocene stratovolcano that was constructed along a line of vents extending NE ","yes"])
        db.run(insert, ["Copahue","Chile-Argentina","Volcán Copahue is an elongated composite cone constructed along the Chile-Argentina border within the 6.5 x 8.5 km wide.","no"])
        db.run(insert, ["Rincon de la Vieja","Costa Rica","Rincón de la Vieja, the largest volcano in NW Costa Rica, is a remote volcanic complex in the Guanacaste Range. ","no"])
    });
}


// function to create a tables in the database
function createTable(db, tableName, tableSchema, callback) {
    db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${tableSchema})`, function(err) {
        if (err) {
            console.log("error")
            return console.log(err.message);
        }
        console.log(`${tableName} table created successfully`);
        // get the last insert id
        callback(db);
    });
}