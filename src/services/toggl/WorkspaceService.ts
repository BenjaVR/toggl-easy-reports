import { Client } from "../../models/Client";
import BaseTogglApiService from "./BaseTogglApiService";

interface IClient {
    readonly id: number;
    readonly wid: number;
    readonly name: string;
    readonly at: string;
    readonly notes: string;
    readonly hrate: number;
    readonly cur: string;
}

type WorkspaceClientsResponse = IClient[];

export default class WorkspaceService extends BaseTogglApiService {
    public static async getWorkspaceClients(workspaceId: number): Promise<Client[]> {
        const clientsReponse = await this.fetch<WorkspaceClientsResponse>(`/api/v8/workspaces/${workspaceId}/clients`);
        return clientsReponse.map((clientResponse) => {
            return new Client(
                clientResponse.id,
                clientResponse.wid,
                clientResponse.name,
                clientResponse.at,
                clientResponse.notes,
                clientResponse.hrate,
                clientResponse.cur,
            );
        });
    }
}
