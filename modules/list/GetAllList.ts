//import the express module
import * as express from 'express';

//import mongodb module
import * as mongodb from 'mongodb';

//get the Mongo URI
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";

//Define a REST Object as router
const getAllList:any = express.Router();

//Create a REST mode get method
getAllList.get("/",async(req:any,res:any):Promise<any>=>{
    const clientObj:any = new mongodb.MongoClient(MONGO_URI,
        {
            tls: true,
            serverSelectionTimeoutMS: 3000,
            autoSelectFamily: false,
        }
    );
    
    try{
        let db:any = clientObj.db("HttpStatus");
    
        let lists:any = await db.collection('list').find({}).toArray();
    
        if(lists.length !=0)
            res.status(200).json(lists);
        else
            res.status(404).json({'msg':'Error!'});
    }catch(err){
        console.error(err);
        res.status(500).json({'msg':'Fatal Error!'});
    }finally{
        res.end(); clientObj.close();
    }
});

//export
export default getAllList;