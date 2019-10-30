import { Button, Divider, Dropdown, Icon, Menu, message, Popconfirm } from "antd";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useSettings } from "../../context/SettingsContext";
import { RoundDurationMinutesFormItem } from "./formItems/RoundDurationMinutesFormItem";
import { TogglApiTokenFormItem } from "./formItems/TogglApiTokenFormItem";
import styles from "./SettingsMenu.module.scss";

export interface IOptionsMenuItemProps {
    readonly onSave: (savedMessage: string) => void;
}

const SettingsMenu: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const settings = useSettings();
    const dropdownRef = useRef<Dropdown>(null);
    const dropdownContentRef = useRef<Menu>(null);

    useEffect(() => {
        const handleOutsideDropdownClicked = (event: MouseEvent) => {
            if (!isDropdownOpen) {
                return;
            }
            const elementClickedOn = event.target as Node;
            const dropdownDomElement = ReactDOM.findDOMNode(dropdownRef.current);
            const dropdownContentDomElement = ReactDOM.findDOMNode(dropdownContentRef.current);
            const elementClickedOnIsDropdownIcon = dropdownDomElement && dropdownDomElement.contains(elementClickedOn);
            const elementClickedOnIsOutsideDropdownContent =
                dropdownContentDomElement && !dropdownContentDomElement.contains(elementClickedOn);
            if (elementClickedOnIsOutsideDropdownContent && !elementClickedOnIsDropdownIcon) {
                closeDropdown();
            }
        };
        window.addEventListener("mousedown", handleOutsideDropdownClicked);
        return () => {
            window.removeEventListener("mousedown", handleOutsideDropdownClicked);
        };
    }, [isDropdownOpen]);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);

    const resetSettings = () => settings.dispatch({ type: "RESET" });
    const handleSave = (savedMessage: string) => {
        message.success(savedMessage);
        closeDropdown();
    };

    const renderMenu = () => {
        return (
            <Menu className={styles.menu} ref={dropdownContentRef}>
                <TogglApiTokenFormItem onSave={handleSave} />
                <RoundDurationMinutesFormItem onSave={handleSave} />

                <div className={styles.restoreButtonContainer}>
                    <Divider />
                    <Popconfirm
                        title="Are you sure you want to reset all settings?"
                        onConfirm={resetSettings}
                        overlayClassName={styles.restoreButtonPopoverOverlay}
                    >
                        <Button
                            type="danger"
                            ghost={true}
                        >
                            Restore defaults
                        </Button>
                    </Popconfirm>
                </div>
            </Menu>
        );
    };

    return (
        <Dropdown
            ref={dropdownRef}
            overlay={renderMenu}
            visible={isDropdownOpen}
            overlayClassName={styles.dropdownOverlay}
        >
            <Icon type="setting" theme="outlined" className={styles.icon} onClick={toggleDropdown} />
        </Dropdown>
    );
};

export default SettingsMenu;
