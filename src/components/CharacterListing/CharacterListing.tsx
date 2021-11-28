import React, { useContext } from "react";
import { CharacterListingContext, CharacterListingProvider } from "./CharacterListingContext";
import { CharacterProfile } from "../CharacterProfile";

import styles from "./CharacterListing.module.css";

const CharacterList: React.FC = () => {
    const characterListing = useContext(CharacterListingContext);

    if (characterListing.fetchError) {
        return <>Unable to retrieve character listing.</>;
    }

    if (characterListing.characters === null) {
        return <>Loading</>;
    }

    if (characterListing.characters.length === 0) {
        return <>No Characters found!</>;
    }

    return (
        <div>
            {characterListing.characters.map((character) => (
                <CharacterProfile
                    key={`character-${character.significanceIndex}`}
                    character={character}
                />
            ))}
        </div>
    );
};

const CharacterListingContainer = () => {
    return (
        <section className={styles["characterList"]}>
            <div className={styles["characterListControls"]}>
                <div className={styles["characterListControls__combo"]}>
                    <label htmlFor="characterListControls__category">Category</label>
                    <select name="category" id="characterListControls__category">
                        <option value="">All Categories</option>
                        <option value="hobbit">Hobbit</option>
                    </select>
                </div>

                <div className={styles["characterListControls__combo"]}>
                    <label htmlFor="characterListControls__ordering">Order by</label>
                    <select name="ordering" id="characterListControls__ordering">
                        <option value="alphabetical">Alphabetical</option>
                        <option value="significance">Significance</option>
                    </select>
                </div>
            </div>
            <CharacterListingProvider>
                <CharacterList />
            </CharacterListingProvider>
        </section>
    );
};

export default CharacterListingContainer;
