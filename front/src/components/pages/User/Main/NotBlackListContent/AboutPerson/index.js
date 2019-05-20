import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'

import {formatDateGetDate, bucketName} from '../../../../../../constants'

export default class AboutPerson extends Component {

    state = {
        isDetailsClicked: false
    }

    setDetails = (details) => {
        const {isDetailsClicked} = this.state
        details.innerHTML = (isDetailsClicked) ? "Полная информация" : "Скрыть полную информацию";
        this.setState(({isDetailsClicked}) => {
            return {
                isDetailsClicked: !isDetailsClicked
            }
        })
    }

    render() {
        const {pageUser, currentUser, privacySettings, allPhotos} = this.props.data

        return (
            <div className="about-person">
                <div className="name">
                    <p>{pageUser.name} {pageUser.surname}</p>
                    {
                        pageUser.status != null ? (
                            <div>
                                <p className="status">{pageUser.status}</p>
                            </div>
                        ) : null
                    }
                </div>
                <div className="basic-info">
                    <div>Дата рождения:</div>
                    <div>
                        {formatDateGetDate(pageUser.dateOfBirth)}
                        {
                            currentUser != null && currentUser.id === pageUser.id ? (
                                <Link to="/edit"><img style={{float: 'right'}} src="/bootstrap/img/edit-picture.png" alt=""/></Link>
                            ) : null
                        }
                    </div>
                    <div>Пол:</div>
                    <div>
                        {
                            pageUser.sex === 'm' ? 'мужской' : 'женский'
                        }
                    </div>
                    <div>Город:</div>
                    <div>{pageUser.city}</div>
                </div>
                {
                    (pageUser.bio || pageUser.interests) && privacySettings.fullInfoAllowed ? (
                        <div>
                            <details>
                                <summary onClick={this.setDetails} style={{display: 'block'}}>Полная информация</summary>
                                <div className="full-info">
                                    {
                                        pageUser.bio ? (
                                            <Fragment>
                                                <div>Биография:</div>
                                                <div>{pageUser.bio}</div>
                                            </Fragment>
                                        ) : null
                                    }
                                    {
                                        pageUser.interests ? (
                                            <Fragment>
                                                <div>Интересы:</div>
                                                <div>{pageUser.interests}</div>
                                            </Fragment>
                                        ) : null
                                    }
                                </div>
                            </details>
                        </div>
                    ) : null
                }
                {
                    currentUser != null && currentUser.id === pageUser.id && allPhotos.length === 0 ? (
                        <div>
                            <a className="add-photo-amount" href="javascript:void(0)" id="contact-ta" data-toggle="modal"
                               data-target="#modalContactForm"><sup>Добавить фото</sup></a>
                        </div>
                    ) : null
                }
                {
                    allPhotos.length !== 0 && (privacySettings.arePhotosAllowed) ? (
                        <div>
                            <span className="amount">
                                <Link to={`/albums/${pageUser.id}/0`}>
                                    Фотографии: {allPhotos.length}
                                </Link>
                            </span>
                            {
                                currentUser != null && currentUser.id === pageUser.id ? (
                                    <a className="add-photo-amount" href="javascript:void(0)" id="contact-tab" data-toggle="modal"
                                        data-target="#modalContactForm"><sup>Добавить</sup></a>
                                ) : null
                            }
                            <div className="list-of-photos">
                                {
                                    allPhotos.map(photo => {
                                        return (
                                            <div style={{height: '146px', width: '146px', display: 'inline-block'}}>
                                                <Link to={`/photos/${photo.photo.id}`}>
                                                    <div className="square"
                                                         style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${photo.photo.title})`}}></div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}
