const userModel = require('../models/users.model');

exports.GetUsers = (params) => {
    const whereCondition = [
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                address: 1
            }
        }
    ];
    /**
      * 1. Manage page limit
    */
   let PAGE_NUMBER = 1;
   if (params.page && params.page > 0) {
       PAGE_NUMBER = params.page;
   }
    const aggregate = userModel.aggregate(whereCondition);
    const options = {
        page: PAGE_NUMBER,
        limit: 25,
    };

    return userModel.aggregatePaginate(aggregate, options);
}

exports.GetSingleUser = (userID) => {
    const whereCondition = {
        _id:1,
        name: 1,
        email: 1,
        address: 1
    };

    return userModel.findById(userID, whereCondition);
}

exports.CreateUser = async (bodyParams) => {
    const body = {
        name: bodyParams.name || '',
        email: bodyParams.email || '',
        address: {
            address_line1: bodyParams.address.address_line1 || '',
            address_line2: bodyParams.address.address_line2 || '',
            city: bodyParams.address.city || '',
            state: bodyParams.address.state || '',
            country: bodyParams.address.country || '',
            zip: bodyParams.address.zip || ''
        } || {},
    };


    if (body.email === '') {
        const data = {
            status: 1,
            message: 'Email is Required'
        };
        return await data
    }

    return userModel.find({email: body.email}).then(async result => {
        if (result.length > 0) {
            const data = {
                status: 1,
                message: 'Email is already exists'
            };
            return await data
        }
        const user = new userModel(body);
        return user.save();
    });
}

exports.UpdateUser = async (userID, bodyParams) => {
    let response = {};
    // const body = {
    //     name: req.body.name || '',
    //     email: req.body.email || '',
    //     address: {
    //         address_line1: req.body.address.address_line1 || '',
    //         address_line2: req.body.address.address_line2 || '',
    //         city: req.body.address.city || '',
    //         state: req.body.address.state || '',
    //         country: req.body.address.country || '',
    //         zip: req.body.address.zip || ''
    //     } || {},
    // };
    if (bodyParams.email === '') {
        const data = {
            status: 1,
            message: 'Email is Required'
        };
        return await data
    }
    
    return userModel.findOneAndUpdate({_id: userID}, bodyParams)


    if (body.email === '') {
        const data = {
            status: 1,
            message: 'Email is Required'
        };
        return await data
    }

    return userModel.find({email: body.email}).then(async result => {
        if (result.length > 0) {
            const data = {
                status: 1,
                message: 'Email is already exists'
            };
            return await data
        }
        const user = new userModel(body);
        return user.save();
    });
}

exports.DeleteUser = (userID) => {
    return userModel.findByIdAndDelete(userID);
}

exports.DeleteAllUsers = () => {
    return userModel.remove();
}