import React, {Component} from 'react'

import {backHost, token} from '../../../../constants'

class AddPhotoModal extends Component {

    state = {
        redirect: false
    }

    readURL = (input) => {
        input = input.target
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                const el = document.getElementById("av")
                el.setAttribute("src", e.target.result)
                el.style.width = '380px'
            };
            reader.readAsDataURL(input.files[0]);
            document.getElementById("av").removeAttribute("style");
        }
    }

    resetForm = () => {
        document.getElementById("newPhoto").value = "";
        document.getElementById("av").setAttribute("style", "display: none;");
    }

    edit = (e) => {
        e.preventDefault()
        let request = new XMLHttpRequest();
        let params = new FormData()
        if(document.getElementById("newPhoto").files) {
            let newPhoto = document.getElementById("newPhoto").files[0];
            params.append('newPhoto', newPhoto)
        } else return
        let selector = document.getElementById('album')
        let album = selector[selector.selectedIndex].value
        if(selector.selectedIndex !== 0)
            params.append('album', album)
        const makeAvatar = document.getElementById('makeAvatar')
        if(makeAvatar.checked)
            params.append('makeAvatar', makeAvatar.value)
        const updateStateSuccess = this.props.updateState
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                updateStateSuccess()
                document.getElementById('closeModal').click()
            }
        };
        request.open('POST', `${backHost}/photos/add`);
        if(token.value)
            request.setRequestHeader('Authorization', token.value)
        request.send(params);
    }

    componentWillUnmount() {
        let elem = document.querySelector('.modal-backdrop');
        if(elem)
            elem.parentNode.removeChild(elem);
    }

    render() {
        const {data} = this.props
        if(!data)
            return null

        const {albums, currentUser, pageUser} = data

        if(currentUser == null || currentUser.id !== pageUser.id )
            return null

        return (
            <div className="modal fade" id="modalContactForm" tabIndex="-1"
                 role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <form method="post" onSubmit={this.edit} className="modal-dialog" role="document"
                      encType="multipart/form-data">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">Добавить фото</h4>
                            <button type="button" className="close" id="closeModal" data-dismiss="modal" aria-label="Close" onClick={this.resetForm}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="text-center mt-1">
                            <img style={{display: 'none'}} id="av" src="" className="rounded" alt=""/>
                        </div>
                        <div className="input-group justify-content-center pt-4 px-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupFileAddon01"><i className="fa fa-file"></i></span>
                            </div>
                            <div className="custom-file">
                                <input required onChange={this.readURL} type="file" className="custom-file-input"
                                       id="newPhoto" name="newPhoto" accept=".jpg, .jpeg, .png"
                                       aria-describedby="inputGroupFileAddon01"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">Загрузить файл</label>
                            </div>
                        </div>
                        <div className="modal-body mx-3">

                            <div className="form-group form-sm">
                                <select className="form-control" name="album" id="album">
                                    <option selected disabled>Выберите альбом</option>
                                    {
                                        albums.map(album => {
                                            return (
                                                <option value={album}>{album}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="makeAvatar" name="makeAvatar" value={true}/>
                                <label className="custom-control-label" htmlFor="makeAvatar">Сделать аватаром</label>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">Добавить фото <i className="fas fa-plus ml-1"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddPhotoModal