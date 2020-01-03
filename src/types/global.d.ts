declare module NodeJS {
    interface Global {
        _isEnvironment: (environment: string) => boolean;
    }
}