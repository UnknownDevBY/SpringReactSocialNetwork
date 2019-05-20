import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'

import Header from '../../reused/Header'
import SideMenu from '../../reused/SideMenu'
import CreateCommunityModal from './CreateCommunityModal'
import Main from './Main'
import axios from "axios";
import {backHost} from "../../../constants";

class Community extends Component {

    state = {
        data: null
    }

    updateState = () => {
        axios.get(`${backHost}/communities`)
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
                <CreateCommunityModal updateState={this.updateState}/>
                <Main data={data}/>
            </Fragment>
        )
    }
}

export default withRouter(Community)