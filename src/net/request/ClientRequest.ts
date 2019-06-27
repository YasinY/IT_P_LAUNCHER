class ClientRequest {

    lastRequest: number = 0;

    createRequest(type: RequestType) {
        if(this.lastRequest < Date.now()) {
            this.lastRequest = Date.now() + 15000;
            const request = async () => {
                const response = await fetch('http://www.it-processes.com/');

                return response.json();
            }
        } else {
            console.log("Please wait a few seconds.")
        }
    }
}

