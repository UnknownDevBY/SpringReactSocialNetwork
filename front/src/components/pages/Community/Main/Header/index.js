import React from 'react'
import {Link} from 'react-router-dom'

const Header = ({data}) => {
    const {community, subscription} = data
    const divClass = !community.closed || (subscription != null && subscription.confirmed)
        ? 'col-9' : 'col-6'

    return (
        <div className={divClass}>
            <div className="card card-cascade">
                <div className="view view-cascade gradient-card-header blue-gradient p-0">
                    <h4 className="card-header-title mb-3 mt-3"><span>{community.title}</span>
                        {
                            community.closed ? (
                                <i className="fa fa-lock ml-3 material-tooltip-email"
                                data-toggle="tooltip" title="Закрытое сообщество" aria-hidden="true"></i>
                                ) : null
                        }
                    </h4>
                </div>
                <div className="card-body card-body-cascade text-center">
                    <p className="card-text">{community.description}</p>
                    <hr />
                        <Link to={`/users/${community.admin.id}`} className="px-2 fa-lg tw-ic">
                            <i className="fa fa-user mr-2"></i>
                            <span>{community.admin.name} {community.admin.surname}</span>
                        </Link>
                </div>
            </div>
        </div>
    )
}

export default Header