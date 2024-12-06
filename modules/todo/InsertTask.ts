//import the express module for REST Services
import * as express from 'express';

//import the Mongodb module
import * as mongodb from 'mongodb';

//define the mongodb connection String
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";

//create the REST object, as a Sub-module
const insertTask:any = express.Router();

//Create a POST Mode request to insert users in DB
insertTask.post('/',async(req:any,res:any):Promise<any>=>{
    //Create client obj and build MongoConnection
    const clientObj:any = new mongodb.MongoClient(MONGO_URI, {
        tls: true,
        serverSelectionTimeoutMS: 3000,
        autoSelectFamily: false,
    });

    try{
        //Get the DB reference
        let db:any = clientObj.db('HttpStatus');

        //Perform insert operation of the JSON data coming from req body in DB
        const result = await db.collection('todo').insertOne({
            'title':req.body.title,
            'desc':req.body.desc,
            'date':req.body.date,
            'status':req.body.status
        });

        //Validate the result if inserted or not based on that return response
        if(result.insertedId){
            //if Inserted succesfully return positive response
            res.status(201).json({'code':201});
        }else{
            //If not inserted insertedId will be null
            res.status(404).json({'code':404});
        }
    }catch(err){
        console.error(err);  
        res.status(500).json({'code':500}); 
    }finally{
        clientObj.close();
        res.end();
    }
});

//Export the module
export default insertTask;
