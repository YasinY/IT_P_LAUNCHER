let identificationHandler = require("IdentificationHandler")
let request = require("request")

function submitRequest(resource, version) {
    let request = getRequest(resource, version)
    request.get(request, function (error, response, body) {
            if(response == 401) { //

            }
    })
}


function getRequest(resource, version) {
    return {
        headers: {
            'Content-Type': 'application/json',
            'user-agent': 'Mozilla/5.0', //TODO maybe custom user agent for validation server-side
            'cookie': 'token=' + identificationHandler.jwt + '; domain=it-processes.com; path=/; secure'
        },
        method: 'POST',
        uri: 'https://it-processes.com/',
        path: 'resources',
        body: {
            resource: resource,
            version: version
        },
    }
}