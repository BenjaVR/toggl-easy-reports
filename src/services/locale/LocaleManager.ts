import moment from "moment";

/**
 * 0 is sunday.
 * 1 is monday.
 */
export type FirstDayOfTheWeek = 0 | 1;

export class LocaleManager {
    /**
     * Sets the moment.js locale, also used by Ant Design.
     * @param firstDayOfWeek - 0 is sunday, 1 is monday.
     */
    public static updateLocale(firstDayOfWeek: FirstDayOfTheWeek): void {
        moment.updateLocale("en", {
            week: {
                dow: firstDayOfWeek,
                doy: moment.localeData().firstDayOfYear(),
            },
        });
    }
}
