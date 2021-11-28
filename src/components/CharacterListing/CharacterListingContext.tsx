import React, { createContext, useEffect, useReducer, useState } from "react";
import { Character } from "../../types";

interface CharacterContextContents {
    fetchError?: unknown;
    ordering: "alphabetical" | "significance";
    categoryFilter: string | null;
    characters: Character[] | null;
    dispatchUpdate: React.Dispatch<CharacterContextActions>;
}

type CharacterContextActions =
    | { type: "setOrdering"; data: CharacterContextContents["ordering"] }
    | { type: "setCharacters"; data: CharacterContextContents["characters"] }
    | { type: "setCategoryFilter"; data: CharacterContextContents["categoryFilter"] }
    | { type: "setFetchError"; data: CharacterContextContents["fetchError"] };

const defaultContextState: CharacterContextContents = {
    characters: null,
    categoryFilter: null,
    ordering: "alphabetical",
    dispatchUpdate: () => {},
};

export const CharacterListingContext = createContext<CharacterContextContents>(defaultContextState);

const fetchCharacterData = async (setCharacterData: React.Dispatch<CharacterContextActions>) => {
    try {
        const response = await fetch(`/characters.json`);
        const characters: Character[] = await response.json();
        setCharacterData({
            type: "setCharacters",
            data: characters,
        });
    } catch (e) {
        setCharacterData({
            type: "setFetchError",
            data: e,
        });
    }
};

const characterListingStateReducer = (
    state: CharacterContextContents,
    action: CharacterContextActions
): CharacterContextContents => {
    switch (action.type) {
        case "setCharacters":
            return {
                ...state,
                fetchError: null,
                characters: action.data,
            };

        case "setFetchError":
            return {
                ...state,
                fetchError: action.data,
                characters: null,
            };

        case "setCategoryFilter":
            return {
                ...state,
                categoryFilter: action.data,
            };

        case "setOrdering":
            return {
                ...state,
                ordering: action.data,
            };
        default:
            return state;
    }
};

export const CharacterListingProvider: React.FC = ({ children }) => {
    const [state, dispatchUpdate] = useReducer(characterListingStateReducer, defaultContextState);

    useEffect(() => {
        fetchCharacterData(dispatchUpdate);
    }, []);

    return (
        <CharacterListingContext.Provider
            value={{
                ...state,
                dispatchUpdate,
            }}
        >
            {children}
        </CharacterListingContext.Provider>
    );
};
