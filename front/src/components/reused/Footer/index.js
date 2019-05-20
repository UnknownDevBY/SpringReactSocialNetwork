import React from 'react'

const Footer = () => {
    return (
        <footer className="page-footer font-small unique-color-dark pt-0">
            <div className="primary-color">
                <div className="container">
                    <div className="row py-4 d-flex align-items-center">
                        <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                            <h6 className="mb-0 white-text">Свяжитесь с автором в социальных сетях!</h6>
                        </div>
                        <div className="col-md-6 col-lg-7 text-center text-md-right">
                            <a href="#" className="fb-ic ml-0">
                                <i className="fa fa-facebook white-text mr-4"></i>
                            </a>
                            <a href="#" className="fb-ic ml-0">
                                <i className="fa fa-google white-text mr-4"></i>
                            </a>
                            <a href="#" className="fb-ic ml-0">
                                <i className="fa fa-vk white-text mr-4"></i>
                            </a>
                            <a href="#" className="fb-ic ml-0">
                                <i className="fa fa-instagram white-text mr-4"></i>
                            </a>
                            <a href="#" className="fb-ic ml-0">
                                <i className="fa fa-telegram white-text mr-4"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer