import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Spinner from '../../../Spinner'
import BlackListContent from './BlackListContent'
import NotBlackListContent from './NotBlackListContent'

class Main extends Component {

    render() {
        const {data} = this.props

        if(!data)
            return (
                <main className="messages-block">
                    <Spinner/>
                </main>
            )

        const {amIInBlacklist} = data

        return (
            <main>
                {
                    amIInBlacklist ? (
                        <BlackListContent data={data}/>
                    ) : (
                        <NotBlackListContent data={data}/>
                    )
                }
            </main>
        );
    }
}

export default withRouter(Main)