const userModel = require('../../models/users.model');
exports.GetUsers = (req, res) => {
    const whereCondition = {
        _id:0,
        name: 1,
        email: 1,
        address: 1
    };
    userModel.find({}, whereCondition).then(result => {
        res.send(result)
    })
}

exports.GetUser = (req, res) => {
    const userID = req.params.userID;

    userModel.find({_id: userID}).then(result => {
        res.send(result)
    })
}

exports.PostUser = (req, res) => {
    const body = req.body;
    if (!body.email) {
        res.send('Email is Required');
    } else {
        userModel.find({email: body.email}).then(result => {
            if (result.length > 0) {
                res.send('Email is already taken');
            } else {
                const user = new userModel(body);
                user.save().then(() => {
                    res.send('Add success');
                })
            }
        })
    }
    
}