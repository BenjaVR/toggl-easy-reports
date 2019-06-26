import moment from "moment";

type Language = "en";

/**
 * 0 is sunday.
 * 1 is monday.
 */
type FirstDayOfTheWeek = 0 | 1;

export class LocaleManager {
    /**
     * Sets the moment.js locale, also used by Ant Design.
     * @param language
     * @param firstDayOfWeek - 0 is sunday, 1 is monday.
     */
    public static updateLocale(language: Language, firstDayOfWeek: FirstDayOfTheWeek): void {
        moment.updateLocale(language, {
            week: {
                dow: firstDayOfWeek,
                doy: 1,
            },
        });
    }
}
