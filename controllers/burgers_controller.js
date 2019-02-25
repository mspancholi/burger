var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/index", function (req, res) {
    console.log("burgers_controller:router.get");
    burger.selectAll(function (data) {
        //creating an object because handlebars only takes in objects
        var burgerObject = {
            burgers: data
        };
        console.log(JSON.stringify(burgerObject));
        res.render("index", burgerObject);
    });
});

router.post("/index", function (req, res) {
    console.log("burgers_controller:router.post");
    burger.insertOne([
        "burger_name"
    ], [
            //the below code is coming from the html text entry
            req.body.burger_name
        ], function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        });
});

//:id is the ID that gets passed in the http put url
router.put("/index/:id", function (req, res) {
    console.log("burgers_controller:router.put");
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});



// Export routes for server.js to use.
module.exports = router;
