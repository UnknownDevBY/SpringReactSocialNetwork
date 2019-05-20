import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Spinner from '../../../Spinner'
import {bucketName, formatDateGetDate} from '../../../../constants'

class Main extends Component {

    render() {
        const {data} = this.props

        if(!data)
            return (
                <main className="messages-block">
                    <Spinner/>
                </main>
            )

        const {photos} = data

        return (
            <main>
                <div className="row justify-content-center">
                    <div className="col-8">
                        {
                            photos.map(photo => {
                                return (
                                    <div className="row">
                                        <div className="col-4">
                                            <Link to={`/photos/${photo.id}`}>
                                                <div className="view">
                                                    <div className="square img-fluid" style={{backgroundImage: `url(https://s3.amazonaws.com/${bucketName}/${photo.title})`}}></div>
                                                    <div className="mask flex-center waves-effect waves-light rgba-black-light">
                                                        <p className="white-text">
                                                            <i className="far fa-clock pr-1"></i>
                                                            <span>{formatDateGetDate(photo.dateOfPost)}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(Main)