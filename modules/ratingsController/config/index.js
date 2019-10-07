module.exports.localConfig = {
    "host": "",
    "user": "",
    "password": "",
    "database": "",
    "connectionLimit": 100,
    "mongoUrl": "mongodb+srv://devi:qwerty.12345@cluster0-i8xqe.gcp.mongodb.net/test?retryWrites=true&w=majority"
}
module.exports.appConstants = {    
    "bodyLimit": "50 mb",
    "port": process.env.PROCESS_PORT 
}
module.exports.secretKeys = {
    "secret": process.env.SECRET_KEY
}
