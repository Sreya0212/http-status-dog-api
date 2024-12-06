//import the express for REST
import * as express from 'express';

import * as mongodb from 'mongodb';

const updateStatus:any =  express.Router();

//define the mongodb connection String
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";

//Create a PUT mode request which will get the tasks based on category of status
updateStatus.put("/",async(req:any,res:any):Promise<any>=>{
    const clientObj:any = new mongodb.MongoClient(MONGO_URI,
        {
            tls: true,
            serverSelectionTimeoutMS: 3000,
            autoSelectFamily: false,
        }
    );

    try{
        let db:any = clientObj.db("HttpStatus");

        //Update the status field of the document
        let result:any = await db.collection('todo').updateOne({'title':req.body.title}, {$set:{'status':req.body.status}});
        
        if(result.modifiedCount != 0)
            res.status(200).json({'msg':'Mark as Completed..'});
        else
            res.status(404).json({'msg':'Error!'});
    }catch(err){
        console.error(err);
        res.status(500).json({'msg':'Fatal Error!'});
    }finally{
        res.end(); clientObj.close();
    }
});

export default updateStatus;