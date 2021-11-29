import React, { useContext } from "react";

import { SimpleComboBox } from "../SimpleComboBox";
import { availableOrderings, CharacterListingContext } from "./CharacterListingContext";
import styles from "./CharacterListingControls.module.css";

const convertStringArrayIntoOptions = (str: string) => ({
    key: str,
    value: str[0].toUpperCase() + str.substr(1),
});

export const CharacterListingControls: React.FC = () => {
    const characterListing = useContext(CharacterListingContext);

    const categoryOptions = characterListing.availableCategories.map(convertStringArrayIntoOptions);
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
