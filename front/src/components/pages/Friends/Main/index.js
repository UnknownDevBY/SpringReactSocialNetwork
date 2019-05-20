import React, {Component, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Spinner from "../../Search/Main";
import {bucketName} from "../../../../constants";

class Main extends Component {

    onSearch = () => {
        let text = document.getElementById('inputLGEx').value.toLowerCase();
        let groupBlocks = document.getElementsByClassName('div');
        let item;
        for(let i = 0; i !== groupBlocks.length; ++i) {
            item = groupBlocks.item(i);
            item.hidden = !(item.getAttribute('name').toLowerCase().startsWith(text) || item.getAttribute('surname').toLowerCase().startsWith(text));
        }
    }

    onClick = (userId) => {
        fetch(`/users/friendship/${userId}`).then(res => {
                if(res.ok)
                    this.props.updateState()
            })
    }

    render() {
        const {id} = this.props.match.params
        const {data} = this.props

        if(!data)
            return (
                <main className="messages-block">
                    <Spinner/>
                </main>
            )

        const {friends, subscribers, subscriptions, currentUser} = data

        return (
            <main className="messages-block">
                <div className="row justify-content-center">
                    <div className="col-7 justify-content-start">
                        <div className="row">
                            <ul className="nav nav-tabs bg-dark rounded" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                                       role="tab" aria-controls="home"
                                       aria-selected="true">Мои друзья <span className="badge badge-pill badge-primary">{friends.length}</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="subscribers-tab" data-toggle="tab" href="#subscribers"
                                       role="tab" aria-controls="subscribers"
                                       aria-selected="false">Подписчики <span className="badge badge-pill badge-primary">{subscribers.length}</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="subscriptions-tab" data-toggle="tab"
                                       href="#subscriptions" role="tab" aria-controls="subscriptions"
                                       aria-selected="false">Подписки <span className="badge badge-pill badge-primary">{subscriptions.length}</span></a>
                                </li>
                            </ul>
                            <div className="col-9 md-form">
                                <input type="text" id="inputLGEx" className="form-control form-control-lg"
                                       onKeyUp={this.onSearch}/>
                                <label htmlFor="inputLGEx">Поиск</label>
                            </div>
                            <div className="col-3 mt-3">
                                <button type="submit" className="btn btn-light" id="searchButton" onClick={this.onSearch}>
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="tab-content">
                                <div className="tab-pane fade show active justify-content-center" id="home"
                                     role="tabpanel" aria-labelledby="home-tab">
                                    {
                                        friends.map(user => {
                                            return (
                                                <div className="row mb-4 div" key={user.userId}
                                                     name={user.userName} surname={user.userSurname}>
                                                    <div className="col-2 zoom">
                                                        {
                                                            user.avatar == null
                                                                ? (
                                                                    <img src="/bootstrap/img/no-avatar.png"
                                                                         className="img-fluid z-depth-1 rounded" alt="Responsive image" />
                                                                ) : (
                                                                    <div className="square rounded" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${user.avatar.title})`}}></div>
                                                                )
                                                        }
                                                    </div>
                                                    <div className="col-10 text-left">
                                                        <h2><Link to={`/users/${user.userId}`}>{user.userName} {user.userSurname}</Link></h2>
                                                        {
                                                            currentUser != null && currentUser.id === id
                                                                ? (
                                                                    <Fragment>
                                                                        <Link to={`/convesations/${user.userId}`}
                                                                              className="btn btn-sm btn-primary">Отправить сообщение</Link>
                                                                        <a onClick={() => this.onClick(user.userId)}
                                                                           className="btn btn-sm btn-primary">Удалить из друзей</a>
                                                                    </Fragment>
                                                                ) : null
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="tab-pane fade" id="subscribers" role="tabpanel"
                                     aria-labelledby="subscribers-tab">
                                    {
                                        subscribers.map(user => {
                                            return (
                                                <div className="row mb-4 div" key={user.userId}
                                                     name={user.userName} surname={user.userSurname}>
                                                    <div className="col-2 zoom">
                                                        {
                                                            user.avatar == null
                                                                ? (
                                                                    <img src="/bootstrap/img/no-avatar.png"
                                                                         className="img-fluid z-depth-1 rounded" alt="Responsive image" />
                                                                ) : (
                                                                    <div className="square rounded" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${user.avatar.title})`}}></div>
                                                                )
                                                        }
                                                    </div>
                                                    <div className="col-10 text-left">
                                                        <h2><Link to={`/users/${user.userId}`}>{user.userName} {user.userSurname}</Link></h2>
                                                        {
                                                            currentUser != null && currentUser.id === id
                                                                ? (
                                                                    <a onClick={() => this.onClick(user.userId)}
                                                                       className="btn btn-sm btn-primary">Добавить в друзья</a>
                                                                ) : null
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="tab-pane fade" id="subscriptions" role="tabpanel"
                                     aria-labelledby="subscriptions-tab">
                                    {
                                        subscriptions.map(user => {
                                            return (
                                                <div className="row mb-4 div" key={user.userId}
                                                     name={user.userName} surname={user.userSurname}>
                                                    <div className="col-2 zoom">
                                                        {
                                                            user.avatar == null
                                                                ? (
                                                                    <img src="/bootstrap/img/no-avatar.png"
                                                                         className="img-fluid z-depth-1 rounded" alt="Responsive image" />
                                                                ) : (
                                                                    <div className="square rounded" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${user.avatar.title})`}}></div>
                                                                )
                                                        }
                                                    </div>
                                                    <div className="col-10 text-left">
                                                        <h2><Link to={`/users/${user.userId}`}>{user.userName} {user.userSurname}</Link></h2>
                                                        {
                                                            currentUser != null && currentUser.id === id
                                                             ? (
                                                                    <a onClick={() => this.onClick(user.userId)}
                                                                       className="btn btn-sm btn-primary">Отписаться</a>
                                                                ) : null
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(Main)