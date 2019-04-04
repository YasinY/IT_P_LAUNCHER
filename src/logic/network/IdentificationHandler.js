let request = require("request")

let identification;

function isExpired() { //TODO server sided convert timezone always to gmt + get way of reading cookies
    return isIdentified() && (new Date().getTime() - Date.parse(cookie.get("expires"))) >= 0;
}

function isIdentified() {
    return identification.length > 0; //if has saved anything
}

function requestIdentification(username, password) {
    if (!isExpired()) {
        console.log("No need for new identification if is not expired.")
        return;
    }
    let identification = fillIdentification(username, password, macAddress, os)
    request.post(identification, function (error, response, body) {
        if (response === 401) { //TODO OK
            body = identification;
        } else { //TODO FAILED TO AUTHENTICATE

        }
    })
}

function fillIdentification(username, password, macAddress, os) {
    let key = Buffer.from(username + ":" + password, "ascii").toString("base64");
    return {
        headers: {
            'Content-Type': 'application/json',
            'user-agent': 'Mozilla/5.0', //TODO maybe custom user agent for validation serverside
        },
        method: 'POST',
        uri: 'https://www.it-processes.com/',
        path: 'identify',
        body: {
            username: username,
            password: password,
            macAddress: macAddress,
            os: os
        },
    }
}