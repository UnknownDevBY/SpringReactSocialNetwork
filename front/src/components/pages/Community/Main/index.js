import React, {Component} from 'react'

import Spinner from '../../../Spinner'
import Header from "./Header";
import Info from "./Info";
import Posts from "./Posts";

class Main extends Component {

    render() {
        const {data} = this.props

        if(!data)
            return (
                <main className="messages-block">
                    <Spinner/>
                </main>
            )

        return (
            <main className="messages-block">
                <div className="row justify-content-center">
                    <Header data={data}/>
                    <Posts data={data}/>
                    <Info data={data}/>
                </div>
            </main>
        );
    }
}

export default Main