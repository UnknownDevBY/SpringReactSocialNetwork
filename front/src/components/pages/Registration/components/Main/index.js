import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import {backHost} from '../../../../../constants'

export default class Main extends Component {

    state = {
        error: false,
        redirect: false,
        redirectNow: false
    }

    timeout

    register = (e) => {
        e.preventDefault()
        let request = new XMLHttpRequest();
        let sexItem = document.getElementsByName("sex");
        let sex;
        sexItem.forEach(function (element) {
            if(element.checked)
                sex = element.value;
        });
        if(sex == null)
            return;
        let dateOfBirth = document.getElementById("dateOfBirth").value.trim();
        let bio = document.getElementById("bio").value.trim();
        let city = document.getElementById("city").value.trim();
        let interests = document.getElementById("interests").value.trim();
        let params = `city=${city}&sex=${sex}&dateOfBirth=${dateOfBirth}`
        if(bio !== '')
            params += `&bio=${bio}`
        if(interests !== '')
            params += `&interests=${interests}`
        const updateStateSuccess = () => {
            this.setState({
                redirect: true
            })
        }
        const updateStateError = () => {
            this.setState({
                error: true
            })
        }
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    updateStateSuccess()
                } else {
                    updateStateError()
                }
            }
        };
        request.open('POST', `${backHost}/registration/2`);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(params);
    }

    getMinAgeAllowed = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear() - 14;
        if(dd < 10){
            dd = '0' + dd;
        }
        if(mm<10){
            mm = '0' + mm;
        }
        return `${yyyy}-${mm}-${dd}`
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {

        let errorAlert

        if(this.state.redirect) {
            if(this.state.redirectNow)
                return <Redirect to="/"/>
            else {
                errorAlert = (
                    <div className="alert alert-success alert-dismissible fade show">
                        <button className="close" data-dismiss="alert">&times;</button>
                        <strong>Для подтверждения регистрации пройдите по ссылке, пришедшей на e-mail</strong>
                    </div>
                )
                this.timeout = setTimeout(() => {
                    this.setState({
                        redirectNow: true
                    })
                }, 3000)
            }
        }

        if(this.state.error) {
            errorAlert = (
                <div className="alert alert-danger alert-dismissible fade show">
                    <button className="close" data-dismiss="alert">&times;</button>
                    <strong>Что-то не так, попробуйте еще раз</strong>
                </div>
            )
        }

        return (
            <main className="main-header">
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="card mt-5">
                            {errorAlert}
                            <h5 className="card-header info-color white-text text-center py-4">
                                <strong>Расскажите о себе</strong>
                            </h5>
                            <div className="card-body px-lg-5 pt-0">
                                <form onSubmit={this.register.bind(this)} className="text-center" style={{color: '#757575'}}>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="md-form">
                                                <input type="text" name="city" id="city" className="form-control" />
                                                    <label htmlFor="city">Ваш город</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md-form">
                                        <input type="date" min="1900-01-01" max={this.getMinAgeAllowed()} id="dateOfBirth" name="dateOfBirth" className="form-control"
                                               required="required" />
                                               <label htmlFor="dateOfBirth">Дата рождения</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input type="radio" className="form-check-input" name="sex" id="male" value="m" />
                                            <label className="form-check-label" htmlFor="male">Мужчина</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input type="radio" className="form-check-input" name="sex" id="female"
                                               value="f" required="required" />
                                            <label className="form-check-label" htmlFor="female">Женщина</label>
                                    </div>
                                    <div className="md-form mb-4 pink-textarea active-pink-textarea">
                                        <textarea name="bio" id="bio" className="md-textarea form-control" rows="1"
                                                  minLength="1" maxLength="255"></textarea>
                                        <label htmlFor="bio">Ваша биография <small><code>(Не обязательно)</code></small>
                                        </label>
                                    </div>
                                    <div className="col">
                                        <div className="md-form mb-4 pink-textarea active-pink-textarea">
                                            <textarea name="interests" id="interests"
                                                      className="md-textarea form-control" rows="1" minLength="1"
                                                      maxLength="255"></textarea>
                                            <label htmlFor="interests">Ваши увлечения <small><code>(Не
                                                обязательно)</code></small></label>
                                        </div>
                                    </div>
                                    <input type="submit"
                                           className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                           value="Зарегестрироваться"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}