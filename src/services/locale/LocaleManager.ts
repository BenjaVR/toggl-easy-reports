import moment from "moment";

/**
 * 0 is sunday.
 * 1 is monday.
 */
export type FirstDayOfTheWeek = 0 | 1;

export class LocaleManager {
    /**
     * Sets the moment.js locale, also used by Ant Design.
     * @param language
     * @param firstDayOfWeek - 0 is sunday, 1 is monday.
     */
    public static updateLocale(language: string, firstDayOfWeek: FirstDayOfTheWeek): void {
        language = language.replace("_", "-");
        import(`moment/locale/${language}`)
            .then(() => {
                moment.updateLocale(language, {
                    week: {
                        dow: firstDayOfWeek,
                        doy: 1,
                    },
                });
            })
            .catch(() => {
                moment.updateLocale("en", {
                    week: {
                        dow: firstDayOfWeek,
                        doy: 1,
                    },
                });
            });
    }
}
