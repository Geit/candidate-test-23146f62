import React, { createContext, useEffect, useState } from "react";
import { Character } from "../../types";

const defaultCharacters = null;

export const CharacterListingContext = createContext<Character[] | null>(defaultCharacters);

const fetchCharacterData = async (
    setCharacterData: React.Dispatch<React.SetStateAction<Character[] | null>>
) => {
    try {
        const response = await fetch(`/characters.json`);
        const responseData: Character[] = await response.json();

        setCharacterData(responseData);
    } catch (e) {
        console.error(e);
        setCharacterData(null);
    }
};

export const CharacterListingProvider: React.FC = ({ children }) => {
    const [characterData, setCharacterData] = useState<Character[] | null>(null);

    useEffect(() => {
        fetchCharacterData(setCharacterData);
    }, []);

    return (
        <CharacterListingContext.Provider value={characterData}>
            {children}
        </CharacterListingContext.Provider>
    );
};
