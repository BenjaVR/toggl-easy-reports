import qs from "qs";
import SettingsRepository from "../SettingsRepository";

interface IQueryString {
    [key: string]: string;
}

export default abstract class BaseTogglApiService {
    private static BASE_URL: string = "https://toggl.com";
    private static USER_AGENT: string = "https://github.com/BenjaVR/toggl-easy-report";

    protected static async fetch<TResponse>(urlPath: string, queryString: IQueryString = {}): Promise<TResponse> {
        const apiKey = SettingsRepository.togglApiToken;
        const url = this.buildUrl(urlPath, queryString);
        const requestInit: RequestInit = {
            headers: {
                authorization: `Basic ${btoa(`${apiKey}:api_token`)}`,
            },
            method: "GET",
        };

        // TODO: try/catch for network errors?
        const response = await fetch(url, requestInit);
        const responseData = await response.json();
        if (response.ok) {
            return responseData as TResponse;
        } else {
            // TODO: handle non-200 responses?
            throw responseData;
        }
    }

    private static buildUrl(path: string, queryString: IQueryString): string {
        if (process.env.NODE_ENV === "production") {
            path = `${this.BASE_URL}${path}`;
        }

        if (!("user_agent" in queryString)) {
            queryString.user_agent = this.USER_AGENT;
        }

        return `${path}?${qs.stringify(queryString)}`;
    }
}
