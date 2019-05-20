import React, {Component, Fragment} from 'react'
import {withRouter, Redirect} from 'react-router-dom'

import {backHost} from '../../../../constants'

class EditModal extends Component {

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
        const {id} = this.props.match.params
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
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    updateState()
                }
            }
        };
        request.open('POST', `${backHost}/communities/public/${id}/edit`);
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

        const {community, currentUser} = data

        return (
            <Fragment>
                {
                    currentUser != null && currentUser.id === community.admin.id ? (
                            <div className="modal fade" id="modalContactForm" tabIndex="-1" role="dialog"
                                 aria-labelledby="myModalLabel"
                                 aria-hidden="true">
                                <form method="post" onSubmit={this.edit} className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header text-center">
                                            <h4 className="modal-title w-100 font-weight-bold">Редактировать группу</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                                    onClick={this.resetForm}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="text-center mt-1">
                                            <img style={{display: 'none'}} id="av" src="" className="rounded" alt="" />
                                        </div>
                                        <div className="input-group justify-content-center pt-4 px-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupFileAddon01"><i
                                                    className="fa fa-file"></i></span>
                                            </div>
                                            <div className="custom-file">
                                                <input onChange={this.readURL} type="file" className="custom-file-input"
                                                       id="inputGroupFile01" name="avatar" accept=".jpg, .jpeg, .png"
                                                       aria-describedby="inputGroupFileAddon01" />
                                                    <label className="custom-file-label" htmlFor="inputGroupFile01">Измените аватар</label>
                                            </div>
                                        </div>
                                        <div className="modal-body mx-3">
                                            <div className="md-form mb-5">
                                                <i className="fas fa-user prefix grey-text"></i>
                                                <input defaultValue={community.title} type="text" id="form34" name="title"
                                                       minLength="2" maxLength="63" required="required"
                                                       className="form-control validate" />
                                                    <label data-error="wrong" data-success="right"
                                                           htmlFor="form34">Название</label>
                                            </div>
                                            <div className="md-form">
                                                <i className="fas fa-info prefix grey-text"></i>
                                                <textarea type="text" id="form10"
                                                          name="description" className="md-textarea form-control" rows="4"
                                                          minLength="1" maxLength="255">{community.description}</textarea>
                                                <label data-error="wrong" data-success="right"
                                                       htmlFor="form10">Описание</label>
                                            </div>
                                            <div className="text-center w-100">
                                                <div title="Доступна всем"
                                                     className="custom-control custom-radio custom-control-inline">
                                                    <input defaultChecked={!community.closed} required="required"
                                                           type="radio" className="custom-control-input" id="defaultInline2"
                                                           name="closed" value="false" />
                                                        <label className="custom-control-label" htmlFor="defaultInline2">Открытая</label>
                                                </div>
                                                <div title="Доступна только после подписки, подтвержденной админом"
                                                     className="custom-control custom-radio custom-control-inline">
                                                    <input defaultChecked={community.closed} type="radio"
                                                           className="custom-control-input" id="defaultInline1"
                                                           name="closed" value="true" />
                                                        <label className="custom-control-label" htmlFor="defaultInline1">Закрытая</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary">Изменить <i
                                                className="fas fa-plus ml-1"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ) : null
                }
            </Fragment>
        )
    }
}

export default withRouter(EditModal)