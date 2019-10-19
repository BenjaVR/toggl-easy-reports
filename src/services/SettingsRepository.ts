export default class SettingsRepository {
    public static get togglApiToken(): string {
        return localStorage.getItem(this.togglApiTokenKey) || "";
    }
    public static set togglApiToken(token: string) {
        localStorage.setItem(this.togglApiTokenKey, token);
    }
    public static get roundTimeEntriesDownToMinutes(): number {
        const value = localStorage.getItem(this.roundTimeEntriesDownToMinutesKey);
        if (value === null) {
            return 0;
        }
        const parsedValue = JSON.parse(value);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }
    public static set roundTimeEntriesDownToMinutes(minutes: number) {
        localStorage.setItem(this.roundTimeEntriesDownToMinutesKey, JSON.stringify(minutes));
    }

    private static roundTimeEntriesDownToMinutesKey = "TogglEasyReports_Settings_RoundTimeEntriesDownToMinutes";
    private static togglApiTokenKey = "TogglEasyReports_Settings_TogglApiToken";
}
