let jwt = require("jsonwebtoken")
let request = require("request")

//document.cookie = 'token=hR_lVjFDKAUbuRRKmNCSZ3mlvpcWi1sA; expires=Fri, 31 Dec 9999 23:59:59 GMT; domain=https://my-secured-fake-site.com; path=/; secure';
console.log(Buffer.from("test:testetr", "ascii").toString("base64"))
console.log(new Date().toUTCString())

function requestIdentification() {

}
function sendLogin(username, password) {

}
function submitData(username, password) {
    let time = new Date(new Date().getTime() + 2 * 60000).toUTCString();
    let key = Buffer.from(username + ":" + password, "ascii").toString("base64");
    let data = jwt.sign({username: username, password: password}, key, 'RS256');

    let options = {
        headers: {
            'Content-Length': data.length,
            'Content-Type': 'application/json',
            'user-agent': 'Mozilla/5.0', //TODO maybe custom user agent for validation serverside
            'cookie': 'token=' + key + '; expires=' + time + '; domain=it-processes.com; path=/; secure'
        },
        method: 'POST',
        uri: 'url here',
        path: 'login',
        body: data,
    }
    request.post(options, function (error, response, body) {

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