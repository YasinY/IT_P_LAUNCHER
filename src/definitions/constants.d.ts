type relativePaths = Record<string, string>
type animated = JSON;
interface Window {
    $: JQueryStatic
    jQuery: JQueryStatic
}
declare module NodeJS {
    interface Global {
        relativePaths: relativePaths
        animated: animated
    }
}
