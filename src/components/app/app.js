import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import Button from 'reactstrap/lib/Button';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService'
import CharacterPage from '../pages/characterPage';
import BookPage, {BookItem} from '../pages/bookPage'
import HomePage from '../pages/homePage'
import HousePage from '../pages/housePage';


import './app.css'
import WrongPage from '../pages/wrongPage';

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
        const randomCharacterContent = characterVision ? <RandomChar interval={15000}/> : null

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app">
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
                        <Switch>
                            <Route path='/' exact component={HomePage}/>
                            <Route path='/characters' component={CharacterPage}/>
                            <Route path='/houses' component={HousePage}/>
                            <Route path='/books' exact component={BookPage}/>
                            <Route path='/books/:id' render={({match}) => {
                                const {id} = match.params
                                return <BookItem bookId={id} />
                            }}/>
                            <Route component={WrongPage}/>
                        </Switch>
                    </Container>
                </div> 
            </Router>
        )
    }
}

export default App;