import React, {Component} from 'react'
import axios from 'axios'

import {bucketName, backHost} from '../../../../../constants'

export default class BlackListContent extends Component {

    state = {
        isInBlacklist: this.props.data.isInBlacklist
    }

    onBlackListUpdated = (id) => {
        axios.get(`${backHost}/users/blacklist/${id}`).then(response => {
            this.setState(({isInBlacklist}) => {
                return {
                    isInBlacklist: !isInBlacklist
                }
            })
        })
    }

    render() {
        const {avatar, pageUser, currentUser} = this.props.data
        const {isInBlacklist} = this.state

        return (
            <div className="main-info">
                <div className="avatar-block">
                    {
                        avatar == null ? (
                            <img src="/bootstrap/img/no-avatar.png" alt=""/>
                        ) : (
                            <img src={`https://s3.amazonaws.com/${bucketName}/${avatar.title}`} alt=""/>
                        )
                    }
                </div>
                <div className="about-person">
                    <div className="name">
                        <p>{pageUser.name} {pageUser.surname}</p>
                        <div>
                            <p className="status">Вы добавлены в черный список!</p>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    {
                        currentUser != null && pageUser.id !== currentUser.id && !isInBlacklist ? (
                            <a className="w-75 btn btn-outline-danger" onClick={() => this.onBlackListUpdated(pageUser.id)}>Заблокировать</a>
                        ) : null
                    }
                    {
                        currentUser != null && pageUser.id !== currentUser.id && isInBlacklist ? (
                            <a className="w-75 btn btn-outline-info" onClick={() => this.onBlackListUpdated(pageUser.id)}>Разблокировать</a>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}