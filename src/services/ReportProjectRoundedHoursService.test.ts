import { ReportProject } from "../models/ReportProject";
import { roundReportProjectsDownToMinutes } from "./ReportProjectRoundedHoursService";

it("should round to the nearest minute if the roundMinutes is 0", () => {
    const reportProjects = [
        new ReportProject(0, "", 2044162, "", "", []), // 34.07 minutes
        new ReportProject(1, "", 6234677, "", "", []), // 103.91 minutes
    ];

    const roundedTimeEntries = roundReportProjectsDownToMinutes(reportProjects, 0);

    expect(roundedTimeEntries.length).toBe(2);
    expect(roundedTimeEntries[0].reportProject.id).toBe(0);
    expect(roundedTimeEntries[0].roundedMinutes).toBe(34);
    expect(roundedTimeEntries[1].reportProject.id).toBe(1);
    expect(roundedTimeEntries[1].roundedMinutes).toBe(104);
});

it("should round down to the minute if the roundMinutes is 1", () => {
    const reportProjects = [
        new ReportProject(0, "", 2044162, "", "", []), // 34.07 minutes
        new ReportProject(1, "", 6234677, "", "", []), // 103.91 minutes
    ];

    const roundedTimeEntries = roundReportProjectsDownToMinutes(reportProjects, 1);

    expect(roundedTimeEntries.length).toBe(2);
    expect(roundedTimeEntries[0].reportProject.id).toBe(0);
    expect(roundedTimeEntries[0].roundedMinutes).toBe(34);
    expect(roundedTimeEntries[1].reportProject.id).toBe(1);
    expect(roundedTimeEntries[1].roundedMinutes).toBe(103);
});

it("should round down 5 minutes if the roundMinutes is 5", () => {
    const reportProjects = [
        new ReportProject(0, "", 2044162, "", "", []), // 34.07 minutes
        new ReportProject(1, "", 6234677, "", "", []), // 103.91 minutes
        new ReportProject(2, "", 473964, "", "", []), // 7.90 minutes
    ];

    const roundedTimeEntries = roundReportProjectsDownToMinutes(reportProjects, 5);

    expect(roundedTimeEntries.length).toBe(3);
    expect(roundedTimeEntries[0].reportProject.id).toBe(0);
    expect(roundedTimeEntries[0].roundedMinutes).toBe(30);
    expect(roundedTimeEntries[1].reportProject.id).toBe(1);
    expect(roundedTimeEntries[1].roundedMinutes).toBe(105);
    expect(roundedTimeEntries[2].reportProject.id).toBe(2);
    expect(roundedTimeEntries[2].roundedMinutes).toBe(10);
});
