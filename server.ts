//import the express module
import * as express from 'express';

//import the cors module
import * as cors from 'cors';
import insertDogs from './modules/status_dogs/InsertDogs';
import getAllDogs from './modules/status_dogs/GetAllDogs';
import getDogsByCode from './modules/status_dogs/GetDogsByCode';
import inserList from './modules/list/InsertList';
import getAllList from './modules/list/GetAllList';
import deleteListByCode from './modules/list/DeleteByCode';
import getListsByCode from './modules/list/GetListsByCode';
import registerUesrs from './modules/normal/RegisterUser';
import getAllUsers from './modules/normal/GetAllUsers';
import insertTask from './modules/todo/InsertTask';
import getAllTasks from './modules/todo/GetAllTasks';
import updateStatus from './modules/todo/UpdateStatus';
import deleteTasks from './modules/todo/DeleteTasks';

//Create a REST object
const app:any = express();

//To parse the data
app.use(express.json());

//Use cors on the app REST obj
app.use(cors());

//use the sub-module
app.use("/insertDogs",insertDogs);
app.use("/getAllDogs",getAllDogs);
app.use("/getDogsByCode",getDogsByCode);
app.use("/insertList", inserList)
app.use("/getAllList", getAllList);
app.use("/deleteListByCode", deleteListByCode);
app.use("/getListsByCode", getListsByCode);
app.use("/registerUsers", registerUesrs);
app.use("/getAllUsers", getAllUsers);
app.use("/insertTask", insertTask);
app.use("/getAllTasks", getAllTasks);
app.use("/updateStatus", updateStatus);
app.use("/deleteTasks", deleteTasks);

//Create a const port number
const PORT:any = 4040;

//start the server
app.listen(PORT,()=>{
    console.log(`Server is started, listening at : localhost:${PORT}`);
});