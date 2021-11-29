import React, { useState } from "react";

interface SimpleComboBoxProps {
    options: {
        key: string;
        value: string;
    }[];
    selectedOption: SimpleComboBoxProps["options"][number]["key"];
    onSelectedOptionChange?: (key: SimpleComboBoxProps["options"][number]["key"]) => void;
    className: string;
    name: string;
}

/**
 * Simple wrapper around an HTML Select/Label pair
 */
export const SimpleComboBox: React.FC<SimpleComboBoxProps> = ({
    className,
    name,
    options,
    selectedOption,
    onSelectedOptionChange,
}) => {
    // Just using a simple random string for the ID to make sure the label is
    // appropriately connected to the select element.
    const [randomSelectId] = useState((Math.random() + 1).toString(36).substring(7));

    const onSelectChanged: React.ChangeEventHandler<HTMLSelectElement> = (evt) => {
        if (onSelectedOptionChange) {
            onSelectedOptionChange(evt.currentTarget.value);
        }
    };

    return (
        <div className={className}>
            <label htmlFor={randomSelectId}>{name}</label>
            <select
                name={name}
                id={randomSelectId}
                onChange={onSelectChanged}
                value={selectedOption}
            >
                {options.map((opt) => (
                    <option value={opt.key} key={opt.key}>
                        {opt.value}
                    </option>
                ))}
            </select>
        </div>
    );
};
