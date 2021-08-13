import React, {Component} from 'react';
import gotService from '../../services/gotService'
import './charDetails.css';

const Field = ({character, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{character[field]}</span>
        </li>
    )
}

export {Field}
export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        character: null
    }

    componentDidMount() {
        this.updateCharacter()
    }

    componentDidUpdate(prevProps) {
        if (this.props.characterId !== prevProps.characterId) {
            this.updateCharacter()
        }
    }

    updateCharacter = () => {
        const {characterId} = this.props
        if (!characterId) return

        this.gotService.getCharacter(characterId)
            .then((character) => {
                this.setState({character})
            })
    }

    render() {
        if (!this.state.character) {
            return <span className="select-error">Please select a character</span>
        }

        const {character} = this.state
        const {name} = character

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {character})
                        })
                    }
                </ul>
            </div>
        );
    }
}