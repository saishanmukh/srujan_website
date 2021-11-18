// var Volcano = require('../database');

// List of all Volcones
exports.volcano_list = async function(req, res) {
    try{
    const sql = "SELECT * FROM  volcanos ORDER BY volcano_name";
    Volcano.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.send(rows );
});
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};

// get a single volcano
exports.volcano_detail_id = async function(req, res) {
    try{    
    const sql = "SELECT * FROM  volcanos WHERE id = ?"; 
    Volcano.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.send(row);
        });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};


// Create a new volcano
exports.volcano_create = async function(req, res) {
    try{
    const sql = "INSERT INTO volcanos (volcano_name, location, history, active) VALUES (?,?,?,?)";
    Volcano.run(sql, [req.body.volcano_name, req.body.location, req.body.history, req.body.active], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.send(`Volcano ${req.body.volcano_name} was created`);
    });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};

// Update a volcano by id
exports.volcano_update_id = async function(req, res) {
    try{
    const sql = "UPDATE volcanos SET volcano_name = ?, location = ?, history = ?, active = ? WHERE id = ?";
    Volcano.run(sql, [req.body.volcano_name, req.body.location, req.body.history, req.body.active, req.params.id], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.send(`Volcano ${req.params.id} was updated`);
    });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};

// Delete a volcano by id
exports.volcano_delete_id = async function(req, res) {
    try{
    const sql = "DELETE FROM volcanos WHERE id = ?";
    Volcano.run(sql, [req.params.id], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.send(`Volcano ${req.params.id} was deleted`);
    });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};

