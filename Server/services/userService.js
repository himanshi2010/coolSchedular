const userModel = require("../models/User")

exports.findUserByEmail = async (email) => {
    return await userModel.findOne({email});
}

exports.addUser = async (data, password) => {
    const newUser = new userModel(data);
    newUser.passwordHash = userModel.getPasswordHash(password);
    return await newUser.save();
}