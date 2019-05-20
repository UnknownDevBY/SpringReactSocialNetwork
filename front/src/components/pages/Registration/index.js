import React from 'react'

import Header from './components/Header'
import Footer from '../../reused/Footer'
import Main from './components/Main'

const Registration = () => {
    return (
        <React.Fragment>
            <Header/>
            <Main/>
            <hr className="mb-3"/>
            <Footer/>
        </React.Fragment>
    )
}

export default Registration