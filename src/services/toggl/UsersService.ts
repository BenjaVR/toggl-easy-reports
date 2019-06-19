import BaseTogglApiService from "./BaseTogglApiService";

interface IUserResponse {
    data: IUser;
}

export interface IUser {
    email: string;
    fullname: string;
    image_url: string;
}

export default class UsersService extends BaseTogglApiService {
    public static async getCurrentUser(): Promise<IUser> {
        const userReponse = await this.fetch<IUserResponse>("/api/v8/me");
        return userReponse.data;
    }
}
