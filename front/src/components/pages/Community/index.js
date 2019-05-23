import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'

import Header from '../../reused/Header'
import SideMenu from '../../reused/SideMenu'
import Main from './Main'
import EditModal from './EditModal'
import axios from "axios";
import {backHost} from "../../../constants";

class Community extends Component {

    state = {
        data: null
    }

    updateState = () => {
        const {id} = this.props.match.params
        axios.get(`${backHost}/communities/public/${id}`)
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
                <EditModal data={data}/>
                <Main updateState={this.updateState} data={data}/>
            </Fragment>
        )
    }
}

export default withRouter(Community)