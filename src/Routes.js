import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App'
import Launch from './components/Launch'

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/:id" component={Launch} />
            </Switch>
        )
    }
}
