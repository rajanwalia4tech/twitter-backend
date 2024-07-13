const dbHandler = require("../db");
class UserRepository{

    createUser(payload){
        console.log(payload);
        return new Promise((resolve,reject)=>{
                dbHandler.query("INSERT INTO users SET ?",payload,(err,result)=>{
                    if(err){
                        return reject(err.message);
                    }
                    console.log(result);
                    resolve(result);
                })
            }
        )
    }


    getUserByEmail(email){
        return new Promise((resolve,reject)=>{
                dbHandler.query("SELECT * FROM users WHERE email=?",[email],(err,result)=>{
                    if(err){
                        return reject(err.message);
                    }
                    console.log(result);
                    resolve(result);
                })
            }
        )
    }

    getUserById(userId){
        return new Promise((resolve,reject)=>{
                dbHandler.query("SELECT * FROM users WHERE id=?",[userId],(err,result)=>{
                    if(err){
                        return reject(err.message);
                    }
                    console.log(result);
                    resolve(result);
                })
            }
        )
    }

}

module.exports = new UserRepository();