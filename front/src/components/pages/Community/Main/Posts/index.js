import React, {Component, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'

import LikeCommentPanel from '../../../../reused/LikeCommentPanel'
import {backHost, bucketName, formatDate, token} from "../../../../../constants";

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
        if(token.value)
            request.setRequestHeader('Authorization', token.value)
        request.send();
    }

    newComment = (e, postId) => {
        e.preventDefault()
        let request = new XMLHttpRequest();
        let textarea = document.querySelector(`textarea[name=commentContent${postId}]`)
        let textareaContent = textarea.value.trim()
        const setState = (comment) => {
            this.setState(({posts}) => {
                let newPosts = Object.assign([], posts)
                let idx = newPosts.findIndex(post => post.post.id === postId)
                let selectedPost = newPosts[idx]
                selectedPost.comments.push(comment)
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
                    setState(JSON.parse(request.response))
                    textarea.value = ''
                }
            };
            request.open('POST', `${backHost}/comment/post/${postId}`);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            if(token.value)
                request.setRequestHeader('Authorization', token.value)
            request.send(params);
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {id} = this.props.match.params
        const setState = (post) => {
            this.setState(({posts}) => {
                let newPosts = Object.assign([], posts)
                newPosts.unshift(post)
                return {
                    posts: newPosts
                }
            })
        }
        let request = new XMLHttpRequest();
        let textareaContent = document.querySelector('textarea[name=content]').value;
        textareaContent = textareaContent.trim()
        if (textareaContent !== "") {
            var params = 'content=' + textareaContent;
            request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    setState(JSON.parse(request.response))
                }
            };
            document.getElementById('form7').value = ''
            request.open('POST', `${backHost}/communities/public/${id}`);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            if(token.value)
                request.setRequestHeader('Authorization', token.value)
            request.send(params);
        }
    }

    render() {
        const {community, subscription, currentUser, avatar} = this.props.data

        return (
            <Fragment>
                {
                    !community.closed || (subscription != null && subscription.confirmed) ? (
                        <div className="col-6">
                            <div className="card my-3 pb-0">
                                {
                                    currentUser != null && currentUser.id === community.admin.id ? (
                                        <div className="card-body py-0 mb-0">
                                            <form className="row pb-0" onSubmit={this.onSubmit}>
                                                <div className="col-9 form-sm md-form">
                                                    <textarea id="form7" name="content" className="md-textarea form-control" rows="1" minLength="1" maxLength="255"></textarea>
                                                    <label htmlFor="form7" className="text-left ml-3">Новый пост</label>
                                                </div>
                                                <div className="col-3 mt-3">
                                                    <button type="submit" className="btn btn-light" id="searchButton">
                                                        <i className="fas fa-pencil-alt prefix" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    ) : null
                                }
                                <div className="card-body py-0 mt-3">
                                    <h5 className="float-left blue-text pb-2">
                                        <i className="fa fa-bullhorn" aria-hidden="true"></i>
                                        <span className="ml-2" id="postsAmount">{this.state.posts.length}</span>
                                    </h5>
                                </div>
                            </div>
                            {
                                this.state.posts.map(post => {
                                    return (
                                        <div className="card my-3">
                                            <div className="row">
                                                <div className="col-2">
                                                    {
                                                        avatar == null ? (
                                                            <img src="/bootstrap/img/no-avatar.png" className="mt-3 ml-3 img-fluid z-depth-1 rounded" alt="Responsive image"/>
                                                        ) : (
                                                            <div className="mt-3 ml-3 square rounded" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${avatar.title})`}}></div>
                                                        )
                                                    }
                                                </div>
                                                <div className="col-10 text-left">
                                                    <div className="align-bottom mr-3">
                                                        {
                                                            currentUser != null && community.admin.id === currentUser.id ? (
                                                                <button className="close float-right ml-3" aria-label="Close"
                                                                    onClick={e => this.del(e, 'post', post.post.id)}>
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            ) : null
                                                        }
                                                        <h4 className="mt-4 card-title">
                                                            <Link to={`/communities/public/${community.id}`}>{community.title}</Link></h4>
                                                        <p className="font-small"><i className="fa fa-clock-o pr-1"></i>
                                                            <span>{formatDate(post.post.postTime)}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pb-2 card-body pt-2">
                                                <p className="card-text text-justify">
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
                                                </p>
                                            </div>
                                            <div className="text-left pl-4 mt-1">
                                                <LikeCommentPanel id={post.post.id} data={post} currentUser={currentUser} type={'post'}/>
                                            </div>
                                            {
                                                post.comments.length !== 0 ? (
                                                    <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
                                                        <div className="card">
                                                            <div className="card-header" role="tab" id={`headingOne${post.post.id}`}>
                                                                <a data-toggle="collapse" data-parent="#accordionEx" href={`#collapseOne${post.post.id}`} aria-expanded="false" aria-controls={`collapseOne${post.post.id}`} className="collapsed">
                                                                    <h6 className="mb-0">Показать комментарии
                                                                        <i className="fa fa-angle-down rotate-icon"></i>
                                                                    </h6>
                                                                </a>
                                                            </div>
                                                            <div id={`collapseOne${post.post.id}`} className="collapse" role="tabpanel"
                                                                 aria-labelledby={`headingOne${post.post.id}`}
                                                                 data-parent="#accordionEx">
                                                                <div className="card-body">
                                                                    <div className="mx-3">
                                                                        {
                                                                            post.comments.map(comment => {
                                                                                return (
                                                                                    <div>
                                                                                        <div className="row">
                                                                                            <div className="col-2">
                                                                                                {
                                                                                                    comment.avatarTitle != null ? (
                                                                                                        <div className="square rounded-circle"
                                                                                                             style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${comment.avatarTitle})`}}></div>
                                                                                                    ) : (
                                                                                                    <div className="square rounded-circle" style={{backgroundImage: `url(/bootstrap/img/no-avatar.png)`}}></div>
                                                                                                    )
                                                                                                }
                                                                                            </div>
                                                                                            <div className="col-10 text-left">
                                                                                                <div className="align-bottom ml-3">
                                                                                                    {
                                                                                                        currentUser != null && comment.comment.user.id === currentUser.id ? (
                                                                                                            <button className="close float-right" aria-label="Close" onClick={e => this.del(e, 'comment', comment.comment.id)}>
                                                                                                                <span aria-hidden="true">&times;</span>
                                                                                                            </button>
                                                                                                        ) : null
                                                                                                    }
                                                                                                    <h6>
                                                                                                        <Link to={`/users/${comment.comment.user.id}`}>
                                                                                                            {comment.comment.user.name} {comment.comment.user.surname}
                                                                                                        </Link>
                                                                                                    </h6>
                                                                                                    <p className="font-small text-black-50">
                                                                                                        <span>{formatDate(comment.comment.postTime)}</span>
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <p className="font-small text-black-50 text-justify mb-0">
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
                                                                                        <hr className="my-3"/>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null
                                            }
                                            {
                                                currentUser != null ? (
                                                    <div className="justify-content-center px-5">
                                                        <form className="row pb-0 pl-3" onSubmit={e => this.newComment(e, post.post.id)}>
                                                            <div className="col-9 form-sm md-form">
                                                        <textarea name={`commentContent${post.post.id}`}
                                                                  className="md-textarea form-control" rows="1" minLength="1"
                                                                  maxLength="255"></textarea>
                                                                <label htmlFor="form8" className="text-left ml-3">Оставьте
                                                                    комментарий</label>
                                                            </div>
                                                            <div className="col-3 mt-3">
                                                                <button type="submit" className="btn btn-light" id="newComment">
                                                                    <i className="fas fa-pencil-alt prefix"
                                                                       aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                ) : null
                                            }
                                        </div>
                                    )
                                })
                            }

                        </div>
                    ) : null
                }
            </Fragment>
        )
    }
}

export default withRouter(Posts)