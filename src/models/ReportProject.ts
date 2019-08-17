import { millisecondsToHours } from "../utilities/TimeConverter";
import { TimeEntry } from "./TimeEntry";

export class ReportProject {
    /**
     * TODO: expensive property when e.g. used in react render loop?
     */
    public get timeEntriesSummary(): string {
        let summaryString = "";

        const timeEntriesWithoutGroup = this.timeEntries
            .filter((entry) => entry.parsedGroupTitle === undefined)
            .sort();
        timeEntriesWithoutGroup.forEach((entry) => {
            if (summaryString !== "") {
                summaryString += "\n";
            }
            summaryString += `- ${entry.parsedEntryTitle}`;
        });

        const timeEntriesWithGroup = this.timeEntries
            .filter((entry) => entry.parsedGroupTitle !== undefined);
        const timeEntryGroups: { [groupTitle: string]: TimeEntry[] } = {};
        timeEntriesWithGroup.forEach((entry) => {
            const groupTitle = entry.parsedGroupTitle!;
            const doesGroupForEntryAlreadyExist =
                Object.keys(timeEntryGroups).indexOf(groupTitle) !== -1;
            if (doesGroupForEntryAlreadyExist) {
                timeEntryGroups[groupTitle].push(entry);
            } else {
                timeEntryGroups[groupTitle] = [entry];
            }
        });

        Object.keys(timeEntryGroups).forEach((groupTitle) => {
            if (summaryString !== "") {
                summaryString += "\n\n";
            }
            summaryString += groupTitle;
            timeEntryGroups[groupTitle].forEach((timeEntry) => {
                summaryString += `\n - ${timeEntry.parsedEntryTitle}`;
            });
        });

        return summaryString;
    }

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
