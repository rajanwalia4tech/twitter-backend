const {usersService} = require('../services');

class UserController{
    async signup(req,res){
        const response = await usersService.signup(req.body);
        return res.status(response.statusCode).json(response);
    }

    async getUserProfile(req,res){
        const {userId} = req.query;
        const response = await usersService.getUserProfile(userId);
        return res.status(response.statusCode).json(response);
    }
}

module.exports = new UserController();