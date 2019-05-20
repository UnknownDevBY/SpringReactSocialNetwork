import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {formatDate, backHost} from '../../../../../../constants'
import LikeCommentPanel from "../../../../../reused/LikeCommentPanel";

class Posts extends Component {

    state = {
        posts: this.props.data.posts
    }

    del = (obj, type, id) => {
        var request = new XMLHttpRequest();
        const setPostState = () => {
            this.setState(({posts}) => {
                let newPosts = [...posts]
                let idx = posts.findIndex(post => post.post.id === id)
                newPosts.splice(idx, 1)
                return {
                    posts: newPosts
                }
            })
        }
        const setCommentState = () => {
            this.setState(({posts}) => {
                let newPosts = [...posts]
                let isFound
                for(let i = 0; i !== newPosts.length; ++i) {
                    if(isFound)
                        break
                    for(let j = 0; j !== newPosts[i].comments.length; ++j) {
                        if(newPosts[i].comments[j].comment.id === id) {
                            newPosts[i].comments.splice(j, 1)
                            break
                        }
                    }
                }
                let idx = posts.findIndex(post => post.post.id === id)
                newPosts.splice(idx, 1)
                return {
                    posts: newPosts
                }
            })
        }
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if(type === 'post') {
                    setPostState()
                } else {
                    setCommentState()
                }
            }
        };
        request.open('GET', `${backHost}/delete/${type}/${id}`, true);
        request.send();
    }


    onSubmit = (e) => {
        e.preventDefault()
        const {id} = this.props.match.params
        const setState = (post) => {
            this.setState(({posts}) => {
                let newPosts = [JSON.parse(post), ...posts]
                return {
                    posts: newPosts
                }
            })
        }
        let request = new XMLHttpRequest();
        let textareaContent = document.getElementById('newPost').value;
        textareaContent = textareaContent.trim()
        if (textareaContent !== "") {
            var params = 'content=' + textareaContent;
            request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    document.getElementById('newPost').value = ''
                    setState(request.response)
                }
            };
            request.open('POST', `${backHost}/users/${id}`);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send(params);
        }
    }

    newComment = (e, postId) => {
        e.preventDefault()
        let request = new XMLHttpRequest();
        let textareaContent = document.getElementById(`commentContent${postId}`).value
        textareaContent = textareaContent.trim()
        const setState2 = (comment) => {
            this.setState(({posts}) => {
                let newPosts = Object.assign([], posts)
                let idx = newPosts.findIndex(post => post.post.id === postId)
                let selectedPost = newPosts[idx]
                selectedPost.comments.push(JSON.parse(comment))
                return {
                    posts: [...newPosts.slice(0, idx),
                        selectedPost,
                        ...newPosts.slice(idx + 1)]
                }
            })
        }
        if(textareaContent !== "") {
            var params = 'content=' + textareaContent;
            request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    setState2(request.response)
                    document.getElementById(`commentContent${postId}`).value = ''
                }
            };
            request.open('POST', `${backHost}/comment/post/${postId}`);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send(params);
        }
    }

    render() {
        const {pageUser, currentUser, privacySettings} = this.props.data
        const {posts} = this.state

        return (
            <div className="about-person">
                {
                    currentUser != null && (privacySettings.canLeavePosts) ? (
                        <div>
                            <form className="row" onSubmit={this.onSubmit}>
                                <div className="col-8 pt-2 form-group blue-border-focus">
                                <textarea placeholder="Новая запись" className="form-control" id="newPost" name="content"
                                      maxLength="255" minLength="1" required="required" rows="2"></textarea>
                                </div>
                                <div className="col-4 pt-2">
                                    <input className="btn btn-rounded btn-outline-dark" type="submit" value="Отправить"/>
                                </div>
                            </form>
                        </div>
                    ) : null
                }
                <p className="mt-0">Записи: <span id="postsAmount">{posts.length}</span></p>
                {
                    posts.map(post => {
                        return (
                            <div>
                                <div className="post">
                                    {
                                        currentUser != null && (pageUser.id === currentUser.id || post.post.author.id === currentUser.id || !post.post.id) ? (
                                            <button type="button" className="close float-right ml-3" aria-label="Close"
                                                    onClick={e => this.del(e, 'post', post.post.id)}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        ) : null
                                    }
                                    <Link className="post-author"
                                       to={`/users/${post.post.author.id}`}>{post.post.author.name} {post.post.author.surname}
                                    </Link>
                                    <p className="font-small">
                                        <i className="far fa-clock pr-1"></i>
                                        <span>{formatDate(post.post.postTime)}</span>
                                    </p>
                                    <div className="post-content">
                                        {
                                            post.post.content.split(' ').map(txt => {
                                                return !txt.startsWith('#')
                                                    ? (
                                                        <span>{txt} </span>
                                                    ) : (
                                                        <Link to={`/search?value=${txt}`} className="blue-text">{txt} </Link>
                                                    )
                                            })
                                        }
                                    </div>
                                    <div className="like-comment-amount">
                                        <LikeCommentPanel id={post.post.id} data={post} currentUser={currentUser} type={'post'}/>
                                    </div>
                                    <div>
                                        {
                                            post.comments != null && post.comments.length !== 0 ? (
                                                <details id={`details${post.post.id}`}>
                                                    <summary className="show-comments-summary">Показать комментарии</summary>
                                                    {
                                                        post.comments.map(comment => {
                                                            return (
                                                                <div>
                                                                    <div className="photo-comment">
                                                                        {
                                                                            currentUser != null && (pageUser.id === currentUser.id || comment.comment.user.id === currentUser.id) ? (
                                                                                <button type="button" className="close float-right ml-3" aria-label="Close"
                                                                                        onClick={e => this.del(e, 'comment', comment.comment.id)}>
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            ) : null
                                                                        }

                                                                        <Link className="photo-owner-name" to={`/users/${comment.comment.user.id}`}>
                                                                            {comment.comment.user.name} {comment.comment.user.surname}
                                                                        </Link>
                                                                        <p className="font-small">
                                                                            <i className="far fa-clock pr-1"></i>
                                                                            <span>{formatDate(comment.comment.postTime)}</span>
                                                                        </p>
                                                                        <p className="photo-comment-text">
                                                                            {
                                                                                comment.comment.content.split(' ').map(txt => {
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
                                                    }
                                                </details>
                                            ) : null
                                        }
                                        {
                                            currentUser ? (
                                                <form className="mx-3 row" onSubmit={e => this.newComment(e, post.post.id)}>
                                                    <div className="col-8 pt-2 form-group blue-border-focus">
                                                        <textarea placeholder="Комментарий" className="form-control" id={`commentContent${post.post.id}`} maxLength="255" minLength="1" required="required" rows="2"></textarea>
                                                    </div>
                                                    <div className="col-4 pt-2">
                                                        <input className="btn btn-rounded btn-outline-dark" type="submit" value="Отправить"/>
                                                    </div>
                                                </form>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default withRouter(Posts)