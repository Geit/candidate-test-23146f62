import React, { useContext, useState } from "react";
import { availableOrderings, CharacterListingContext } from "./CharacterListingContext";
import styles from "./CharacterListingControls.module.css";

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

const SimpleComboBox: React.FC<SimpleComboBoxProps> = ({
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
        <div className={styles["characterListControls__combo"]}>
            <label htmlFor={randomSelectId}>{name}</label>
            <select name={name} id={randomSelectId} onChange={onSelectChanged}>
                {options.map((opt) => (
                    <option value={opt.key} key={opt.key} selected={opt.key === selectedOption}>
                        {opt.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

const convertStringArrayIntoOptions = (str: string) => ({
    key: str,
    value: str[0].toUpperCase() + str.substr(1),
});

export const CharacterListingControls: React.FC = () => {
    const characterListing = useContext(CharacterListingContext);

    const categoriesFromData = Array.from(
        new Set(characterListing.characters?.map((char) => char.category) ?? [])
    ).map(convertStringArrayIntoOptions);

    const categoryOptions = [{ key: "all", value: "All Categories" }].concat(categoriesFromData);

    const orderingOptions = availableOrderings.map(convertStringArrayIntoOptions);

    return (
        <div className={styles["characterListControls"]}>
            <SimpleComboBox
                className={styles["characterListControls__combo"]}
                options={categoryOptions}
                selectedOption={characterListing.categoryFilter}
                onSelectedOptionChange={(data) =>
                    characterListing.dispatchUpdate({ type: "setCategoryFilter", data })
                }
                name="Category"
            />

            <SimpleComboBox
                className={styles["characterListControls__combo"]}
                options={orderingOptions}
                selectedOption={characterListing.ordering}
                onSelectedOptionChange={(data) =>
                    characterListing.dispatchUpdate({ type: "setOrdering", data })
                }
                name="Order by"
            />
        </div>
    );
};
