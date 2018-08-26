var User = require("../models/user");

exports.get = async (query, page, limit) => {
    var options = {page, limit};

    try {
        let user = await User.paginate(query, options);

        return user;
    } catch (e) {
        throw Error(e);
    }
}

exports.createUser = async (user) => {
    var newUser = new User ({
        email: user.email,
        password: user.password,
        name: user.name,
        phone_no: user.phone_no,
        created_at: new Date()
    });

    try {
        var savedUser = await newUser.save();

        return savedUser;
    } catch (e) {
        throw Error(e);
    }
}

exports.updateUser = async (user) => {
    var id = user.id;

    try {
        var cur_user = await User.findById(id);
    } catch (e) {
        throw Error("Error occured while finding the user")     
    }

    cur_user.name = user.name;
    cur_user.email = user.email;
    cur_user.city = user.city;
    cur_user.province = user.province
    cur_user.phone_no = user.phone_no

    if (user.new_password)
        cur_user.password = user.new_password

    try {
        var savedUser = await cur_user.save();

        return savedUser;
    } catch(e) {
        throw Error(e.message);
    }
}