import React, {Component} from 'react'
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

        let id = parseInt(this.props.match.params.id)
        const {currentUser, defaultAlbum, albums} = data

        return (
            <main>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="row text-center">
                            <div className="col-4 mb-4">
                                <Link to={`/albums/${id}/0`}>
                                    <div className="view">
                                        {
                                            defaultAlbum.photos ? (
                                                <div className="square img-fluid" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${defaultAlbum.photos[0].title})`}}></div>
                                            ) : (
                                                <div className="square img-fluid" style={{backgroundImage: `url(/bootstrap/img/no-avatar.png)`}}></div>
                                            )
                                        }
                                        <div className="mask flex-center waves-effect waves-light rgba-black-light">
                                            <p className="white-text">{defaultAlbum.title} ({defaultAlbum.photos ? defaultAlbum.photos.length : 0})</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            {
                                albums.map(album => {
                                    return (
                                        <div className="col-4 mb-4">
                                            <Link to={`/albums/${id}/${album.id}`}>
                                                <div className="view">
                                                    {
                                                        album.photos ? (
                                                            <div className="square img-fluid" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${album.photos[0].title})`}}></div>
                                                        ) : (
                                                            <div className="square img-fluid" style={{backgroundImage: `url(/bootstrap/img/no-avatar.png)`}}></div>
                                                        )
                                                    }
                                                    <div className="mask flex-center waves-effect waves-light rgba-black-light">
                                                        <p className="white-text">{album.title} ({album.photos ? album.photos.length : 0})</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                            {
                                currentUser != null && currentUser.id === id ? (
                                    <div className="col-4">
                                        <a id="contact-tab" data-toggle="modal" data-target="#modalContactForm">
                                            <div className="view">
                                                <div className="square img-fluid"
                                                     style={{backgroundImage: 'url(/bootstrap/img/plus.svg)'}}></div>
                                                <div className="mask flex-center waves-effect waves-light rgba-black-light">
                                                    <p className="white-text">Создать альбом</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
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