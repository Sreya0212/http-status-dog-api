//import the express for REST
import * as express from 'express';

import * as mongodb from 'mongodb';

const getAllTasks:any =  express.Router();

//define the mongodb connection String
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";

//Create a GET mode request which will get the tasks based on category of status
getAllTasks.get("/:category",async(req:any,res:any):Promise<any>=>{
    const clientObj:any = new mongodb.MongoClient(MONGO_URI,
        {
            tls: true,
            serverSelectionTimeoutMS: 3000,
            autoSelectFamily: false,
        }
    );

    //Read the category
    let cat:any = req.params.category;

    try{
        let db:any = clientObj.db("HttpStatus");

        let tasks:any[] = [];

        //If category is completed then return only the docs whose status is true else return all
        if(cat == "completed")
            tasks = await db.collection('todo').find({'status':true}).toArray();
        else if(cat == "pending")
            tasks = await db.collection('todo').find({'status':false}).toArray();
        else
            tasks = await db.collection('todo').find({}).toArray();
        
        if(tasks.length !=0)
            res.status(200).json(tasks);
        else
            res.status(404).json({'msg':'Error!'});
    }catch(err){
        console.error(err);
        res.status(500).json({'msg':'Fatal Error!'});
    }finally{
        res.end(); clientObj.close();
    }
});

export default getAllTasks;