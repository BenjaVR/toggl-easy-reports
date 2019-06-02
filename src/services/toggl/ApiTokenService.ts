export default class ApiTokenService {
    private static localStorageKey = "TogglEasyReports_ApiKey";

    public static getToken(): string {
        return localStorage.getItem(this.localStorageKey) || "";
    }

    public static setToken(token: string): void {
        return localStorage.setItem(this.localStorageKey, token);
    }
}
