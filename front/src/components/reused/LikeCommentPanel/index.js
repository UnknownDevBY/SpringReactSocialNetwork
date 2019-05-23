import React, {Component, Fragment} from 'react'
import axios from 'axios'
import {backHost, token} from "../../../constants";

export default class LikeCommentPanel extends Component {

    state = {
        likedByCurrentUser: this.props.data.likedByCurrentUser,
        likesCount: this.props.data.likesCount
    }

    onClick = (e) => {
        if(!this.props.currentUser)
            return
        const {type} = this.props
        const {id} = this.props
        const setState = () => {
            this.setState(({likedByCurrentUser, likesCount}) => {
                return {
                    likedByCurrentUser: !likedByCurrentUser,
                    likesCount: likedByCurrentUser ? --likesCount : ++likesCount
                }
            })
        }
        let header = {}
        if(token.value)
            header = {'Authorization': token.value}

        axios.get(`${backHost}/likes/${type}/${id}`, {
            headers: header
        }).then(res => {
            setState()
        })
    }

    render() {
        const {data, id} = this.props
        const {likedByCurrentUser, likesCount} = this.state
        const className = likedByCurrentUser ? 'red-text' : 'blue-text'

        return (
            <Fragment>
                <a href="javascript:void(0)" onClick={this.onClick} className={className}>
                    <i className="fa fa-thumbs-up mr-2"></i>
                    <span>{likesCount}</span>
                </a>
                <a href="javascript:void(0)" className="ml-2 blue-text">
                    <i className="fa fa-comments mr-2"></i>
                    <span id={`commentsAmount${id}`}>{data.comments ? data.comments.length : 0}</span>
                </a>
            </Fragment>
        )
    }
}