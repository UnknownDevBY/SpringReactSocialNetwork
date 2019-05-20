import React, {Component, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

import {backHost} from '../../../constants'

class Activation extends Component {

    state = {
        name: null,
        exists: true
    }

    componentDidMount() {
        const {code} = this.props.match.params
        axios.get(`${backHost}/activation/${code}`)
            .then( (response) => {
                this.setState({
                    name: response.data.name
                })
            })
            .catch( (error) => {
                this.setState({
                    exists: false
                })
            })
    }

    render() {

        const css = `body {
                        background-color: #1b1b47
                    }`

        if(!this.state.exists)
            return (
                <Fragment>
                    <style>
                        {css}
                    </style>
                    <div className="row justify-content-center mt-10">
                        <div className="animated pulse col-md-6 mb-4 white-text text-center mt-5">
                            <h1 className="display-6 font-weight-bold">Такого кода не существует</h1>
                        </div>
                        <div className="w-100 container-fluid text-center">
                            <Link to="/" className="btn btn-indigo btn-lg">На главную
                                <i className="fa fa-home ml-2" />
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )

        return (
            <Fragment>
                <style>
                    {css}
                </style>
                <div className="row justify-content-center mt-10">
                    <div className="animated pulse col-md-6 mb-4 white-text text-center text-md-left mt-5">
                        <h1 className="display-6 font-weight-bold">Добро пожаловать, {this.state.name}.</h1>
                        <hr className="hr-light"/>
                        <p>
                            <strong>Ваш аккаунт был успешно активирован!</strong>
                        </p>
                        <p className="mb-4 d-none d-md-block">
                            <strong>Теперь вы можете найти своих друзей, написать им, а можете найти новых или присоединиться к группам по интересам</strong>
                        </p>
                        <div className="w-100 container-fluid text-center">
                            <Link to="/" className="btn btn-indigo btn-lg">На главную
                                <i className="fa fa-home ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Activation)