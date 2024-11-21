"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import the express module
var express = require("express");
//import the cors module
var cors = require("cors");
var InsertDogs_1 = require("./modules/status_dogs/InsertDogs");
var GetAllDogs_1 = require("./modules/status_dogs/GetAllDogs");
var GetDogsByCode_1 = require("./modules/status_dogs/GetDogsByCode");
var InsertList_1 = require("./modules/list/InsertList");
var GetAllList_1 = require("./modules/list/GetAllList");
var DeleteByCode_1 = require("./modules/list/DeleteByCode");
var GetListsByCode_1 = require("./modules/list/GetListsByCode");
var RegisterUser_1 = require("./modules/normal/RegisterUser");
var GetAllUsers_1 = require("./modules/normal/GetAllUsers");
//Create a REST object
var app = express();
//To parse the data
app.use(express.json());
//Use cors on the app REST obj
app.use(cors());
//use the sub-module
app.use("/insertDogs", InsertDogs_1.default);
app.use("/getAllDogs", GetAllDogs_1.default);
app.use("/getDogsByCode", GetDogsByCode_1.default);
app.use("/insertList", InsertList_1.default);
app.use("/getAllList", GetAllList_1.default);
app.use("/deleteListByCode", DeleteByCode_1.default);
app.use("/getListsByCode", GetListsByCode_1.default);
app.use("/registerUsers", RegisterUser_1.default);
app.use("/getAllUsers", GetAllUsers_1.default);
//Create a const port number
var PORT = 4040;
//start the server
app.listen(PORT, function () {
    console.log("Server is started, listening at : localhost:".concat(PORT));
});
