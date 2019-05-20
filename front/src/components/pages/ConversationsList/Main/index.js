import React, {Component, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Spinner from '../../../Spinner'
import {bucketName} from '../../../../constants'

class Main extends Component {

    render() {
        const {data} = this.props

        if(!data)
            return (
                <main className="messages-block">
                    <Spinner/>
                </main>
            )

        const {messageWindows, currentUser} = data

        const css = `
            .message-content {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    line-height: 1.5em;
                    max-height: 4.5em;
                }
        `

        return (
            <Fragment>
                <style>
                    {css}
                </style>
                <main>
                    <div className="messages-header mb-4">
                        <h2>Мои диалоги: {messageWindows.length}</h2>
                        <div>
                            {
                                messageWindows.length === 0 ? (
                                    <Link to={`/friends/${currentUser.id}`}>Напишите кому-либо</Link>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            {
                                messageWindows.map(messageWindow => {
                                    return (
                                        <div className="row">
                                            <div className="col-3">
                                                {
                                                    messageWindow.friend.avatar != null ? (
                                                        <div className="square rounded"
                                                             style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${messageWindow.friend.avatar.title})`}}></div>
                                                    ) : (
                                                        <div className="square rounded" style={{backgroundImage: `url(/bootstrap/img/no-avatar.png)`}}></div>
                                                    )
                                                }
                                            </div>
                                            <div className="col-9 text-center">
                                                <h3>
                                                    <Link to={`/conversations/${messageWindow.friend.userId}`}>{messageWindow.friend.userName} {messageWindow.friend.userSurname}</Link>
                                                </h3>
                                                <p className="message-content grey-text text-justify">
                                                    {
                                                        messageWindow.authorId === currentUser.id ? (
                                                            <span className="blue-text">(Я) </span>
                                                        ) : null
                                                    }
                                                    <span>{messageWindow.lastMessage}</span>
                                                </p>
                                            </div>
                                            <div className="col-12">
                                                <hr className="mx-3"/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </main>
            </Fragment>
        );
    }
}

export default withRouter(Main)