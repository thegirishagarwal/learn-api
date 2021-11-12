const userModel = require('../models/users.model');

exports.GetUsers = async (queryParams) => {


    if (queryParams.fields && queryParams.skipFields) {
        const response = {
            status: 1,
            message: 'Please use one at a time between fields and skipFields'
        };
        return await response;
    }

    const condData = ['name', 'email', 'address'];
    const project = {
        _id: 1,
        name: 1,
        email: 1,
        address: 1
    }
    if (queryParams.fields) {
        condData.forEach(data => {
            if (queryParams.fields.includes(data)) {
                project[data] = 1
            } else {
                delete project[data]
            }
        })
    }
    if (queryParams.skipFields) {
        condData.forEach(data => {
            if (!queryParams.skipFields.includes(data)) {
                project[data] = 1
            } else {
                delete project[data]
            }
        })
    }
    

    const whereCondition = [
        {
            $project: project
        }
    ];
    /**
      * 1. Manage page limit
    */
    let PAGE_NUMBER = 1;
    if (queryParams.page && queryParams.page > 0) {
        PAGE_NUMBER = queryParams.page;
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