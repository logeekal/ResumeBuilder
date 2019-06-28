db = db.getSiblingDB('resumebuilder');
db.createCollection("users")
db.createUser({
    user : "resumeadmin",
    pwd :  "resume@admin@password",
    roles : [
        {role : "dbOwner", db:"resumebuilder"}
    ]
});


