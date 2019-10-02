import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import Footer from './components/Footer';
import App from './App';
import Launch from './components/Launch';

export default class Routes extends Component {
    render() {
        return (
            <DataProvider>
                <Switch>
                    <ThemeProvider>
                        <Route exact path="/" component={App} />
                        <Route path="/:id" component={Launch} />
                    </ThemeProvider>
                </Switch>
                <Footer />
            </DataProvider>
        )
    }
}
