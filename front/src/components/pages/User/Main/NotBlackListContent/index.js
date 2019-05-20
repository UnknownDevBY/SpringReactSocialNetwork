import React, {Component, Fragment} from 'react'

import AboutPerson from './AboutPerson'
import AvatarBlock from './AvatarBlock'
import FriendsList from './FriendsList'
import Posts from './Posts'

export default class NotBlackListContent extends Component {


    render() {
        const {data} = this.props

        return (
            <div className="main-info">
                <AvatarBlock data={data}/>
                <AboutPerson data={data}/>
                <FriendsList data={data}/>
                <Posts data={data}/>
            </div>
        )
    }
}