let jwt = require("jsonwebtoken");
let needle = require("needle");

/**
 * md5 is limited to 32 chars
 * @param username
 * @param password
 * @returns {*|boolean}
 */
function canIdentify(username, password) {
    return isASCII(username) && isASCII(password) && username.length <= 32 && password.length <= 32;
}

function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}

function callback(error, response, body) {

}

function identify(username, password) {
    if (!canIdentify(username, password)) {
        return false;
    }
    doRequest(username, password)
}

function doRequest(username, password) {
    let options = {
        headers: {
            'Content-Length': data.length,
            'Content-Type': 'application/json',
            'user-agent': 'Mozilla/5.0' //TODO maybe custom user agent for validation serverside
        },
    }
    needle.request('post', 'https://www.it-processes.com/identification', {
        username: username,
        password: require('crypto').createHash('md5').update(password).digest("hex")
    }, options, function (error, response) {
        console.log("Got a response! " + error + " -> " + response)
    })
}
