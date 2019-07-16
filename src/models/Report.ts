import * as moment from "moment";
import { TimeEntry } from "./TimeEntry";

export class Report {
    constructor(public readonly totalTimeInMilliseconds: number, public readonly timeEntries: TimeEntry[]) {}

    public get totalTimeInHours(): number {
        const timeInHours = moment.duration(this.totalTimeInMilliseconds).asHours();
        return Math.round(timeInHours * 100) / 100;
    }
}
