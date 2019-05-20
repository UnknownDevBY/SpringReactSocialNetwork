import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import {backHost} from '../../../../../constants'

export default class RegistrationModal extends Component {

    state = {
        redirect: false,
        error: false
    }

    registration = (e) => {
        e.preventDefault()
        const request = new XMLHttpRequest();
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const params = `name=${name}&surname=${surname}&email=${email}&password=${password}`
        const updateState = (error) => {
            if(error) {
                this.setState({
                    error: true
                })
            }
            else {
                this.setState({
                    redirect: true
                })
            }
        }
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    updateState(false)
                } else {
                    updateState(true)
                }
            }
        };
        request.open('POST', `${backHost}/registration/1`);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(params);
    }

    componentWillUnmount() {
        let elem = document.querySelector('.modal-backdrop');
        if(elem)
            elem.parentNode.removeChild(elem);
    }

    render() {

        if(this.state.redirect)
            return <Redirect to='/registration'/>

        const alert = this.state.error
            ? (<div className="alert alert-danger alert-dismissible fade show">
                <button className="close" data-dismiss="alert">&times;</button>
                <strong>Пользователь с таким e-mail уже существует</strong>
               </div>)
            : null

        return (
            <div className="modal fade" id="modalRegisterForm" tabIndex="-1" role="dialog"
                 aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <form onSubmit={this.registration.bind(this)} className="modal-dialog" role="document">
                    <div className="modal-content">
                        {alert}
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">Регистрация</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mx-3">
                            <div className="form-row">
                                <div className="col">
                                    <div className="md-form">
                                        <input type="text" name="name" id="name" className="form-control" required="required" />
                                        <label htmlFor="name">Имя</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="md-form">
                                        <input type="text" name="surname" id="surname" className="form-control" required="required" />
                                        <label htmlFor="surname">Фамилия</label>
                                    </div>
                                </div>
                            </div>
                            <div className="md-form mb-5">
                                <i className="fa fa-user prefix grey-text"></i>
                                <input type="email" name="email" id="email" className="form-control validate" required="required" />
                                <label data-error="wrong" data-success="right" htmlFor="email">Ваш e-mail</label>
                            </div>
                            <div className="md-form mb-4">
                                <i className="fa fa-key prefix grey-text"></i>
                                <input type="password" name="password" id="password" className="form-control validate" required="required" />
                                <label data-error="wrong" data-success="right" htmlFor="password">Пароль</label>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <input type="submit" className="btn btn-primary" value="Подтвердить"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}