import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

import Spinner from '../../../Spinner'
import {bucketName} from '../../../../constants'

class Main extends Component {

    getSearchValue = () => {
        const value = this.props.location.search
        const idx = value.lastIndexOf('=')
        return value.slice(idx + 1)
    }

    onSearch = () => {
        let text = document.getElementById('inputLGEx').value.toLowerCase();
        let groupBlocks = document.getElementsByClassName('div');
        let item;
        let itemText;
        let itemType
        let usersCount = 0
        let communitiesCount = 0
        let postsCount = 0
        for(let i = 0; i !== groupBlocks.length; ++i) {
            item = groupBlocks.item(i);
            itemText = item.getAttribute('name');
            itemType = item.getAttribute('type');
            if(itemText != null) {
                if(itemText.toLowerCase().startsWith(text)) {
                    item.hidden = false
                    switch (itemType) {
                        case 'user': usersCount++
                            break
                        case 'community': communitiesCount++
                            break
                        case 'post': postsCount++
                            break
                    }
                }
                else item.hidden = true
            } else {
                if(item.getAttribute('content').toLowerCase().includes('#' + text)) {
                    item.hidden = false
                    switch (itemType) {
                        case 'user': usersCount++
                            break
                        case 'community': communitiesCount++
                            break
                        case 'post': postsCount++
                            break
                    }
                }
                else item.hidden = true
            }
        }
        document.getElementById('usersCount').innerHTML = usersCount
        document.getElementById('communitiesCount').innerHTML = communitiesCount
        document.getElementById('postsCount').innerHTML = postsCount
    }

    setSearchValue = (value) => {
        let item = document.getElementById('inputLGEx');
        item.focus();
        item.value = value.substring(1).trim();
        document.getElementById('searchButton').click();
    }

    componentDidUpdate() {
        const searchValue = this.getSearchValue()
        const el = document.getElementById('inputLGEx')
        if(el) {
            el.value = searchValue
            el.focus();
            document.getElementById('searchButton').click();
        }
    }

    render() {
        const {data} = this.props

        if(!data)
            return (
                <main className="messages-block">
                    <Spinner/>
                </main>
            )

        const {posts, communities, users} = data

        return (
            <main className="messages-block">
                <div className="row justify-content-center">
                    <div className="col-7 justify-content-start">
                        <div className="row">
                            <ul className="nav nav-tabs bg-dark rounded" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                                       role="tab" aria-controls="home"
                                       aria-selected="true">Люди <span className="badge badge-pill badge-primary" id="usersCount">{users.length}</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="subscribers-tab" data-toggle="tab" href="#subscribers"
                                       role="tab" aria-controls="subscribers"
                                       aria-selected="false">Группы <span className="badge badge-pill badge-primary" id="communitiesCount">{communities.length}</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="subscriptions-tab" data-toggle="tab"
                                       href="#subscriptions" role="tab" aria-controls="subscriptions"
                                       aria-selected="false">Хэштеги <span className="badge badge-pill badge-primary" id="postsCount">{posts.length}</span></a>
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
                                        users.map(user => {
                                            return (
                                                <div className="row mb-4 div" key={user.userId}
                                                     name={`${user.userName} ${user.userSurname}`} type="user">
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
                                                        <code>{user.age} лет</code>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="tab-pane fade" id="subscribers" role="tabpanel"
                                     aria-labelledby="subscribers-tab">
                                    {
                                        communities.map(community => {
                                            return (
                                                <div className="row mb-4 div" key={community.community.id} name={community.community.title} type="community">
                                                    <div className="col-2 zoom">
                                                        {
                                                            community.avatar == null
                                                                ? (
                                                                    <img src="/bootstrap/img/no-avatar.png"
                                                                         className="img-fluid z-depth-1 rounded" alt="Responsive image" />
                                                                ) : (
                                                                    <div className="square rounded" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${community.avatar.title})`}}></div>
                                                                )
                                                        }
                                                    </div>
                                                    <div className="col-10 text-left">
                                                        <h2><Link to={`/communities/public/${community.community.id}`}>{community.community.title}</Link></h2>
                                                        <p className="font-weight-light font-small text-justify">{community.community.description}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="tab-pane fade" id="subscriptions" role="tabpanel"
                                     aria-labelledby="subscriptions-tab">
                                    {
                                        posts.map(post => {
                                            return (
                                                    <div className="row mb-4 div"
                                                         content={post.post.content} type="post">
                                                        <div className="col-2 zoom">
                                                            {
                                                                post.avatarTitle == null
                                                                    ? (
                                                                        <img src="/bootstrap/img/no-avatar.png"
                                                                             className="img-fluid z-depth-1 rounded" alt="Responsive image" />
                                                                    ) : (
                                                                        <div className="square rounded" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${post.avatarTitle})`}}></div>
                                                                    )
                                                            }
                                                        </div>
                                                        <div className="col-10 text-left">
                                                            {
                                                                post.post.community != null
                                                                    ? (
                                                                        <code>Группа {post.post.community.title}</code>
                                                                    ) : (
                                                                        <code>Стена пользователя {post.post.owner.name} {post.post.owner.surname}</code>
                                                                    )
                                                            }
                                                             <h4>
                                                                 {
                                                                     post.post.author != null ?
                                                                         (
                                                                             <Link to={`/users/${post.post.author.id}`}>{post.post.author.name} {post.post.author.surname}</Link>
                                                                         ) : (
                                                                             <Link to={`/communities/public/${post.post.community.id}`}>{post.post.community.title}</Link>
                                                                         )
                                                                 }
                                                            </h4>
                                                            <p className="text-justify font-small black-text">
                                                                {
                                                                    post.post.content.split(' ').map(txt => {
                                                                        return !txt.startsWith('#')
                                                                            ? (
                                                                                <span>txt </span>
                                                                            ) : (
                                                                                <Link className="blue-text" to="#" onClick={this.setSearchValue(txt)}>txt </Link>
                                                                            )
                                                                    })
                                                                }
                                                            </p>
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
        );
    }
}

export default withRouter(Main)