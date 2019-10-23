import { Dropdown, Icon, Menu, message } from "antd";
import * as React from "react";
import ReactDOM from "react-dom";
import { BindThis } from "../../utilities/BindThis";
import { RoundDurationMinutesFormItem } from "./formItems/RoundDurationMinutesFormItem";
import { TogglApiTokenFormItem } from "./formItems/TogglApiTokenFormItem";
import styles from "./SettingsMenu.module.scss";

export interface IOptionsMenuItemProps {
    readonly onSave: (savedMessage: string) => void;
}

interface IOptionsMenuState {
    readonly isDropdownOpen: boolean;
}

export default class SettingsMenu extends React.Component<{}, IOptionsMenuState> {
    private dropdownContentRef: Menu | undefined;
    private dropdownRef: Dropdown | undefined;

    constructor(props: {}) {
        super(props);

        this.state = {
            isDropdownOpen: false,
        };
    }

    public componentDidMount(): void {
        window.addEventListener("mousedown", this.handleDropdownOutsideClicked);
    }

    public componentWillUnmount(): void {
        window.removeEventListener("mousedown", this.handleDropdownOutsideClicked);
    }

    public render(): React.ReactNode {
        return (
            <Dropdown
                ref={(ref) => (this.dropdownRef = ref ? ref : undefined)}
                overlay={this.renderMenu()}
                visible={this.state.isDropdownOpen}
                overlayClassName={styles.dropdownOverlay}
            >
                <Icon type="setting" theme="outlined" className={styles.icon} onClick={this.toggleDropdown} />
            </Dropdown>
        );
    }

    @BindThis()
    private renderMenu(): React.ReactNode {
        return (
            <Menu className={styles.menu} ref={(ref) => (this.dropdownContentRef = ref ? ref : undefined)}>
                <TogglApiTokenFormItem onSave={this.handleSave} />
                <RoundDurationMinutesFormItem onSave={this.handleSave} />
            </Menu>
        );
    }

    @BindThis()
    private handleSave(savedMessage: string): void {
        message.success(savedMessage);
        this.closeDropdown();
    }

    @BindThis()
    private toggleDropdown(): void {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
    }

    @BindThis()
    private closeDropdown(): void {
        this.setState({
            isDropdownOpen: false,
        });
    }

    /**
     * Event handler to detect clicks outside the opened dropdownOverlay, to know when to close it.
     */
    @BindThis()
    private handleDropdownOutsideClicked(event: MouseEvent): void {
        if (!this.state.isDropdownOpen) {
            return;
        }
        const elementClickedOn = event.target as Node;
        const dropdownDomElement = ReactDOM.findDOMNode(this.dropdownRef);
        const dropdownContentDomElement = ReactDOM.findDOMNode(this.dropdownContentRef);
        const elementClickedOnIsDropdownIcon = dropdownDomElement && dropdownDomElement.contains(elementClickedOn);
        const elementClickedOnIsOutsideDropdownContent =
            dropdownContentDomElement && !dropdownContentDomElement.contains(elementClickedOn);
        if (elementClickedOnIsOutsideDropdownContent && !elementClickedOnIsDropdownIcon) {
            this.closeDropdown();
        }
    }
}
