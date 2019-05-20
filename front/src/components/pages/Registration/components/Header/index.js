import React from 'react'

import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark primary-color">
                <Link className="navbar-brand" to="/">Social Network</Link>
            </nav>
        </header>
    )
}

export default Header