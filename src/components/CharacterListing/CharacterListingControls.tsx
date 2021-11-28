import styles from "./CharacterListingControls.module.css";

export const CharacterListingControls: React.FC = () => {
    return (
        <div className={styles["characterListControls"]}>
            <div className={styles["characterListControls__combo"]}>
                <label htmlFor="characterListControls__category">Category</label>
                <select name="category" id="characterListControls__category">
                    <option value="">All Categories</option>
                    <option value="hobbit">Hobbit</option>
                </select>
            </div>

            <div className={styles["characterListControls__combo"]}>
                <label htmlFor="characterListControls__ordering">Order by</label>
                <select name="ordering" id="characterListControls__ordering">
                    <option value="alphabetical">Alphabetical</option>
                    <option value="significance">Significance</option>
                </select>
            </div>
        </div>
    );
};
