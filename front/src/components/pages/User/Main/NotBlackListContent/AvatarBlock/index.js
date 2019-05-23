import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import {bucketName, backHost, token} from '../../../../../../constants'

export default class AvatarBlock extends Component {

    state = {
        is1friendTo2: this.props.data.is1friendTo2
    }

    onFriendshipUpdated = (e, id) => {
        e.preventDefault()
        let header = {}
        if(token.value)
            header = {'Authorization': token.value}

        axios.get(`${backHost}/users/friendship/${id}`, {
            headers: header
        }).then(response => {
            this.setState(({is1friendTo2}) => {
                return {
                    is1friendTo2: !is1friendTo2
                }
            })
        })
    }

    onMouse = (e, text) => {
        e.innerHTML = text
    }

    render() {
        const {avatar, isInBlacklist, currentUser,
            pageUser, privacySettings, is2friendTo1} = this.props.data
        const {is1friendTo2} = this.state

        return (
            <div className="avatar-block">
                {
                    avatar == null ? (
                        <img className="avatar" src="/bootstrap/img/no-avatar.png" alt=""/>
                    ) : (
                        <span>
                            <Link to={`/photos/${avatar.id}`}><img style={{width: '100%'}}
                                src={`https://s3.amazonaws.com/${bucketName}/${avatar.title}`} alt=""/></Link>
                        </span>
                    )
                }
                <div className="message">
                    {
                        currentUser != null && !isInBlacklist ? (
                            <div>
                                {
                                    currentUser.id === pageUser.id ? (
                                        <Link to="/edit">Редактировать</Link>
                                    ) : (
                                        <div>
                                            {
                                                privacySettings.canSendMessages ? (
                                                    <div>
                                                        <Link to={`/conversations/${pageUser.id}`}>Отправить сообщение</Link>
                                                    </div>
                                                ) : null
                                            }
                                            {
                                                !is1friendTo2 && !is2friendTo1 ? (
                                                    <a href="" onClick={(e) => this.onFriendshipUpdated(e, pageUser.id)}>Добавить в друзья</a>
                                                ) : null
                                            }
                                            {
                                                is1friendTo2 && is2friendTo1 ? (
                                                    <a href="" onClick={(e) => this.onFriendshipUpdated(e, pageUser.id)}
                                                        onMouseEnter={e => this.onMouse(e, 'Удалить из друзей')}
                                                       onMouseLeave={e => this.onMouse(e, 'У Вас в друзьях')}>У Вас в друзьях</a>
                                                ) : null
                                            }
                                            {
                                                is1friendTo2 && !is2friendTo1 ? (
                                                    <a href="" onClick={(e) => this.onFriendshipUpdated(e, pageUser.id)}
                                                       onMouseEnter={e => this.onMouse(e, 'Отписаться')}
                                                       onMouseLeave={e => this.onMouse(e, 'Вы подписаны')}>Вы подписаны</a>
                                                ) : null
                                            }
                                            {
                                                !is1friendTo2 && is2friendTo1 ? (
                                                    <a href="" onClick={(e) => this.onFriendshipUpdated(e, pageUser.id)}
                                                       onMouseEnter={e => this.onMouse(e, 'Принять заявку')}
                                                       onMouseLeave={e => this.onMouse(e, 'Подписан на Вас')}>Подписан на Вас</a>
                                                ) : null
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        ) : null
                    }
                    {
                        currentUser == null ? (
                            <div>
                                <Link to="/"/>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}