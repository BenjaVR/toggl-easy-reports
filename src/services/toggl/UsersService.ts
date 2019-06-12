import BaseTogglApiService from "./BaseTogglApiService";

export interface IUser {
    data: {
        email: string;
        fullname: string;
    };
}

export default class UsersService extends BaseTogglApiService {
    public static async getCurrentUser(): Promise<IUser> {
        return await this.fetch<IUser>("/api/v8/me");
    }
}
