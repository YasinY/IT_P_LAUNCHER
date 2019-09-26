enum CallDestination {
    LOGIN_SERVER = 'localhost:8443',
    FILE_SERVER = 'localhost:8444',
    STATISTICS_SERVER = 'localhost:8445'
}

namespace CallDestination {

    export function getUrl(callDestination : CallDestination) {
        return "https://" + callDestination + "/";
    }
}
