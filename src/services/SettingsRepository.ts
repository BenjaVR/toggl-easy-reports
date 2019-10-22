export default class SettingsRepository {
    public static get togglApiToken(): string {
        return localStorage.getItem(this.togglApiTokenKey) || "";
    }

    public static set togglApiToken(token: string) {
        localStorage.setItem(this.togglApiTokenKey, token);
    }

    public static get roundProjectDurationsDownToMinutes(): number {
        const value = localStorage.getItem(this.roundProjectDurationsDownToMinutesKey);
        if (value === null) {
            return 0;
        }
        const parsedValue = JSON.parse(value);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }

    public static set roundProjectDurationsDownToMinutes(minutes: number) {
        localStorage.setItem(this.roundProjectDurationsDownToMinutesKey, JSON.stringify(minutes));
    }

    private static roundProjectDurationsDownToMinutesKey = "TogglEasyReports_Settings_RoundProjectDurationsDownToMinutes";
    private static togglApiTokenKey = "TogglEasyReports_Settings_TogglApiToken";
}
