//import express from REST
import * as express from 'express';

//import mongodb for DB communication
import * as mongodb from 'mongodb';

//Create an REST object as router
const deleteListByCode:any = express.Router();

//Get the MongoURI
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";

//Create a delete mode REST method to delete dogs based on status code passed
deleteListByCode.delete("/:statusCode",async(req:any,res:any):Promise<any>=>{
    //Create ClientObj and connection
    const clientObj:any = new mongodb.MongoClient(MONGO_URI,{
        tls:true,
        serverSelectionTimeoutMS: 3000,
        autoSelectFamily: false,
    });

    //read the Path Param value
    const code: number = parseInt(req.params.statusCode, 10); // Convert to number if stored as a number

    try{
        //Get the db ref
        let db:any = clientObj.db('HttpStatus');

        //Perform the delete operation based on code
        const result:any = await db.collection('list').deleteOne({'statusCode':code});

        //Validate the result and based on that send response
        if(result.deletedCount!=0)
            res.status(200).json({'msg':"Deleted.."});
        else   
            res.status(404).json({'msg':'Error!'});
    }catch(err){
        console.error(err);
        res.status(500).json({'msg':'Fatal Error!!'})
    }finally{
        clientObj.close(); res.end();
    }
});

//export the module
export default deleteListByCode;