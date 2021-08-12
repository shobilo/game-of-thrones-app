import React, {Component} from 'react';
import gotService from '../../services/gotService'
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage';

import './randomChar.css';

export default class RandomChar extends Component {

    randCharTimerId = () => setInterval(this.updateCharacter, 15000)
    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter()
        this.randCharTimerId()
    }

    componentWillUnmount() {
        clearInterval(this.randCharTimerId)
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

    updateCharacter = () => {
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
            <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
}
