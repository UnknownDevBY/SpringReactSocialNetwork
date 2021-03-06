import React, {Component, Fragment} from 'react'

import Header from '../../reused/Header'
import SideMenu from '../../reused/SideMenu'
import Main from './Main'
import axios from "axios";
import {backHost, token} from "../../../constants";

class AlbumPhotos extends Component {

    state = {
        data: null
    }

    updateState = () => {
        let header = {}
        if(token.value)
            header = {'Authorization': token.value}

        const {userId, albumId} = this.props.match.params
        axios.get(`${backHost}/albums/${userId}/${albumId}`, {
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

export default AlbumPhotos