import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {backHost, token} from '../../../../../constants'

class Main extends Component {

    login = (e) => {
        e.preventDefault()
        const login = document.getElementById("itech_login").value;
        const password = document.getElementById("itech_pass").value;
        const {history} = this.props
        fetch(`${backHost}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `itech_login=${login}&itech_pass=${password}`
        }).then(res => res.json()).then(data => {
            token.value = data.token
            history.push('/search')
        })
    }

    render() {
        return (
            <main className="main-header mt-5">
                <div className="container">
                    <section id="contact">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div id="map" className="row text-center">
                                    <div className="col-lg-4 col-md-12 mb-3">
                                        <p><i className="fa fa-map-marker fa-1x mr-2 grey-text"></i>Минск</p>
                                    </div>
                                    <div className="col-lg-4 col-md-6 mb-3">
                                        <p><i className="fa fa-building fa-1x mr-2 grey-text"></i>Пн - Пт</p>
                                    </div>
                                    <div className="col-lg-4 col-md-6 mb-3">
                                        <p><i className="fa fa-phone fa-1x mr-2 grey-text"></i>+375 29 777 77 77</p>
                                    </div>
                                </div>
                                <div id="map-container-google-1" className="z-depth-1-half map-container"
                                     style={{height: '400px'}}>
                                    <iframe
                                        src="https://maps.google.com/maps?q=minsk+Толстого+10&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                        frameBorder="0"
                                        style={{border: 0}} allowFullScreen></iframe>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <form className="p-5" onSubmit={this.login.bind(this)} method="post">
                                    <div className="md-form form-sm">
                                        <i className="fa fa-user prefix grey-text"></i>
                                        <input type="text" id="itech_login" name="itech_login" className="form-control form-control-sm"/>
                                            <label htmlFor="itech_login">Ваш e-mail</label>
                                    </div>
                                    <div className="md-form form-sm">
                                        <i className="fa fa-key prefix grey-text"></i>
                                        <input type="password" id="itech_pass" name="itech_pass" minLength="6" className="form-control form-control-sm"/>
                                            <label htmlFor="itech_pass">Пароль</label>
                                    </div>
                                    <div className="text-center mt-4">
                                        <div className="row text-center">
                                            <a className="btn btn-outline-primary waves-effect waves-light"
                                               data-toggle="modal" data-target="#modalRegisterForm">Регистрация</a>
                                            <input type="submit" className="btn btn-primary waves-effect waves-light"
                                                   value="Войти"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        )
    }
}

export default withRouter(Main)