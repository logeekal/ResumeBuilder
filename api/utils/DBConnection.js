const  { DB_URL } = require('../config');
const MongoClient = require('mongodb').MongoClient;


class DBConnection{

    constructor(){
        this.db = null;
        this.options = {useNewUrlParser:true};
        this.url = DB_URL;
    }

    static connect(){
        if(this.db !== null){
            console.log(`Connection is already established.`);
            console.log(this.db);
            return Promise.resolve(this.db);
        }else{
            console.log(`Initiating DB Connection Now to : ${this.url}`);
            MongoClient.connect(this.url, this.options, (err, client)=>{
                if(!err){
                    console.log(`Succesfully established connection`);
                    this.db = client;
                    console.log(this.db);
                }else{
                    this.db = null;
                    console.log(err);
                }
            })
        }
    }

}


DBConnection.db = null;
DBConnection.options = {useNewUrlParser:true};
DBConnection.url = DB_URL;



module.exports.DBConnection = DBConnection;