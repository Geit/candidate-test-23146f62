import React, { useContext } from "react";
import { CharacterListingContext, CharacterListingProvider } from "./CharacterListingContext";
import { CharacterProfile } from "../CharacterProfile";
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
