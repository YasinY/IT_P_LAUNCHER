export class UserMachine {

    static OS_TYPES : Array<string> = ["darwin", "freebsd", "sunos", "win32"]

    public static is(operatingSystem : string) : boolean {
        return this.OS_TYPES.find((element) => operatingSystem.toLowerCase() === element) != undefined;
    }



}
