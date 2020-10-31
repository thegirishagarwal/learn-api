module.exports = responseData = (status, message, data) => {
    return {
        responseStatus: status,
        responseMessage: message,
        responseData: data || {}
    }
}



// module.exports = responseData;