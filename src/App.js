import React from 'react';
import './App.css';
import Emoji from "./emoji";

class App extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            letter: ''
        }
    }

    getLetter(alphabet, quantity, data = []) {
        if (data.length === quantity) return data.join('');

        return this.getLetter(alphabet, quantity, [...data, alphabet.charAt(Math.floor(Math.random() * 26))]);
    }

    setData(letter, letters = []) {
        this.setState({ letter });

        letters.push(letter);
        window.sessionStorage.setItem('letters', letters.join());
    }

    getRandomLetter() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const letter = this.getLetter(alphabet, 1);

        const strings = window.sessionStorage.getItem('letters');
        if (!strings) {
            return this.setData(letter);
        }

        const letters = strings.split(',');
        if (letters.length === alphabet.length) {
            window.sessionStorage.clear();
        }

        if (letters.includes(letter)) {
            return this.getRandomLetter();
        }
        this.setData(letter, letters);
    }

    render() {
        const { letter } = this.state;

        return (
            <div className="wrapper">
                <div className="content">
                    <section className="center">
                        <h1>Get a random letter</h1>
                    </section>

                    <section className="center word-box">
                        <h2>{ letter ? letter : <Emoji symbol="😃" label="smile"/> }</h2>
                    </section>
                    <section className="center">
                        <button className="button-options button-primary"
                                onClick={ () => this.getRandomLetter() }>Show me!!!
                        </button>
                    </section>

                </div>
            </div>
        );
    }
}

export default App;
