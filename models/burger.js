// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    selectAll: function (cb) {
        console.log("burgers:selectAll");
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays. (create)
    insertOne: function (cols, vals, cb) {
        console.log("burgers:insertOne");
        orm.insertOne("burgers", cols, vals, function (res) {
            cb(res);
        });
    },
    updateOne: function (objColVals, condition, cb) {
        console.log("burgers:updateOne");
        orm.updateOne("burgers", objColVals, condition, function (res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (burger_controller.js).
module.exports = burger;
