import React, {Component} from 'react'

import {backHost, token} from '../../../../constants'

class CreateCommunityModal extends Component {

    readURL = (input) => {
        input = input.target
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                const el = document.getElementById("av")
                el.setAttribute("src", e.target.result)
                el.style.width = '180px'
            };
            reader.readAsDataURL(input.files[0]);
            document.getElementById("av").removeAttribute("style");
        }
    }

    resetForm = () => {
        document.getElementById("inputGroupFile01").value = "";
        document.getElementById("av").setAttribute("style", "display: none;");
    }

    edit = (e) => {
        e.preventDefault()
        let request = new XMLHttpRequest();
        let closedItem = document.getElementsByName("closed");
        let closed;
        closedItem.forEach(function (element) {
            if(element.checked)
                closed = element.value;
        });
        if(closed == null)
            return;
        let title = document.getElementById("title").value.trim();
        if(!title)
            return
        let params = new FormData()
        params.append('title', title)
        params.append('closed', closed)
        if(document.getElementById("inputGroupFile01").files) {
            var avatar = document.getElementById("inputGroupFile01").files[0];
            params.append('avatar', avatar)
        }
        let description = document.getElementById("description").value.trim();
        if(description)
            params.append('description', description)
        const {updateState} = this.props
        document.getElementById("close").click()
        let elem = document.querySelector('.modal-backdrop');
        if(elem)
            elem.parentNode.removeChild(elem);
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    updateState()
                }
            }
        };
        request.open('POST', `${backHost}/communities/create`);
        if(token.value)
            request.setRequestHeader('Authorization', token.value)
        request.send(params);
    }

    render() {

        return (
            <div className="modal fade" id="modalContactForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <form method="post" onSubmit={this.edit} className="modal-dialog" role="document"
                      encType="multipart/form-data">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">Создать группу</h4>
                            <button type="button" id="close" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={this.resetForm}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="text-center mt-1">
                            <img style={{display: 'none'}} id="av" src="" className="rounded" alt=""/>
                        </div>
                        <div className="input-group justify-content-center pt-4 px-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupFileAddon01"><i
                                    className="fa fa-file"></i></span>
                            </div>
                            <div className="custom-file">
                                <input onChange={this.readURL} type="file" className="custom-file-input"
                                       id="inputGroupFile01" name="avatar" accept=".jpg, .jpeg, .png"
                                       aria-describedby="inputGroupFileAddon01"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">Выберите аватар</label>
                            </div>
                        </div>
                        <div className="modal-body mx-3">
                            <div className="md-form mb-5">
                                <i className="fas fa-user prefix grey-text"></i>
                                <input type="text" id="title" name="title" minLength="2" maxLength="63" required="required" className="form-control validate"/>
                                    <label data-error="wrong" data-success="right" htmlFor="form34">Название</label>
                            </div>
                            <div className="md-form">
                                <i className="fas fa-info prefix grey-text"></i>
                                <textarea type="text" id="description" name="description" className="md-textarea form-control" rows="4"></textarea>
                                <label data-error="wrong" data-success="right" htmlFor="form8">Описание</label>
                            </div>
                            <div className="text-center w-100">
                                <div title="Доступна всем"
                                     className="custom-control custom-radio custom-control-inline">
                                    <input checked required="required" type="radio" className="custom-control-input" id="defaultInline2" name="closed" value="false"/>
                                        <label className="custom-control-label" htmlFor="defaultInline2">Открытая</label>
                                </div>
                                <div title="Доступна только после подписки, подтвержденной админом"
                                     className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="defaultInline1" name="closed" value="true"/>
                                        <label className="custom-control-label" htmlFor="defaultInline1">Закрытая</label>
                                </div>
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

export default CreateCommunityModal