import { millisecondsToHours } from "../utilities/TimeConverter";
import { TimeEntry } from "./TimeEntry";

export class ReportProject {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly timeInMilliseconds: number,
        public readonly client: string,
        public readonly hexColor: string,
        public readonly timeEntries: TimeEntry[],
    ) {}

    public get timeInHours(): number {
        return millisecondsToHours(this.timeInMilliseconds);
    }
}
