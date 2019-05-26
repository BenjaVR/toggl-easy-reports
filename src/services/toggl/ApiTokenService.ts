export default class ApiTokenService {
    public static async getToken(): Promise<string> {
        return Promise.resolve("APIKEY"); // TODO
    }
}
