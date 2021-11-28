import React, { createContext, useEffect, useState } from "react";
import { Character } from "../../types";

interface CharacterContextContents {
    fetchError?: unknown;
    characters: Character[] | null;
}

const defaultContextState: CharacterContextContents = {
    characters: null,
};

export const CharacterListingContext = createContext<CharacterContextContents>(defaultContextState);

const fetchCharacterData = async (
    setCharacterData: React.Dispatch<React.SetStateAction<CharacterContextContents>>
) => {
    try {
        const response = await fetch(`/characters.json`);
        const characters: Character[] = await response.json();
        setCharacterData({
            characters,
        });
    } catch (e) {
        setCharacterData({
            characters: null,
            fetchError: e,
        });
    }
};

export const CharacterListingProvider: React.FC = ({ children }) => {
    const [characterData, setCharacterData] =
        useState<CharacterContextContents>(defaultContextState);

    useEffect(() => {
        fetchCharacterData(setCharacterData);
    }, []);

    return (
        <CharacterListingContext.Provider value={characterData}>
            {children}
        </CharacterListingContext.Provider>
    );
};
