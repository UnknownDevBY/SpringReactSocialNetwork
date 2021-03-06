import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'

import Header from '../../reused/Header'
import SideMenu from '../../reused/SideMenu'
import Main from './Main'
import axios from "axios";
import {backHost, token} from "../../../constants";

class News extends Component {

    state = {
        data: null
    }

    updateState = () => {
        const {history} = this.props
        let header = {}
        if(token.value)
            header = {'Authorization': token.value}

        axios.get(`${backHost}/news`, {
            headers: header
        })
            .then( (response) => {
                this.setState({
                    data: response.data
                })
            })
            .catch(() => {
                history.push('/')
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

export default News