import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import Button from 'reactstrap/lib/Button';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

class App extends Component {

    state = {
        showRandomCharacter: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomCharacter = () => {
        this.setState(state => {
            return {
                showRandomCharacter: !state.showRandomCharacter
            }
        });
    }

    render() {
        const {showRandomCharacter: characterVision} = this.state
        const randomCharacterContent = characterVision ? <RandomChar/> : null

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomCharacterContent}
                            <Button
                                style={{padding: '12px', marginBottom: '40px'}} 
                                color="primary" 
                                onClick={this.toggleRandomCharacter}>Change character</Button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                </Container>
            </>
        )
    }
}

export default App;