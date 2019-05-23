import React, {Component, Fragment} from 'react'
import axios from "axios";
import {withRouter} from 'react-router-dom'

import Header from '../../reused/Header'
import SideMenu from '../../reused/SideMenu'
import Main from './Main'
import {backHost, token} from "../../../constants";
import AddPhotoModal from "./AddPhotoModal";

class User extends Component {

    state = {
        data: null
    }

    updateState = () => {
        const {id} = this.props.match.params
        let header = {}
        if(token.value)
            header = {'Authorization': token.value}

        axios.get(`${backHost}/users/${id}`, {
            headers: header
        }).then( (response) => {
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
                <AddPhotoModal updateState={this.updateState} data={data}/>
                <Header updateState={this.updateState} data={data}/>
                <SideMenu updateState={this.updateState} data={data}/>
                <Main data={data}/>
            </Fragment>
        )
    }
}

export default withRouter(User)