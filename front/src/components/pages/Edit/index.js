import React, {Component, Fragment} from 'react'
import axios from "axios";

import Header from '../../reused/Header'
import SideMenu from '../../reused/SideMenu'
import Main from './Main'
import {backHost, token} from "../../../constants";

class Edit extends Component {

    state = {
        data: null
    }

    updateState = () => {
        let header = {}
        if(token.value)
            header = {'Authorization': token.value}

        axios.get(`${backHost}/edit`, {
            headers: header
        })
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

export default Edit