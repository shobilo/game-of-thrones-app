import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import Button from 'reactstrap/lib/Button';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import ItemList from '../itemList'
import CharDetails from '../charDetails';
import gotService from '../../services/gotService'

class App extends Component {

    gotService = new gotService();

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
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name}
                                />
                        </Col>
                        <Col md='6'>
                            <CharDetails characterId={this.state.selectedCharacter}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails characterId={this.state.selectedCharacter}/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default App;