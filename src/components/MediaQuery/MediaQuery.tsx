import * as React from "react";
import { BindThis } from "../../utilities/BindThis";

interface IMediaQueryProps {
    readonly mediaQuery: string;
    readonly onChange: (doesMatch: boolean) => void;
}

export default class MediaQuery extends React.Component<IMediaQueryProps> {
    private readonly mediaQuery: MediaQueryList;

    constructor(props: IMediaQueryProps) {
        super(props);

        this.mediaQuery = window.matchMedia(props.mediaQuery);
    }

    public render(): React.ReactNode {
        return null;
    }

    public componentDidMount(): void {
        this.mediaQuery.addEventListener("change", this.handleChange);

        // Initial trigger, because it will only trigger when the width is changed from now on.
        this.props.onChange(this.mediaQuery.matches);
    }

    public componentWillUnmount(): void {
        this.mediaQuery.removeEventListener("change", this.handleChange);
    }

    @BindThis()
    private handleChange(event: MediaQueryListEvent): void {
        this.props.onChange(event.matches);
    }
}
