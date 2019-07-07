import { FirstDayOfTheWeek } from "../services/locale/LocaleManager";
import { Workspace } from "./Workspace";

export class User {
    constructor(
        public readonly email: string,
        public readonly fullName: string,
        public readonly imageUrl: string,
        public readonly defaultWorkspaceId: number,
        public readonly workspaces: Workspace[],
        public readonly firstDayOfTheWeek: FirstDayOfTheWeek,
    ) {}
}
