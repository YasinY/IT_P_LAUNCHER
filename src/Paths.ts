import * as path from "path";

export class Paths {

    public static BASE_DIRECTORY: string = path.join(__dirname, path.sep);

    public static ASSETS: string = path.join(Paths.BASE_DIRECTORY, "assets", path.sep);
    public static RENDERINGS: string = path.join(Paths.BASE_DIRECTORY, "renderings", path.sep);

    public static UTILITIES: string = path.join(Paths.ASSETS, "utilities", path.sep);
    public static STYLESHEETS: string = path.join(Paths.ASSETS, "css", path.sep);
    public static IMAGES: string = path.join(Paths.ASSETS, "images", path.sep);
    public static CONFIGS: string = path.join(Paths.ASSETS, "config", path.sep);
    public static VIEWS: string = path.join(Paths.ASSETS, "html", path.sep);

}