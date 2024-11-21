//import express from REST
import * as express from 'express';

//import mongodb for DB communication
import * as mongodb from 'mongodb';

//Create an REST object as router
const getListsByCode:any = express.Router();

//Get the MongoURI
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";

//Create a GET mode REST method to get list cards based on status code passed
getListsByCode.get("/:statusCode",async(req:any,res:any):Promise<any>=>{
    //Create ClientObj and connection
    const clientObj:any = new mongodb.MongoClient(MONGO_URI,{
        tls:true,
        serverSelectionTimeoutMS: 3000,
        autoSelectFamily: false,
    });

    //read the Path Param value
    const code:any = req.params.statusCode;

    //Replace the x with digits
    let regexCode = code.replace(/x/g, '\\d');

    //Regex matches the start of the string
    if (regexCode.includes('\\d')) {
        regexCode = `^${regexCode}`; 
    }

    try{
        //Get the db ref
        let db:any = clientObj.db('HttpStatus');

        //Perform the Find or filter operation based on the condition
        const results:any = await db.collection('list').find(
            {
                //Convert the statusCode numeric value toString, and then match it with the Regular Expression
                $expr: { $regexMatch: { input: { $toString: "$statusCode" }, regex: regexCode, options: "i" } }
            }
        ).toArray();

        //Validate the result and based on that send response
        if(results.length!=0)
            res.status(200).json(results);
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
export default getListsByCode;