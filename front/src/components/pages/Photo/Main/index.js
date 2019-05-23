import React, {Component} from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'

import Spinner from '../../../Spinner'
import {backHost, bucketName, formatDate} from "../../../../constants";
import LikeCommentPanel from '../../../reused/LikeCommentPanel'

class Main extends Component {

    state = {
        redirect: null,
        id: null,
        comments: null,
        updateCount: 0
    }

    del = (obj, type, objId) => {
        obj = obj.target
        var request = new XMLHttpRequest();
        const {id} = this.props.match.params
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let commentsAmount = document.getElementById(`commentsAmount${id}`)
                commentsAmount.innerHTML = parseInt(commentsAmount.innerHTML) - 1
                obj.parentNode.parentNode.hidden = true;
            }
        };
        request.open('GET', `${backHost}/delete/${type}/${objId}`, true);
        request.send();
    }

    deletePhoto = (userId, isUsersPhoto) => {
        const {id} = this.props.match.params
        var request = new XMLHttpRequest();
        const setState = (redirect, id) => {
            this.setState({
                redirect,
                id
            })
        }
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if(isUsersPhoto)
                    setState('u', userId)
                else setState('c', userId)
            }
        };
        request.open('GET', `${backHost}/delete/photo/${id}`, true);
        request.send();
    }

    newComment = (e, postId) => {
        e.preventDefault()
        let request = new XMLHttpRequest();
        let textarea = document.getElementById('commentContent')
        const {id} = this.props.match.params
        let textareaContent = textarea.value.trim()
        const setState = (comment) => {
            this.setState(({comments}) => {
                let newComments = Object.assign([], comments)
                newComments.push(comment.comment)
                return {
                    comments: newComments
                }
            })
        }
        if(textareaContent !== "") {
            var params = 'content=' + textareaContent;
            request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    textarea.value = ''
                    let commentsAmount = document.getElementById(`commentsAmount${id}`)
                    commentsAmount.innerHTML = parseInt(commentsAmount.innerHTML) + 1
                    setState(JSON.parse(request.response))
                }
            };
            request.open('POST', `${backHost}/comment/photo/${postId}`);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send(params);
        }
    }

    componentDidUpdate() {
        if(this.state.updateCount === 0) {
            this.setState((state) => {
                return {
                    comments: this.props.data.comments,
                    updateCount: ++state.updateCount
                }
            })
        }
    }

    render() {
        if(this.state.redirect === 'u') {
            return <Redirect to={`/users/${this.state.id}`}/>
        }
        if(this.state.redirect === 'c') {
            return <Redirect to={`/communities/public/${this.state.id}`}/>
        }

        const {data} = this.props

        if(!data)
            return (
                <main className="messages-block">
                    <Spinner/>
                </main>
            )

        const {prevPhoto, nextPhoto, photo, canDelete, currentUser, owner} = data
        const {comments} = this.state

        return (
            <main>
                <div className="photo-block">
                    <div>
                        {
                            prevPhoto != null ? (
                                <Link to={`/photos/${prevPhoto}`}><span className="photo-click-left">&laquo;</span></Link>
                            ) : null
                        }
                        {
                            nextPhoto != null ? (
                                <Link to={`/photos/${nextPhoto}`}><span className="photo-click-right">&raquo;</span></Link>
                            ) : null
                        }
                        <img className="photo-window" src={`https://s3.amazonaws.com/${bucketName}/${photo.photo.title}`} alt="no-photo"/>
                    </div>
                    <div className="pl-2 photo-comment-block">
                        {
                            canDelete ? (
                                    <button title="Удалить фото" type="button" className="close d-inline float-right ml-3 font-small" aria-label="Close"
                                            onClick={() => this.deletePhoto(photo.photo.user != null ? photo.photo.user.id : photo.photo.community.id, photo.photo.user != null)}>
                                        <i className="fa fa-trash mt-2" aria-hidden="true"></i>
                                    </button>
                                ) : null
                        }
                        {
                            owner != null ? (
                                <Link className="photo-owner-name" to={`/users/${owner.id}`}>{owner.name} {owner.surname}</Link>
                            ) : (
                                <Link className="photo-owner-name" to={`/communities/public/${photo.photo.community.id}`}>{photo.photo.community.title}</Link>
                            )
                        }
                        <p className="photo-post-time">
                            <i className="fa fa-clock-o pr-1"></i>
                            <span>{formatDate(photo.photo.dateOfPost)}</span>
                        </p>
                        <div className="like-comment-amount">
                            <LikeCommentPanel id={photo.photo.id} data={photo} type={'photo'}/>
                        </div>
                        {
                            comments != null ? (
                                comments.map(comment => {
                                    return (
                                        <div>
                                            <div>
                                                {
                                                    currentUser != null && comment.user.id === currentUser.id ? (
                                                        <button type="button" className="close float-right ml-3" aria-label="Close"
                                                                onClick={e => this.del(e, 'comment', comment.id)}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    ) : null
                                                }
                                                <Link className="photo-owner-name" to={`/users/${comment.user.id}`}>{comment.user.name} {comment.user.surname}</Link>
                                                <p className="photo-comment-text">
                                                    {
                                                        comment.content.split(' ').map(txt => {
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
                                })
                            ) : null
                        }
                        {
                            currentUser != null ? (
                                <div>
                                    <form className="form-sm row" onSubmit={e => this.newComment(e, photo.photo.id)}>
                                        <div className="col-7 form-group blue-border-focus pr-0">
                                            <textarea placeholder="Ваш комментарий" id="commentContent" name="commentContent" className="form-control form-control-sm" maxLength="255"
                                              minLength="1" required="required" rows="2"></textarea>
                                        </div>
                                        <div className="col-5 pl-0">
                                            <input className="btn btn-sm btn-dark waves-effect ml-0 mt-2" type="submit" value="Отправить"/>
                                        </div>
                                    </form>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(Main)