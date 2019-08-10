import * as moment from "moment";

/**
 * Returns the hours, rounded with maximum of 2 decimals.
 */
export function millisecondsToHours(milliseconds: number): number {
    const timeInHours = moment.duration(milliseconds).asHours();
    return Math.round(timeInHours * 100) / 100;
}
