import React, { useContext } from "react";
import { CharacterProfile } from "../CharacterProfile";
import { CharacterListingContext } from "./CharacterListingContext";

export const CharacterList: React.FC = () => {
    const characterListing = useContext(CharacterListingContext);

    if (characterListing.fetchError) {
        return <div>Unable to retrieve character listing.</div>;
    }

    if (characterListing.characters === null) {
        return <div>Loading</div>;
    }

    if (characterListing.characters.length === 0) {
        return <div>No Characters found!</div>;
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
