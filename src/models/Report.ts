import { TimeEntry } from "./TimeEntry";

export class Report {
    constructor(public readonly totalTimeInMilliseconds: number, public readonly timeEntries: TimeEntry[]) {}
}
