export class TimeEntry {
    public readonly parsedGroupTitle: string | undefined;
    public readonly parsedEntryTitle: string;

    private readonly groupTimeEntriesRegex = new RegExp("\\[(.+)] - (.+)"); // TODO: setting/parameter?

    constructor(public readonly title: string, public readonly timeInMilliseconds: number) {
        const parsedTitle = this.groupTimeEntriesRegex.exec(this.title);
        if (parsedTitle && parsedTitle.length === 3) {
            // The task has a group [1] and title [2]. [0] is the input string.
            this.parsedGroupTitle = parsedTitle[1];
            this.parsedEntryTitle = parsedTitle[2];
        } else {
            this.parsedGroupTitle = undefined;
            this.parsedEntryTitle = this.title;
        }
    }
}
