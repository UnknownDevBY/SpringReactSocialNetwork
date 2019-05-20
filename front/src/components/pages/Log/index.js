import React, {Component, Fragment} from 'react'
import axios from "axios";
import {withRouter} from 'react-router-dom'

import {backHost, formatDate} from "../../../constants";
import Spinner from '../../Spinner'

class User extends Component {

    state = {
        data: null
    }

    updateState = () => {
        axios.get(`${backHost}/log`)
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

        if(!data)
            return <Spinner/>

        const css = `body {
                        background-color:#343a40!important
                    }`
        const {logs} = data

        return (
            <Fragment>
                <style>
                    {css}
                </style>
                <div className="row">
                    <div className="container-fluid text-center justify-content-center">
                        <button type="button" onClick={() => this.props.history.goBack()} className="btn btn-primary">Вернуться назад!</button>
                    </div>
                </div>

                <div className="row">
                    <table className="table table-hover table-dark text-center">
                        <thead>
                        <tr>
                            <th><strong>Платформа</strong></th>
                            <th><strong>Время</strong></th>
                            <th><strong>Пользователь</strong></th>
                            <th><strong>Действие</strong></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            logs.map(log => {
                                return (
                                    <tr>
                                        <td>{log.platform}</td>
                                        <td>{formatDate(log.at)}</td>
                                        <td>{log.email}</td>
                                        {
                                            log.userAction === 'a' ? (
                                                <td>Авторизация</td>
                                            ) : null
                                        }
                                        {
                                            log.userAction === 'r' ? (
                                                <td>Регистрация</td>
                                            ) : null

                                        }
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(User)