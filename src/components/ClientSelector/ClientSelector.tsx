import { Select } from "antd";
import React, { FC, useCallback } from "react";
import { Client } from "../../models/Client";
import { createStyles } from "../../utilities/styles";

interface IClientSelectorProps {
    readonly onChange: (newClientId: string | undefined) => void;
    readonly selectedClientName: string | undefined;
    readonly clients: Client[];
    readonly className?: string;
    readonly isLoading: boolean;
}

const ClientSelector: FC<IClientSelectorProps> = ({
    onChange,
    className,
    clients,
    selectedClientName,
    isLoading,
}) => {
    const handleOptionChange = useCallback((clientName: string | undefined) => {
        if (onChange) {
            onChange(clientName);
        }
    }, [onChange]);

    return (
        <Select
            className={className}
            style={styles.select}
            placeholder="Select a workspace client (optional)"
            defaultActiveFirstOption={false}
            value={selectedClientName}
            onChange={handleOptionChange}
            allowClear={true}
            loading={isLoading}
            disabled={isLoading}
        >
            {clients.map(renderClient)}
        </Select>
    );
};

function renderClient(client: Client): React.ReactNode {
    return (
        <Select.Option value={client.name} key={client.name}>
            {client.name}
        </Select.Option>
    );
}

const styles = createStyles({
    select: {
        minWidth: 180,
    },
});

export default ClientSelector;
