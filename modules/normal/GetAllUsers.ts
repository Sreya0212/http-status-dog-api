//import the Express module
import * as express from 'express';

//import the MongoDB Module
import * as mongodb from 'mongodb';

//define the mongodb connection String
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";

//Create the REST Object as Sub-module
const getAllUsers:any = express.Router();

//Create a GET Mapped REST Method
getAllUsers.get("/",async(req:any,res:any):Promise<any>=>{
    //Get the MongoClient and create connection
    const clientObj:any = new mongodb.MongoClient(MONGO_URI, {
        tls: true,
        serverSelectionTimeoutMS: 3000,
        autoSelectFamily: false,
    });

    try{
        //get the db ref
        let db:any = clientObj.db('HttpStatus');

        //Perform the retrieval operation and get the Users Array of JSON
        let users:any[] = await db.collection('reg_users').find({}).toArray();

        //Validate the response & send accordingly
        if(users.length > 0)
            res.status(200).json(users);
        else
            res.status(404).json({'msg':'Failed! :('});
    }catch(err){
        console.error(err);
        res.status(500).json({'msg':'Fatal Error!!!'});
    }finally{
        res.end();
        clientObj.close();
    }   
})

//Export the module
export default getAllUsers;