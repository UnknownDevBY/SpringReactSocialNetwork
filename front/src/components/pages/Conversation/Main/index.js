import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

import Spinner from '../../../Spinner'
import {backHost, bucketName, formatDate} from '../../../../constants'
import axios from 'axios'

class Main extends Component {

    state = {
        messages: null,
        updateCount: 0
    }

    componentDidUpdate() {
        if(this.state.updateCount === 0) {
            this.setState((state) => {
                return {
                    messages: this.props.data.messages,
                    updateCount: ++state.updateCount
                }
            })
        }
    }

    sendMessage = (e, id) => {
        e.preventDefault()
        let request = new XMLHttpRequest();
        let textareaContent
        let textarea = document.getElementById('content');
        textareaContent = textarea.value.trim();
        textarea.value = ''
        const setState = (message) => {
            this.setState(({messages}) => {
                let newMessages = Object.assign([], messages)
                newMessages.unshift(JSON.parse(message))
                return {
                    messages: newMessages
                }
            })
        }
        if(textareaContent !== "") {
            var params = 'content=' + textareaContent;
            request.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    setState(request.response)
                }
            };
            request.open('POST', `${backHost}/conversations/${id}`);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send(params);
        }
    }

    deleteMessage = (id) => {
        axios.get(`${backHost}/delete/message/${id}`)
            .then( (response) => {
                this.setState(({messages}) => {
                    let newMessages = Object.assign([], messages)
                    let idx = newMessages.findIndex(message => message.id === id)
                    newMessages.splice(idx, 1)
                    return {
                        messages: newMessages
                    }
                })
            })
    }

    render() {
        const {data} = this.props

        if(!data)
            return (
                <main className="messages-block">
                    <Spinner/>
                </main>
            )

        const {currentUser, opponent} = data
        const {messages} = this.state

        return (
            <main className="messages-block">
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-9 col-md-8 col-lg-6">
                        <div className="row">
                            <div className="col-2">
                                {
                                    opponent.avatar != null ? (
                                        <div className="square rounded-circle"
                                             style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${opponent.avatar.title})`}}></div>
                                    ) : (
                                        <div className="square rounded-circle" style={{backgroundImage: `url(/bootstrap/img/no-avatar.png)`}}></div>
                                    )
                                }
                            </div>
                            <div className="col-10">
                                <Link className="h3-responsive" to={`/users/${opponent.userId}`}>
                                    <strong>{opponent.userName} {opponent.userSurname}</strong>
                                </Link>
                            </div>
                        </div>
                        <hr/>
                            <div>
                                <form className="row" onSubmit={(e) => this.sendMessage(e, opponent.userId)}>
                                    <div className="col-8 pt-2 form-group blue-border-focus">
                                        <textarea className="form-control" id="content" name="content" maxLength="255"
                                                  minLength="1" required="required" rows="2"></textarea>
                                    </div>
                                    <div className="col-4 pt-2">
                                        <input className="btn btn-rounded btn-primary" type="submit" value="Отправить"/>
                                    </div>
                                </form>
                            </div>
                            <hr/>
                                <div className="row text-justify font-small" id="messagesBlock">
                                    {
                                        messages ? (
                                            messages.map(message => {
                                                return (
                                                    <div className="w-100">
                                                        {
                                                            message.to.id === currentUser.id ? (
                                                                <div className="w-75 mt-3 p-2 blue-grey lighten-5">
                                                                    <p className="font-small mb-1">
                                                                        <i className="far fa-clock pr-1"></i>
                                                                        <span>{formatDate(message.sendingTime)}</span>
                                                                    </p>
                                                                    <p>{message.content}</p>
                                                                </div>
                                                            ) : null
                                                        }
                                                        {
                                                            message.from.id === currentUser.id ? (
                                                                <div className="w-75 mt-3 p-2 light-blue accent-1 float-right">
                                                                    <button type="button" className="close float-right ml-3" onClick={() => this.deleteMessage(message.id)}>
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                    <p className="font-small mb-1">
                                                                        <i className="far fa-clock pr-1"></i>
                                                                        <span>{formatDate(message.sendingTime)}</span>
                                                                    </p>
                                                                    <p>{message.content}</p>
                                                                </div>
                                                            ) : null
                                                        }
                                                    </div>
                                                )
                                            })
                                            ) : null
                                    }
                                </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(Main)