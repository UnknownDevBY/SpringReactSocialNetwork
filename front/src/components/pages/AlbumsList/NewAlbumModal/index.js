import React, {Component} from 'react'
import {backHost} from "../../../../constants";
import {withRouter} from 'react-router-dom'

class NewAlbumModal extends Component {

    addAlbum = e => {
        e.preventDefault()
        var request = new XMLHttpRequest();
        var textareaContent = document.getElementById('title').value;
        textareaContent = textareaContent.trim();
        const {addAlbum} = this.props
        document.getElementById('closeModal').click()
        if(textareaContent !== "") {
            var params = 'title=' + textareaContent;
            request.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    addAlbum(JSON.parse(request.response))
                }
            };
            request.open('POST', `${backHost}/albums/add`);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send(params);
        }
    }

    render() {
        const {data} = this.props
        if(!data)
            return null

        const {currentUser} = data
        let id = parseInt(this.props.match.params.id)
        if(currentUser == null || currentUser.id !== id)
            return null

        return (
            <div className="modal fade" id="modalContactForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <form onSubmit={this.addAlbum} className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">Создать альбом</h4>
                            <button type="button" className="close" id="closeModal" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="md-form mb-5">
                                <i className="fas fa-user prefix grey-text"></i>
                                <input type="text" id="title" name="title" minLength="2" maxLength="63" required="required" className="form-control validate"/>
                                <label data-error="wrong" data-success="right" htmlFor="title">Название</label>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">Создать <i className="fas fa-plus ml-1"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(NewAlbumModal)