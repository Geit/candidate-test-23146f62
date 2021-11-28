import React, { useContext } from "react";
import { CharacterListingContext, CharacterListingProvider } from "./CharacterListingContext";
import { CharacterProfile } from "../CharacterProfile";

const CharacterList: React.FC = () => {
    const characterListing = useContext(CharacterListingContext);

    if(characterListing.fetchError) {
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
        <CharacterListingProvider>
            <CharacterList />
        </CharacterListingProvider>
    );
};

export default CharacterListingContainer;
