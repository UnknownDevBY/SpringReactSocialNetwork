import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {backHost, bucketName} from '../../../../../constants'
import SideMenu from "../../index";

class Info extends Component {

    confirmSubscription = (obj, communityId, userId) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                obj.parentNode.hidden = true;
            }
        };
        request.open('GET', `${backHost}/communities/public/${communityId}/subscription/${userId}/confirm`, true);
        request.send();
    }

    onSubscribeClick = () => {
        const {id} = this.props.match.params
        let request = new XMLHttpRequest();
        const {updateState} = this.props
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                updateState()
            }
        };
        request.open('GET', `${backHost}/communities/public/${id}/subscribe`, true);
        request.send();
    }

    clickOnForms = () => {
        setTimeout(() => {
            document.getElementById('form34').focus();
            document.getElementById('form10').focus();
        }, 200);
    }

    render() {
        const {community, subscribers, avatar, currentUser, requests, subscription} = this.props.data
        const className = !community.closed || (subscription != null && subscription.confirmed)
            ? 'card my-3 pb-0' : 'card mb-3 pb-0'


        return (
            <div className="col-3">
                <div className={className}>
                    {
                        avatar != null ? (
                            <Link className="view overlay zoom" to={`/photos/${avatar.id}`}>
                                <img className="card-img-top"
                                     src={`https://s3.amazonaws.com/${bucketName}/${avatar.title}`}/>
                                <div className="mask flex-center waves-effect waves-light">
                                    <p className="white-text">Открыть</p>
                                </div>
                            </Link>
                        ) : null
                    }
                    {
                        currentUser != null ? (
                            <div className="dropdown">
                                {
                                    currentUser.id !== community.admin.id ? (
                                        <button className="btn btn-outline-primary btn-rounded dropdown-toggle" type="button" onClick={this.onSubscribeClick}>
                                            {
                                                subscription != null ? (
                                                    <span >Вы подписаны</span>
                                                ) : (
                                                    <span>Подписаться</span>
                                                )
                                            }
                                        </button>
                                    ) : null
                                }
                                {
                                    currentUser.id === community.admin.id ? (
                                            <a onClick={this.clickOnForms}
                                               className="btn btn-outline-primary btn-rounded" id="contact-tab" data-toggle="modal"
                                               data-target="#modalContactForm">Редактировать</a>
                                        ) : null

                                }
                            </div>
                        ) : null
                    }
                </div>
                <div className="card my-3 pb-0">
                    <h5 className="blue-text pb-2"><i className="fa fa-users" aria-hidden="true"></i>
                        <small className="ml-2">{subscribers.length}</small>
                    </h5>
                    <div className="row">
                        {
                            subscribers.map(subscriber => {
                                return (
                                    <Link to={`/users/${subscriber.userId}`} className="col-4">
                                        <div className="p-2">
                                            {
                                                subscriber.avatar != null ? (
                                                    <div className="square rounded-circle"
                                                         style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${subscriber.avatar.title})`}}></div>
                                                ) : (
                                                    <div className="square rounded-circle"
                                                         style={{backgroundImage: 'url(/bootstrap/img/no-avatar.png)'}}></div>
                                                )
                                            }
                                        </div>
                                        <p className="font-small">{subscriber.userName}</p>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    requests != null ? (
                        <div>
                            {
                                requests.map(request => {
                                    return (
                                        <div className="alert alert-success fade show">
                                            <Link to={`/users/${request.user.id}`}>{request.user.name} {request.user.surname} {request.user.id}</Link>
                                            <button onClick={e => this.confirmSubscription(e, community.id, request.user.id)} className="close">
                                                <span aria-hidden="true">&#10004;</span>
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : null
                }
            </div>
        )
    }
}

export default withRouter(Info)