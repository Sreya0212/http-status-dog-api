//import the express module for REST Services
import * as express from 'express';

//import the Mongodb module
import * as mongodb from 'mongodb';

//define the mongodb connection String
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";

//create the REST object, as a Sub-module
const deleteTasks:any = express.Router();

//Create a POST Mode request to insert users in DB
deleteTasks.delete('/:title',async(req:any,res:any):Promise<any>=>{
    //Create client obj and build MongoConnection
    const clientObj:any = new mongodb.MongoClient(MONGO_URI, {
        tls: true,
        serverSelectionTimeoutMS: 3000,
        autoSelectFamily: false,
    });

    try{
        //Get the DB reference
        let db:any = clientObj.db('HttpStatus');

        //read the path param
        let title:string = req.params.title;

        //Perform insert operation of the JSON data coming from req body in DB
        const result = await db.collection('todo').deleteOne({
            'title':title
        });

        //Validate the result if deleted or not based on that return response
        if(result.deletedCount!= 0){
            //if deleted succesfully return positive response
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
export default deleteTasks;
