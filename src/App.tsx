import React, { Component } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";

import { CharacterListingProvider } from "./CharacterListingContext";
import CharacterListing from "./CharacterListing";

class App extends Component {
    render() {
        return (
            <div className={styles.App}>
                <header className={styles["App-header"]}>
                    <img src={logo} className={styles["App-logo"]} alt="logo" />
                    <h1 className="App-title">
                        Lord of the Rings Character Index
                    </h1>
                </header>

                <section className="App-content">
                    <CharacterListingProvider>
                        <CharacterListing />
                    </CharacterListingProvider>
                </section>
            </div>
        );
    }
}

export default App;
