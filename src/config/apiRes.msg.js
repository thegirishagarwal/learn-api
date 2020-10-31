apiResMessage = {
    users: {
        added: 'User successfully added!',
        deleted: 'User successfully deleted!',
        updated: 'User successfully updated!',
        email: {
            isAlready: 'Email is already taken'
        }
    }
}

module.exports = function apiMessage(type) {
    return apiResMessage[`${type}`]
}
