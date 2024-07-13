const {usersRepository} = require("../repository");
class UserService{
    async signup(payload){
        // check if email already in the system/db
        const [userInfo] = await usersRepository.getUserByEmail(payload.email);
        if(userInfo)
            return {statusCode:400, success:false, message : "User with this email already exists"}

        await usersRepository.createUser(payload);
        return {statusCode:200, success:true, message : "User created Successfully"}
    }

    async getUserProfile(userId){
        const [userInfo] = await usersRepository.getUserById(userId);
        if(!userInfo)
            return {statusCode:400, success:false, message : "User doesn't exist",data : {}}
        delete userInfo.password;
        return {statusCode:200, success:true, message : "Fetched the user information successfully",data : {userInfo}};
    }
}

module.exports = new UserService();