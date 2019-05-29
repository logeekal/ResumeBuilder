db = db.getSiblingDB('resumeDb');
db.createUser({
    user : "resume",
    password :  "resume",
    roles : [
        {role : "dbOwner", db:"resumeDb"}
    ]
});