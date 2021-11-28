import React from "react";
import { Character } from "../../types";

import styles from "./CharacterProfile.module.css";

interface CharacterProfileProps {
    character: Character;
}

const CharacterProfile: React.FC<CharacterProfileProps> = ({ character }) => {
    return (
        <section className={styles["characterProfile"]}>
            <img
                src={`characters/${character.avatar}`}
                alt={`A portrait of ${character.name}`}
                className={styles["characterProfile__portrait"]}
            />
            <article className={styles["characterProfile__textDetails"]}>
                <h2 className={styles["characterProfile__name"]}>
                    {character.name}
                </h2>
                <p className={styles["characterProfile__category"]}>
                    {character.category}
                </p>
                <p className={styles["characterProfile__description"]}>
                    {character.description}
                </p>
            </article>
        </section>
    );
};

export default CharacterProfile;
