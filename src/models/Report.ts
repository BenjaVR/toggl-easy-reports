import { millisecondsToHours } from "../utilities/TimeConverter";
import { ReportProject } from "./ReportProject";

export class Report {
    constructor(public readonly totalTimeInMilliseconds: number, public readonly projects: ReportProject[]) {}

    public get totalTimeInHours(): number {
        return millisecondsToHours(this.totalTimeInMilliseconds);
    }
}
