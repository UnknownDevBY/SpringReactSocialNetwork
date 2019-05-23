import React, {Component, Fragment} from 'react'

import Header from '../../reused/Header'
import SideMenu from '../../reused/SideMenu'
import Main from './Main'
import axios from "axios";
import {backHost, token} from "../../../constants";
import NewAlbumModal from "./NewAlbumModal";

class AlbumsList extends Component {

    state = {
        data: null
    }

    addAlbum = (album) => {
        this.setState(({data}) => {
            let newData = Object.assign({}, data)
            newData.albums.push(album)
            return {
                newData
            }
        })
    }

    updateState = () => {
        const {id} = this.props.match.params
        let header = {}
        if(token.value)
            header = {'Authorization': token.value}

        axios.get(`${backHost}/albums/${id}`, {
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
        console.log(data)

        return (
            <Fragment>
                <NewAlbumModal addAlbum={e => this.addAlbum(e)} data={data}/>
                <Header updateState={this.updateState} data={data}/>
                <SideMenu updateState={this.updateState} data={data}/>
                <Main data={data}/>
            </Fragment>
        )
    }
}

export default AlbumsList