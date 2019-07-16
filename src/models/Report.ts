import { ReportProject } from "./ReportProject";

export class Report {
    constructor(public readonly totalTimeInMilliseconds: number, public readonly projects: ReportProject[]) {}
}
