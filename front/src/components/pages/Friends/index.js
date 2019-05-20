import React, {Component, Fragment} from 'react'
import axios from "axios";
import {withRouter} from 'react-router-dom'

import Header from '../../reused/Header'
import SideMenu from '../../reused/SideMenu'
import Main from './Main'
import {backHost} from "../../../constants";

class Friends extends Component {

    state = {
        data: null
    }

    updateState = () => {
        const {id} = this.props.match.params
        axios.get(`${backHost}/friends/${id}`)
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
                <Main updateState={this.updateState} data={data}/>
            </Fragment>
        )
    }
}

export default withRouter(Friends)