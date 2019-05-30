const USER_COLLECTION = require("../config").USER_COLLECTION;

const DBConnection = require("./DBConnection").DBConnection;


const revertErr = (err)=>{
    console.log(`Error ${err}`);
    return { status: false , error: err};
}

async function addUser(userDoc) {
  try {
    const db = await DBConnection.connect();
    console.log(`Inserting Document now`);
    const userCollection = db.collection(USER_COLLECTION);
    const result = await userCollection.insertOne(userDoc);
    console.log(result);
    return { status: true, result: result };
  } catch (error) {
    console.log(`Error Occured`);
    return { status: ERROR_PREFIX, error: error };
  }
}

async function getUser(email) {
  try {
    const db = await DBConnection.connect();
    const userCollection = db.collection(USER_COLLECTION);
    const result = await userCollection.findOne({ a: parseInt(email) });
    console.log(result);
    if (!result) {
      throw `Nothing  found with email : ${email}`;
    }
    return { status: true, result: result };
  } catch (err) {
    console.log(`Error occured ${err}`);
    return { status: false, error: err };
  }
}

async function adduser(userObj){
    try{
        //validation to be done for now client.
        const db = await DBConnection.connect();
        const userCollection = db.collection(USER_COLLECTION);
        //Setting email as hash of email as _id
        

    }catch(err){
        revertErr(err);
    }
}

module.exports = { addUser, getUser };
