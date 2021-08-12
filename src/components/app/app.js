import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import Button from 'reactstrap/lib/Button';

class App extends Component {

    state = {
        showRandomCharacter: false
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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default App;