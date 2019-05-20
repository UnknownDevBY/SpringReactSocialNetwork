import React, {Component, Fragment} from 'react'

import Header from '../../reused/Header'
import SideMenu from '../../reused/SideMenu'
import Main from './Main'
import axios from "axios";
import {backHost} from "../../../constants";

class ConversationsList extends Component {

    state = {
        data: null
    }

    updateState = () => {
        axios.get(`${backHost}/messages`)
            .then( (response) => {
                this.setState({
                    data: response.data
                })
            })
    }

    componentDidMount() {
        this.updateState()
    }

    render() {
        const {data} = this.state

        return (
            <Fragment>
                <Header updateState={this.updateState} data={data}/>
                <SideMenu updateState={this.updateState} data={data}/>
                <Main data={data}/>
            </Fragment>
        )
    }
}

export default ConversationsList