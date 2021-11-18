var express = require('express');
const api_controllers= require('../controllers/apiControllers');

var router = express.Router();

/// API ROUTE ///


// GET request for getting all volcanos. 
router.get('/volcanos', api_controllers.volcano_list);

// GET request for one Part.
router.get('/volcano/:id', api_controllers.volcano_detail_id);

// POST request for creating volcano.
router.post('/volcano', api_controllers.volcano_create);

// PUT request for updating volcano.
router.put('/volcano/:id', api_controllers.volcano_update_id);

// DELETE request for deleting volcano.
router.delete('/volcano/:id', api_controllers.volcano_delete_id);

module.exports = router;