import React, { useContext } from "react";
import {
    CharacterListingContext,
    CharacterListingProvider,
} from "./CharacterListingContext";
import { CharacterProfile } from "../CharacterProfile";

const CharacterList: React.FC = () => {
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

const CharacterListingContainer = () => {
    return (
        <CharacterListingProvider>
            <CharacterList />
        </CharacterListingProvider>
    );
};

export default CharacterListingContainer;
