import React from 'react'

import RegistrationModal from "./components/RegistrationModal"
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from '../../reused/Footer'

const MainPage = () => {
    return (
        <React.Fragment>
            <RegistrationModal/>
            <Header/>
            <Main/>
            <hr className="mb-3"/>
            <Footer/>
        </React.Fragment>
    )
}

export default MainPage