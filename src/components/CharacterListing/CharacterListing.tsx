import React from "react";
import { CharacterListingProvider } from "./CharacterListingContext";
import { CharacterListingControls } from "./CharacterListingControls";
import { CharacterList } from "./CharacterList";

export const CharacterListing = () => {
    return (
        <section>
            <CharacterListingProvider>
                <CharacterListingControls />
                <CharacterList />
            </CharacterListingProvider>
        </section>
    );
};
