import { User } from "../../models/User";
import { Workspace } from "../../models/Workspace";
import { FirstDayOfTheWeek } from "../locale/LocaleManager";
import BaseTogglApiService from "./BaseTogglApiService";

interface IUserResponse {
    data: IUser;
}

interface IUser {
    email: string;
    fullname: string;
    image_url: string;
    workspaces: IWorkspace[];
    default_wid: number;
    beginning_of_week: number;
}

interface IWorkspace {
    readonly id: number;
    readonly name: string;
}

export default class UsersService extends BaseTogglApiService {
    public static async getCurrentUser(): Promise<User> {
        const userReponse = await this.fetch<IUserResponse>("/api/v8/me");
        const { data } = userReponse;
        const workspaces = data.workspaces.map(workspace => {
            return new Workspace(workspace.id, workspace.name);
        });
        return new User(
            data.email,
            data.fullname,
            data.image_url,
            data.default_wid,
            workspaces,
            data.beginning_of_week as FirstDayOfTheWeek,
        );
    }
}
