import { TimeEntry } from "./TimeEntry";

export class TimeEntryGroup {
    constructor(public readonly groupTitle: string | undefined, public readonly timeEntries: TimeEntry[]) {}
}
