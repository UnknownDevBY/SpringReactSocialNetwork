import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import Spinner from '../../../Spinner'
import {bucketName} from "../../../../constants";


class Main extends Component {

    onSearch = () => {
        let text = document.getElementById('inputLGEx').value.toLowerCase();
        let groupBlocks = document.getElementsByClassName('div');
        let item;
        for(let i = 0; i !== groupBlocks.length; ++i) {
            item = groupBlocks.item(i);
            item.hidden = !item.getAttribute('name').toLowerCase().startsWith(text);
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

        const {myCommunities, adminCommunities} = data

        return (
            <main className="messages-block">
                <div className="row justify-content-center">
                    <div className="col-7 justify-content-start">
                        <div className="row">
                            <ul className="nav nav-tabs bg-light" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                                       role="tab" aria-controls="home" aria-selected="true">
                                        Мои сообщества ({myCommunities.length})
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile"
                                       role="tab" aria-controls="profile" aria-selected="false">
                                        Управление ({adminCommunities.length})
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link bg-dark" id="contact-tab" data-toggle="modal"
                                       data-target="#modalContactForm">Создать группу</a>
                                </li>
                            </ul>
                            <div className="col-9 md-form">
                                <input type="text" id="inputLGEx" className="form-control form-control-lg" onChange={this.onSearch}/>
                                <label htmlFor="inputLGEx">Поиск</label>
                            </div>
                            <div className="col-3 mt-3">
                                <button type="submit" className="btn btn-light" onClick={this.onSearch}>
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    {
                                        myCommunities.map(community => {
                                            return (
                                                <div className="row mb-4 div" name={community.community.title}>
                                                    <div className="col-2 zoom">
                                                        {
                                                            community.avatar == null
                                                                ? (
                                                                    <img src="/bootstrap/img/no-avatar.png" className="img-fluid z-depth-1 rounded" alt="Responsive image" />
                                                                ) : (
                                                                    <div className="square rounded" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${community.avatar.title})`}}></div>
                                                                )
                                                        }
                                                    </div>
                                                    <div className="col-10 text-left">
                                                        <h2>
                                                            <Link to={`/communities/public/${community.community.id}`}>
                                                                {community.community.title}
                                                            </Link>
                                                        </h2>
                                                        <p className="font-weight-light font-small text-justify">{community.community.description}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel"
                                     aria-labelledby="profile-tab">
                                    {
                                        adminCommunities.map(community => {
                                            return (
                                                <div className="row mb-4 div" name={community.community.title}>
                                                    <div className="col-2 zoom">
                                                        {
                                                            community.avatar == null
                                                                ? (
                                                                    <img src="/bootstrap/img/no-avatar.png" className="img-fluid z-depth-1 rounded" alt="Responsive image" />
                                                                ) : (
                                                                    <div className="square rounded" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${community.avatar.title})`}}></div>
                                                                )
                                                        }
                                                    </div>
                                                    <div className="col-10 text-left">
                                                        <h2>
                                                            <Link to={`/communities/public/${community.community.id}`}>
                                                                {community.community.title}
                                                            </Link>
                                                        </h2>
                                                        <p className="font-weight-light font-small text-justify">{community.community.description}</p>
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

export default Main