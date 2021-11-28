import React, { useContext } from "react";
import { CharacterListingContext } from "./CharacterListingContext";
import { CharacterProfile } from "./components/CharacterProfile";

const CharacterListing: React.FC = () => {
    const characterListing = useContext(CharacterListingContext);

    if (characterListing == null) {
        return <>Loading</>;
    }

    if (characterListing.length === 0) {
        return <>No Characters found!</>;
    }

    return (
        <div>
            {characterListing.map((character) => (
                <CharacterProfile
                    key={`character-${character.significanceIndex}`}
                    character={character}
                />
            ))}
        </div>
    );
};

export default CharacterListing;
