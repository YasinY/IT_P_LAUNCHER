let jwt = require("jsonwebtoken")
let request = require("request")

var data = JSON.stringify("haha lol")
console.log(data)
console.log(jwt.sign({ username: 'bar', password: 'maa' }, 'privateKey'))

function submitData(username, password) {
    var data = jwt.sign(JSON.stringify(username + password), "privateKey", "RS256");

    var options = {
        headers: {
            'Content-Length': data.length,
            'Content-Type': 'application/json',
            'user-agent': 'Mozilla/5.0' //TODO maybe custom user agent for validation serverside
        },
        method: 'POST',
        uri: "url here",
        path: "login",
        body: data,
    }
    request.post(options, function (error, response, body) {

    })
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(username + password),
        url: "todo url here",
        success: function (data) {

        }
    })
}

function getDaata() {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "todo url here",
        success: function (data) {

        }
    })
}