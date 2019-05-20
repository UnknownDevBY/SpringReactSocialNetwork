import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import MainPage from '../pages/MainPage/index'
import Registration from '../pages/Registration/index'
import Activation from '../pages/Activation'
import Search from '../pages/Search'
import Friends from '../pages/Friends'
import Community from '../pages/Community'
import CommunitiesList from '../pages/CommunitiesList'
import Edit from '../pages/Edit'
import Photo from '../pages/Photo'
import User from '../pages/User'
import Conversation from '../pages/Conversation'
import ConversationsList from '../pages/ConversationsList'
import AlbumsList from '../pages/AlbumsList'
import AlbumPhotos from '../pages/AlbumPhotos'
import Log from '../pages/Log'
import News from '../pages/News'


const App = () => {
    return (
        <BrowserRouter>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/registration" component={Registration}/>
                <Route path="/activation/:code" component={Activation}/>
                <Route path="/search" component={Search}/>
                <Route path="/friends/:id" component={Friends}/>
                <Route path="/communities/public/:id" component={Community}/>
                <Route exact path="/communities" component={CommunitiesList}/>
                <Route exact path="/edit" component={Edit}/>
                <Route path="/photos/:id" component={Photo}/>
                <Route path="/users/:id" component={User}/>
                <Route path="/conversations/:id" component={Conversation}/>
                <Route path="/messages" component={ConversationsList}/>
                <Route exact path="/albums/:id" component={AlbumsList}/>
                <Route path="/albums/:userId/:albumId" component={AlbumPhotos}/>
                <Route path="/log" component={Log}/>
                <Route path="/news" component={News}/>
        </BrowserRouter>
    )
}

export default App