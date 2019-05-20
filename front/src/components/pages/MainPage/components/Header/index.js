import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class Header extends Component {

    state = {
        redirect: false,
        link: null
    }

    onEnterPressed = (e) => {
        e.preventDefault()
        let val = document.getElementById('search').value.trim()
        if(val !== '') {
            this.setState({
                redirect: true,
                link: `/search?value=${val}`
            })
        }
    }

    render() {
        if(this.state.redirect)
            return <Redirect to={this.state.link}/>

        return (
            <header className="index-header">
                <nav className="navbar navbar-expand-lg navbar-dark primary-color">
                    <a className="navbar-brand" href="#">Social Network</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#basicExampleNav"
                            aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="basicExampleNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Главная
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.itechart.by/">О нас</a>
                            </li>
                        </ul>
                       <form onSubmit={this.onEnterPressed.bind(this)} className="form-inline">
                            <div className="md-form my-0">
                                <input className="form-control mr-sm-2" type="text" placeholder="Поиск" minLength="1" aria-label="Search" id="search" />
                            </div>
                        </form>
                    </div>
                </nav>
            </header>
        )
    }
}