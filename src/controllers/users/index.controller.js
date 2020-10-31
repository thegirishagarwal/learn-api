const userModel = require('../../models/users.model');
const userMessage = global.apiMessage('users');
const userService = require('../../services/users.service');
exports.GetUsers = (req, res) => {

    let PAGE_NUMBER = 1;
    if (req.params.page && req.params.page > 0) {
        PAGE_NUMBER = req.params.page;
    }
    userService.GetUsers(req.params).then(result => {
        const resData = {
            users: {
                total_pages: result.pages,
                total_records: result.total,
                page: PAGE_NUMBER,
                data: result.docs
            },
        }
        const response = global.responseData(global.constant.HTTP_CODES[0], '', resData);
        res.status(global.constant.HTTP_CODES[0]).send(response);
    }).catch(err => {
        const response = global.responseData(global.constant.HTTP_CODES[4], 'Something went wrong!', '');
        res.status(global.constant.HTTP_CODES[4]).send(response);
    })
}

exports.GetUser = (req, res) => {
    userService.GetSingleUser(req.params.userID).then(result => {
        let response = {};
        if (result === null) {
            response = global.responseData(global.constant.HTTP_CODES[2], 'User is not exists');
            res.status(global.constant.HTTP_CODES[2]);
        } else {
            response = global.responseData(global.constant.HTTP_CODES[0], '', result);
            res.status(global.constant.HTTP_CODES[0]);
        }
        res.send(response);
    })
}

exports.PostUser = (req, res) => {
    userService.CreateUser(req.body).then(result => {
        if(result.status) {
            const response = global.responseData(global.constant.HTTP_CODES[1], result.message);
            res.status(global.constant.HTTP_CODES[1]).send(response);
        } else {
            const response = global.responseData(global.constant.HTTP_CODES[0], userMessage.added);
            res.status(global.constant.HTTP_CODES[0]).send(response);
        }
    })
    
}

exports.PutUser = (req, res) => {
    userService.UpdateUser(req.params.userID, req.body).then(result => {
        if(result.status) {
            const response = global.responseData(global.constant.HTTP_CODES[1], result.message);
            res.status(global.constant.HTTP_CODES[1]).send(response);
        } else {
            const response = global.responseData(global.constant.HTTP_CODES[0], userMessage.updated);
            res.status(global.constant.HTTP_CODES[0]).send(response);
        }
    }).catch(err => {
        if (err.keyPattern.email) {
            const response = global.responseData(global.constant.HTTP_CODES[4], userMessage.email.isAlready);
            res.status(global.constant.HTTP_CODES[4]).send(response);
        }
    });
}

exports.DeleteUser = (req, res) => {
    userService.DeleteUser(req.params.userID).then(() => {
        response = global.responseData(global.constant.HTTP_CODES[0], userMessage.deleted);
        res.status(global.constant.HTTP_CODES[0]).send(response);
    })
}

exports.DeleteAll = (req, res) => {
    userService.DeleteAllUsers().then(() => {
        const response = global.responseData(global.constant.HTTP_CODES[0], 'All users deleted');
        res.status(global.constant.HTTP_CODES[0]).send(response);
    })
}
