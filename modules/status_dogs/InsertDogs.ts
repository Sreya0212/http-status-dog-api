//import the express for REST Services
import * as express from 'express';

//import the mongodDB module
import * as mongodb from 'mongodb';

//define the mongodb connection String
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.velsy.mongodb.net/mymongodb?retryWrites=true&w=majority";

//define a Rest object as a sub-module
const insertDogs:any = express.Router();

//define the document that we want to insert
const documents:any = [
  { "image": "https://http.dog/100.jpg", "statusCode": 100, "title": "Continue" },
  { "image": "https://http.dog/101.jpg", "statusCode": 101, "title": "Switching Protocols" },
  { "image": "https://http.dog/102.jpg", "statusCode": 102, "title": "Processing" },
  
  { "image": "https://http.dog/200.jpg", "statusCode": 200, "title": "OK" },
  { "image": "https://http.dog/201.jpg", "statusCode": 201, "title": "Created" },
  { "image": "https://http.dog/202.jpg", "statusCode": 202, "title": "Accepted" },
  { "image": "https://http.dog/203.jpg", "statusCode": 203, "title": "Non-Authoritative Information" },
  { "image": "https://http.dog/204.jpg", "statusCode": 204, "title": "No Content" },
  { "image": "https://http.dog/205.jpg", "statusCode": 205, "title": "Reset Content" },
  { "image": "https://http.dog/206.jpg", "statusCode": 206, "title": "Partial Content" },
  { "image": "https://http.dog/207.jpg", "statusCode": 207, "title": "Multi-Status" },
  { "image": "https://http.dog/208.jpg", "statusCode": 208, "title": "Already Reported" },
  { "image": "https://http.dog/226.jpg", "statusCode": 226, "title": "IM Used" },

  { "image": "https://http.dog/300.jpg", "statusCode": 300, "title": "Multiple Choices" },
  { "image": "https://http.dog/301.jpg", "statusCode": 301, "title": "Moved Permanently" },
  { "image": "https://http.dog/302.jpg", "statusCode": 302, "title": "Found" },
  { "image": "https://http.dog/303.jpg", "statusCode": 303, "title": "See Other" },
  { "image": "https://http.dog/304.jpg", "statusCode": 304, "title": "Not Modified" },
  { "image": "https://http.dog/305.jpg", "statusCode": 305, "title": "Use Proxy" },
  { "image": "https://http.dog/306.jpg", "statusCode": 306, "title": "Switch Proxy" },
  { "image": "https://http.dog/307.jpg", "statusCode": 307, "title": "Temporary Redirect" },
  { "image": "https://http.dog/308.jpg", "statusCode": 308, "title": "Permanent Redirect" },

  { "image": "https://http.dog/400.jpg", "statusCode": 400, "title": "Bad Request" },
  { "image": "https://http.dog/401.jpg", "statusCode": 401, "title": "Unauthorized" },
  { "image": "https://http.dog/402.jpg", "statusCode": 402, "title": "Payment Required" },
  { "image": "https://http.dog/403.jpg", "statusCode": 403, "title": "Forbidden" },
  { "image": "https://http.dog/404.jpg", "statusCode": 404, "title": "Not Found" },
  { "image": "https://http.dog/405.jpg", "statusCode": 405, "title": "Method Not Allowed" },
  { "image": "https://http.dog/406.jpg", "statusCode": 406, "title": "Not Acceptable" },
  { "image": "https://http.dog/407.jpg", "statusCode": 407, "title": "Proxy Authentication Required" },
  { "image": "https://http.dog/408.jpg", "statusCode": 408, "title": "Request Timeout" },
  { "image": "https://http.dog/409.jpg", "statusCode": 409, "title": "Conflict" },
  { "image": "https://http.dog/410.jpg", "statusCode": 410, "title": "Gone" },
  { "image": "https://http.dog/411.jpg", "statusCode": 411, "title": "Length Required" },
  { "image": "https://http.dog/412.jpg", "statusCode": 412, "title": "Precondition Failed" },
  { "image": "https://http.dog/413.jpg", "statusCode": 413, "title": "Payload Too Large" },
  { "image": "https://http.dog/414.jpg", "statusCode": 414, "title": "URI Too Long" },
  { "image": "https://http.dog/415.jpg", "statusCode": 415, "title": "Unsupported Media Type" },
  { "image": "https://http.dog/416.jpg", "statusCode": 416, "title": "Range Not Satisfiable" },
  { "image": "https://http.dog/417.jpg", "statusCode": 417, "title": "Expectation Failed" },
  { "image": "https://http.dog/418.jpg", "statusCode": 418, "title": "I'm a teapot" },
  { "image": "https://http.dog/421.jpg", "statusCode": 421, "title": "Misdirected Request" },
  { "image": "https://http.dog/422.jpg", "statusCode": 422, "title": "Unprocessable Entity" },
  { "image": "https://http.dog/423.jpg", "statusCode": 423, "title": "Locked" },
  { "image": "https://http.dog/424.jpg", "statusCode": 424, "title": "Failed Dependency" },
  { "image": "https://http.dog/425.jpg", "statusCode": 425, "title": "Too Early" },
  { "image": "https://http.dog/426.jpg", "statusCode": 426, "title": "Upgrade Required" },
  { "image": "https://http.dog/427.jpg", "statusCode": 427, "title": "Precondition Required" },
  { "image": "https://http.dog/428.jpg", "statusCode": 428, "title": "Need This Header" },
  { "image": "https://http.dog/429.jpg", "statusCode": 429, "title": "Too Many Requests" },
  { "image": "https://http.dog/431.jpg", "statusCode": 431, "title": "Request Header Fields Too Large" },
  { "image": "https://http.dog/451.jpg", "statusCode": 451, "title": "Unavailable For Legal Reasons" },

  { "image": "https://http.dog/500.jpg", "statusCode": 500, "title": "Internal Server Error" },
  { "image": "https://http.dog/501.jpg", "statusCode": 501, "title": "Not Implemented" },
  { "image": "https://http.dog/502.jpg", "statusCode": 502, "title": "Bad Gateway" },
  { "image": "https://http.dog/503.jpg", "statusCode": 503, "title": "Service Unavailable" },
  { "image": "https://http.dog/504.jpg", "statusCode": 504, "title": "Gateway Timeout" },
  { "image": "https://http.dog/505.jpg", "statusCode": 505, "title": "HTTP Version Not Supported" },
  { "image": "https://http.dog/506.jpg", "statusCode": 506, "title": "Variant Also Negotiates" },
  { "image": "https://http.dog/507.jpg", "statusCode": 507, "title": "Insufficient Storage" },
  { "image": "https://http.dog/508.jpg", "statusCode": 508, "title": "Loop Detected" },
  { "image": "https://http.dog/510.jpg", "statusCode": 510, "title": "Not Extended" },
  { "image": "https://http.dog/511.jpg", "statusCode": 511, "title": "Network Authentication Required" }
];

//Define a GET mode REST Method on that REST Object
insertDogs.get("/",async(req:any,res:any):Promise<any>=>{
    //Connect to mongodb
    const clientObj:any = new mongodb.MongoClient(MONGO_URI,{
        tls: true,
        serverSelectionTimeoutMS: 3000,
        autoSelectFamily: false,
    });

    try{
        //get db ref
        let db:any = clientObj.db('HttpStatus');

        //get db ref and perform insertion
        let results:any = await db.collection('dogs').insertMany(documents);

        //validate the result
        if(results.insertedId != null)
            res.status(201).json({'msg':'InsertedAll..'});
        else
            res.status(404).json({'msg':'Error!!'});
    }catch(err){
        console.error(err);
        res.status(404).json({'msg':'Fatal Error!!'});
    }finally{
        res.end();
        clientObj.close();
    }
});

//export the module
export default insertDogs;