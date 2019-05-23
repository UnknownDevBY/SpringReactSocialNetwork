import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

import Spinner from '../../../Spinner'
import {bucketName, formatDate} from '../../../../constants'
import LikeCommentPanel from "../../../reused/LikeCommentPanel";

class Main extends Component {

    render() {
        const {data} = this.props

        if(!data)
            return (
                <main className="messages-block">
                    <Spinner/>
                </main>
            )

        const {allNews, currentUser} = data

        return (
            <main>
                {
                    allNews.map(news => {
                        return (
                            <div className="news-block">
                                {
                                    news.post != null ? (
                                        <div>
                                            <div className="news-photo-block">
                                                {
                                                    news.post.post.community != null ? (
                                                        <div>
                                                            <Link to={`/communities/public/${news.post.post.community.id}`} style={{textDecoration: 'none'}}>
                                                                <h3 className="photo-owner-name">{news.post.post.community.title}</h3>
                                                                <p className="photo-post-time font-small">
                                                                    <i className="far fa-clock pr-1"></i>
                                                                    <span>{formatDate(news.post.post.postTime)}</span>
                                                                </p>
                                                            </Link>
                                                            <div className="post-content">
                                                                <p style={{marginBottom: '10px'}}>
                                                                    {
                                                                        news.post.post.content.split(' ').map(txt => {
                                                                            return !txt.startsWith('#')
                                                                                ? (
                                                                                    <span>{txt} </span>
                                                                                ) : (
                                                                                    <Link to={`/search?value=${txt}`} className="blue-text">{txt} </Link>
                                                                                )
                                                                        })
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {
                                                                news.post.post.author.id !== news.post.post.owner.id ? (
                                                                    <code>
                                                                        <p className="photo-post-time">
                                                                            <Link to={`/users/${news.post.post.author.id}`}>{news.post.post.author.name} {news.post.post.author.surname}</Link>
                                                                            на стене
                                                                            <Link to={`/users/${news.post.post.owner.id}`}>{news.post.post.owner.name} {news.post.post.owner.surname}</Link>
                                                                        </p>
                                                                    </code>
                                                                ) : null
                                                            }
                                                            <Link to={`/users/${news.post.post.author.id}`} style={{textDecoration: 'none'}}>
                                                                <h3 className="photo-owner-name">{news.post.post.author.name} {news.post.post.author.surname}</h3>
                                                                <p className="photo-post-time font-small">
                                                                    <i className="far fa-clock pr-1"></i>
                                                                    <span>{formatDate(news.post.post.postTime)}</span>
                                                                </p>
                                                            </Link>
                                                            <div className="post-content">
                                                                <p style={{marginBottom: '10px'}}>
                                                                    {
                                                                        news.post.post.content.split(' ').map(txt => {
                                                                            return !txt.startsWith('#')
                                                                                ? (
                                                                                    <span>{txt} </span>
                                                                                ) : (
                                                                                    <Link to={`/search?value=${txt}`} className="blue-text">{txt} </Link>
                                                                                )
                                                                        })
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <div>
                                                    <LikeCommentPanel id={news.post.post.id} data={news.post} currentUser={currentUser} type={'post'}/>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                }
                                {
                                    news.photo != null ? (
                                        <div>
                                            <div className="news-photo-block">
                                                <a style={{textDecoration: 'none'}} href="javascript:void(0)">
                                                    <h3 className="photo-owner-name">{news.photo.photo.user.name} {news.photo.photo.user.surname}</h3>
                                                    <p className="photo-post-time font-small">
                                                        <i className="far fa-clock pr-1"></i>
                                                        <span>{formatDate(news.photo.photo.dateOfPost)}</span>
                                                    </p>
                                                </a>
                                                <Link to={`/photos/${news.photo.photo.id}`}>
                                                    <img style={{width: '100%'}} src={`https://s3.amazonaws.com/${bucketName}/${news.photo.photo.title}`} alt=""/>
                                                </Link>
                                                <div>
                                                    <LikeCommentPanel id={news.photo.photo.id} data={news.photo} currentUser={currentUser} type={'photo'}/>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                }
                                <hr className="my-4"/>
                            </div>
                        )
                    })
                }
            </main>
        );
    }
}

export default withRouter(Main)