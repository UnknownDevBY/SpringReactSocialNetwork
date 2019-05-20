import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {backHost, bucketName} from '../../../../../../constants'

export default class FriendsList extends Component {

    state = {
        isInBlacklist: this.props.data.isInBlacklist
    }

    updateBlackList = (id) => {
        axios.get(`${backHost}/users/blacklist/${id}`).then(response => {
            this.setState(({isInBlacklist}) => {
                return {
                    isInBlacklist: !isInBlacklist
                }
            })
        })
    }

    render() {
        const {pageUser, currentUser, privacySettings,
            friends, displayFriends} = this.props.data
        const {isInBlacklist} = this.state

        return (
            <div className="list-of-friends mb-2">
                <Link to={`/friends/${pageUser.id}`} className="amount">
                    Друзья: {friends.length}
                </Link>
                {
                    !friends.length === 0 && (privacySettings.areFriendsAllowed) ? (
                        <div>
                            <div className="friends-block">
                                {
                                    friends.slice(0, displayFriends).map(friend => {
                                        return (
                                            <Link to={`/users/${friend.userId}`} className="friend">
                                                {
                                                    friend.avatar != null ? (
                                                        <div className="square rounded-circle"
                                                             style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${friend.avatar.title})`}}></div>
                                                    ) : (
                                                        <div className="square rounded-circle"
                                                             style={{backgroundImage: `url(/bootstrap/img/no-avatar.png)`}}></div>
                                                    )
                                                }
                                                <p>{friend.userName}</p>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : null
                }
                <div className="text-center">
                    {
                        currentUser != null && pageUser.id !== currentUser.id && !isInBlacklist ? (
                            <a className="w-75 btn btn-outline-danger" onClick={() => this.updateBlackList(pageUser.id)}>
                                Заблокировать
                            </a>
                        ) : null
                    }
                    {
                        currentUser != null && pageUser.id !== currentUser.id && isInBlacklist ? (
                            <a className="w-75 btn btn-outline-info" onClick={() => this.updateBlackList(pageUser.id)}>
                                Разблокировать
                            </a>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}
