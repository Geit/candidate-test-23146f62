import React, {useContext} from 'react';
import { CharacterProfile } from '../CharacterProfile';
import { CharacterListingContext } from './CharacterListingContext';

export const CharacterList: React.FC = () => {
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