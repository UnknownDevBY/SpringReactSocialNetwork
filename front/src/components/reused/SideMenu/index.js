import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {backHost} from '../../../constants'

class SideMenu extends Component {

    onSubmit = e => {
        e.preventDefault()
        const login = document.getElementById("itech_login").value
        let password = document.getElementById("itech_pass").value
        fetch(`${backHost}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `itech_login=${login}&itech_pass=${password}`
        }).then(res => {
            if(res.ok)
                this.props.updateState()
        })
    }

    render() {
        const {data} = this.props
        let currentUser
        if(data)
            currentUser = this.props.data.currentUser

        let content

        if(currentUser) {
            if(currentUser.role === 'ADMIN') {
                content = (
                    <ul>
                        <li><Link className="active" to="/search">Поиск</Link></li>
                        <li><Link className="active" to={`/users/${currentUser.id}`}>Моя страница</Link></li>
                        <li><Link to={`/friends/${currentUser.id}`}>Друзья</Link></li>
                        <li><Link to="/communities">Группы</Link></li>
                        <li><Link to="/news">Новости</Link></li>
                        <li><Link to="/messages">Сообщения</Link></li>
                        <li><Link to={`/albums/${currentUser.id}`}>Фотографии</Link></li>
                        <li><Link to="/log">Логи</Link></li>
                    </ul>
                )
            } else {
                content = (
                    <ul>
                        <li><Link className="active" to="/search">Поиск</Link></li>
                        <li><Link className="active" to={`/users/${currentUser.id}`}>Моя страница</Link></li>
                        <li><Link to={`/friends/${currentUser.id}`}>Друзья</Link></li>
                        <li><Link to="/communities">Группы</Link></li>
                        <li><Link to="/news">Новости</Link></li>
                        <li><Link to="/messages">Сообщения</Link></li>
                        <li><Link to={`/albums/${currentUser.id}`}>Фотографии</Link></li>
                    </ul>
                )
            }
        } else {
            content = (
                <div>
                    <form onSubmit={this.onSubmit} method="post">
                        <input type="text" id="itech_login" name="itech_login" placeholder="E-mail" />
                        <br />
                        <input type="password" id="itech_pass" name="itech_pass" placeholder="Пароль" />
                        <br />
                        <div>
                            <label style={{fontSize: '11px', color: 'white', maxWidth: '100px'}}
                                   htmlFor="itech_remember">Запомнить меня?</label>
                            <input style={{maxWidth: '40px'}} type="checkbox" id="itech_remember"
                                   name="itech_remember" />
                        </div>
                        <input type="submit" value="Войти" />
                    </form>
                </div>
            )
        }

        return (
            <div className="menu">
                {content}
            </div>
        )
    }
}

export default SideMenu