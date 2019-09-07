type relativePaths = Record<string, string>
type animated = JSON;
declare module NodeJS {
    interface Global {
        relativePaths: relativePaths
        animated: animated
    }
}
