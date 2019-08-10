import * as moment from "moment";
import { Report } from "../../models/Report";
import { ReportProject } from "../../models/ReportProject";
import { TimeEntry } from "../../models/TimeEntry";
import BaseTogglApiService from "./BaseTogglApiService";

interface IReportResponse {
    total_grand: number;
    data: ITimeEntryGroup[];
}

interface ITimeEntryGroup {
    id: number;
    time: number;
    title: ITimeEntryGroupTitle;
    items: ITimeEntry[];
}

interface ITimeEntryGroupTitle {
    project: string;
    client: string;
    hex_color: string;
}

interface ITimeEntry {
    title: ITimeEntryTitle;
    time: number;
}

interface ITimeEntryTitle {
    time_entry: string;
}

export class ReportsService extends BaseTogglApiService {
    /**
     * Fetches a summary report, which is a weekly Toggl report.
     * @param workspaceId
     * @param selectedDate - The week where this date is in will be used.
     */
    public static async getSummaryReport(workspaceId: number, selectedDate: moment.Moment): Promise<Report> {
        const reportResponse = await this.fetch<IReportResponse>("/reports/api/v2/summary", {
            workspace_id: `${workspaceId}`,
            since: selectedDate.startOf("week").format("YYYY-MM-DD"),
            until: selectedDate.endOf("week").format("YYYY-MM-DD"),
        });
        return new Report(
            reportResponse.total_grand,
            reportResponse.data.map((timeEntryGroup: ITimeEntryGroup) => {
                return new ReportProject(
                    timeEntryGroup.id,
                    timeEntryGroup.title.project,
                    timeEntryGroup.time,
                    timeEntryGroup.title.client,
                    timeEntryGroup.title.hex_color,
                    timeEntryGroup.items.map((timeEntry: ITimeEntry) => {
                        return new TimeEntry(timeEntry.title.time_entry, timeEntry.time);
                    }),
                );
            }),
        );
    }
}
