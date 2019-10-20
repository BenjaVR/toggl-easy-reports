import moment from "moment";
import { ReportProject } from "../models/ReportProject";

interface IRoundedTimeEntry {
    readonly reportProject: ReportProject;
    readonly roundedMinutes: number;
}

export function roundReportProjectsDownToMinutes(
    reportProjects: ReportProject[],
    roundMinutes: number,
): IRoundedTimeEntry[] {

    if (roundMinutes === 0) {
        return reportProjects.map((project) => {
            return {
                reportProject: project,
                roundedMinutes: roundMillisecondsToMinutes(project.timeInMilliseconds),
            };
        });
    }

    const roundMilliseconds = roundMinutes * 1000 * 60;
    const roundedTimeEntries: IRoundedTimeEntry[] = [];
    let remainderMilliseconds: number = 0;

    reportProjects.forEach((reportProject) => {
        const projectMillisecondsWithRemainder = reportProject.timeInMilliseconds + remainderMilliseconds;
        const newRemainderMilliseconds = projectMillisecondsWithRemainder % roundMilliseconds;
        const roundedProjectMinutes = roundMillisecondsToMinutes(
            projectMillisecondsWithRemainder - newRemainderMilliseconds,
        );
        roundedTimeEntries.push({
            reportProject,
            roundedMinutes: roundedProjectMinutes,
        });
        remainderMilliseconds = newRemainderMilliseconds;
    });

    return roundedTimeEntries;
}

function roundMillisecondsToMinutes(milliseconds: number) {
    return Math.round(moment.duration(milliseconds).asMinutes());
}
