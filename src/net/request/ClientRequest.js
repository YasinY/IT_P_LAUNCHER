let lastRequest;

class ClientRequest {

    createRequest(requestType) {
        if (lastRequest < Date.now()) {
            lastRequest = Date.now() + 15000; //15 seconds delay between requests
            const request = async () => {
                const response = await fetch('http://www.it-processes.com/');
                State.prototype.parseResponse(response.status)
                return response.json();
            }

        } else {
            console.log("Please wait a few seconds before making a new request..")
        }
    }
}
