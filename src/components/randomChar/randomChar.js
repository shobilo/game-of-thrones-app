import React, {Component} from 'react';
import gotService from '../../services/gotService'
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage';

import './randomChar.css';

export default class RandomChar extends Component {

    constructor() {
        super()
        this.updateCharacter()
    }

    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharacterLoaded = (character) => {
        this.setState({ 
            char: character,
            loading: false 
        })
    }

    onError = (error) => {
        this.setState({ 
            error: true, 
            loading: false 
        })
    }

    updateCharacter() {
        const id = Math.floor(Math.random() * 140 + 25) // 25 - 140
        this.gotService
            .getCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error } = this.state

        const content = error ? <ErrorMessage/> : loading ? <Spinner/> : <View char={char}/>

        return (
            <div className="random-block rounded">
                {content}
            </div>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char
    return (
        <>
            <h4>Random Character: {name || `No Info`}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender || `No Info`}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born || `No Info`}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died || `No Info`}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture || `No Info`}</span>
                    </li>
                </ul>
        </>
    )
}
