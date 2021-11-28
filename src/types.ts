enum CharacterCategory {
    Hobbit = "hobbit",
    Wizard = "wizard",
    Elf = "elf",
    Human = "human",
    DarkLord = "dark lord",
    CorruptedHobbit = "corrupted hobbit",
    Spirit = "spirit",
    Horse = "horse",
    Ent = "ent",
    Spider = "spider",
}

export interface Character {
    name: string;
    category: CharacterCategory;
    description: string;
    significanceIndex: number;
    avatar: string;
}
