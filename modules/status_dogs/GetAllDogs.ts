//import the express for REST
import { error } from 'console';
import * as express from 'express';

import * as mongodb from 'mongodb';

const getAllDogs:any =  express.Router();

//define the mongodb connection String
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";


getAllDogs.get("/",async(req:any,res:any):Promise<any>=>{
    const clientObj:any = new mongodb.MongoClient(MONGO_URI,
        {
            tls: true,
            serverSelectionTimeoutMS: 3000,
            autoSelectFamily: false,
        }
    );

    try{
        let db:any = clientObj.db("HttpStatus");

        let dogs:any = await db.collection('dogs').find({}).toArray();

        if(dogs.length !=0)
            res.status(200).json(dogs);
        else
            res.status(404).json({'msg':'Error!'});
    }catch(err){
        console.error(err);
        res.status(500).json({'msg':'Fatal Error!'});
    }finally{
        res.end(); clientObj.close();
    }
});

export default getAllDogs;