import BaseTogglApiService from "./BaseTogglApiService";

interface IWorkspace {
    readonly id: number;
    readonly name: string;
}

export default class WorkspacesService extends BaseTogglApiService {
    public static async getWorkspaces(): Promise<IWorkspace[]> {
        return await this.fetch<IWorkspace[]>("/api/v8/workspaces");
    }
}
