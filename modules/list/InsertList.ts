//Import express module
import * as express from 'express';

//import MongoDB
import * as mongodb from 'mongodb';

//get the Mongo URI
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";

//Create a REST object as sub-module
const inserList:any = express.Router();

//Create a POST mode REST method to insert in DB
inserList.post("/",async(req:any,res:any):Promise<any>=>{
    //get the array present in the Request Body
    const arrayList:any[] = req.body;

    console.log(req.body);
    

    //Create clientObj
    const clientObj:any = new mongodb.MongoClient(MONGO_URI,{
        tls: true,
        autoSelectFamily: false,
        serverSelectionTimeoutMS: 3000,
    });

    try{
        //Get db ref
        let db:any = clientObj.db('HttpStatus');

        //Perform the insertMany operation in the list collection
        let result:any = await db.collection('list').insertMany(arrayList);

        //Validate the result
        if(result.acknowledged)
            res.status(201).json({'msg':'Created..'});
        else
            res.status(404).json({'msg':'Error!'});
    }catch(err){
        console.log(err);
        res.status(500).json({'msg':'Fatal Error!!'});
    }finally{
        res.end(); clientObj.close();
    }
});

//export 
export default inserList;