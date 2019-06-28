const mongoose = require('mongoose');
const  { DB_URL, LOCAL_DB_USERNAME, LOCAL_DB_PASS, DB_NAME } = require('../config');
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
            console.log(`Mongoose is also conneting to ${this.url}/${DB_NAME}`)
            mongoose.connect(`${this.url}/${DB_NAME}`,this.options,(err)=>{
                if(err){
                    console.log(`Cannot connect to mongoose : ${err}`);

                }else{
                    console.log(`Mongoose connected now!`);
                }
            });
            MongoClient.connect(this.url, this.options, (err, client)=>{
                if(!err){
                    console.log(`Succesfully established connection`);
                    this.db = client.db(DB_NAME);
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