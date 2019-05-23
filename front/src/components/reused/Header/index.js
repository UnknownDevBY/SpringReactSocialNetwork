import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {backHost, token} from "../../../constants";
import axios from "axios";

class Header extends Component {

    onSubmit = e => {
        e.preventDefault()
        let header = {}
        if(token.value)
            header = {'Authorization': token.value}

        fetch(`${backHost}/logout`, {
            headers: header
        }).then(res => {
            token.value = null
            this.props.history.push('/')
        })
    }

    render() {
        const {data} = this.props
        let currentUser
        if(data)
            currentUser = this.props.data.currentUser

        const logoutItems = currentUser
            ? (
                <div className="col-6">
                    <div className="float-right">
                        <form onSubmit={this.onSubmit} method="get">
                            <input className="btn white-text" type="submit" value="Выход" />
                        </form>
                    </div>
                </div>
            ) : null

        return (
            <header>
                <div className="row">
                    <div className="col-6">
                        <p><Link to="/"><em className="logo">Social network</em></Link></p>
                    </div>
                    {logoutItems}
                </div>
            </header>
        )
    }
}

export default withRouter(Header)