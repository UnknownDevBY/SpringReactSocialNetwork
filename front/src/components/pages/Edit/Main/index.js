import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Spinner from '../../../Spinner'
import {backHost, token} from "../../../../constants";


class Main extends Component {

    onSearch = () => {
        let text = document.getElementById('inputLGEx').value.toLowerCase();
        let groupBlocks = document.getElementsByClassName('div');
        let item;
        for(let i = 0; i !== groupBlocks.length; ++i) {
            item = groupBlocks.item(i);
            item.hidden = !item.getAttribute('name').toLowerCase().startsWith(text);
        }
    }

    editUser = e => {
        e.preventDefault()
        let request = new XMLHttpRequest();

        let name = document.getElementById("name").value.trim();
        let surname = document.getElementById("surname").value.trim();
        let city = document.getElementById("city").value.trim();
        let pass = document.getElementById("pass").value.trim();
        let sex = document.querySelector('input[name="sex"]:checked').value;
        let dateOfBirth = document.getElementById("dateOfBirth").value.trim();
        let bio = document.getElementById("bio").value.trim();
        let interests = document.getElementById("interests").value.trim();

        let params = new FormData()
        params.append('name', name)
        params.append('surname', surname)
        params.append('city', city)
        params.append('sex', sex)
        params.append('dateOfBirth', dateOfBirth)
        params.append('bio', bio)
        params.append('interests', interests)
        if(pass && pass.length >= 6)
            params.append('pass', pass)

        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    alert('Изменения успешно сохранены')
                }
            }
        };
        request.open('POST', `${backHost}/edit`);
        if(token.value)
            request.setRequestHeader('Authorization', token.value)
        request.send(params);
    }

    editPrivacySettings = e => {
        e.preventDefault()
        let request = new XMLHttpRequest();

        let messages = document.getElementById("messages")
        messages = messages[messages.selectedIndex].value
        let fullInfo = document.getElementById("fullInfo")
        fullInfo = fullInfo[fullInfo.selectedIndex].value
        let photos = document.getElementById("photos")
        photos = photos[photos.selectedIndex].value
        let friends = document.getElementById("friends")
        friends = friends[friends.selectedIndex].value
        let postAuthors = document.getElementById("postAuthors")
        postAuthors = postAuthors[postAuthors.selectedIndex].value
        let comments = document.getElementById("comments")
        comments = comments[comments.selectedIndex].value

        let params = new FormData()
        params.append("messages", messages)
        params.append("fullInfo", fullInfo)
        params.append("photos", photos)
        params.append("friends", friends)
        params.append("postAuthors", postAuthors)
        params.append("comments", comments)

        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    alert('Изменения успешно сохранены')
                }
            }
        };
        request.open('POST', `${backHost}/privacy-settings`);
        if(token.value)
            request.setRequestHeader('Authorization', token.value)
        request.send(params);
    }

    render() {
        const {data} = this.props

        if(!data)
            return (
                <main className="messages-block">
                    <Spinner/>
                </main>
            )

        const {currentUser, curPrivSet} = data
        if(!currentUser)
            return <Redirect to="/" />

        return (
            <main className="messages-block">
                <div className="row justify-content-center">
                    <div className="col-7 justify-content-start">
                        <div className="row justify-content-center">
                            <ul className="nav nav-tabs bg-light" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                                       role="tab" aria-controls="home" aria-selected="true">
                                        Личная информация
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile"
                                       role="tab" aria-controls="profile" aria-selected="false">
                                        Настройки приватности
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <hr/>
                            <div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel"
                                         aria-labelledby="home-tab">
                                        <form onSubmit={this.editUser}>
                                            <label htmlFor="name">Имя</label>
                                            <div>
                                                <input defaultValue={currentUser.name} type="text" id="name" name="name" minLength="3" maxLength="31" required="required"/>
                                            </div>
                                            <label htmlFor="surname">Фамилия</label>
                                            <div>
                                                <input defaultValue={currentUser.surname} type="text" id="surname" name="surname" minLength="2" maxLength="31" required="required"/>
                                            </div>
                                            <label htmlFor="city">Город</label>
                                            <div>
                                                <input defaultValue={currentUser.city} type="text" id="city" name="city" minLength="2" maxLength="31"/>
                                            </div>
                                            <label htmlFor="pass">Сменить пароль (не менее 6 символов)</label>
                                            <div>
                                                <input type="password" id="pass" name="pass" minLength="6"/>
                                            </div>
                                            <div>
                                                <p>Пол</p>
                                                <label htmlFor="male">Мужчина</label>
                                                <input defaultChecked={currentUser.sex === 'm'} type="radio" name="sex" id="male" value="m" required="required"/>
                                                <label htmlFor="female">Женщина</label>
                                                <input defaultChecked={currentUser.sex === 'f'} type="radio" name="sex" id="female" value="f"/>
                                            </div>
                                            <label htmlFor="dateOfBirth">Дата рождения</label>
                                            <div>
                                                <input defaultValue={currentUser.dateOfBirth} type="date" id="dateOfBirth" name="dateOfBirth" required="required"/>
                                            </div>
                                            <label htmlFor="bio">О себе</label>
                                            <div>
                                                <textarea id="bio" name="bio">
                                                    {currentUser.bio}
                                                </textarea>
                                            </div>
                                            <label htmlFor="interests">Увлечения</label>
                                            <div>
                                                <textarea id="interests" name="interests">
                                                    {currentUser.interests}
                                                </textarea>
                                            </div>
                                            <input className="btn btn-outline-dark btn-rounded" type="submit" value="Подтвердить"/>
                                        </form>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel"
                                         aria-labelledby="profile-tab">
                                        <form onSubmit={this.editPrivacySettings}>
                                            <div className="privacy-option">
                                                <label htmlFor="messages">Кто может писать мне сообщения?</label>
                                                <select name="messages" id="messages" required="required">
                                                    <option value="a" selected={curPrivSet == null || curPrivSet.messages === 'a'}>Все</option>
                                                    <option value="f" selected={curPrivSet != null && curPrivSet.messages === 'f'}>Только друзья</option>
                                                    <option value="m" selected={curPrivSet != null && curPrivSet.messages === 'm'}>Только я</option>
                                                </select>
                                            </div>
                                            <div className="privacy-option">
                                                <label htmlFor="fullInfo">Кто может просматривать информацию обо мне?</label>
                                                <select name="fullInfo" id="fullInfo" required="required">
                                                    <option value="a" selected={curPrivSet == null || curPrivSet.fullInfo === 'a'}>Все</option>
                                                    <option value="f" selected={curPrivSet != null && curPrivSet.fullInfo === 'f'}>Только друзья</option>
                                                    <option value="m" selected={curPrivSet != null && curPrivSet.fullInfo === 'm'}>Только я</option>
                                                </select>
                                            </div>
                                            <div className="privacy-option">
                                                <label htmlFor="photos">Кто может просматривать мои фото?</label>
                                                <select name="photos" id="photos" required="required">
                                                    <option value="a" selected={curPrivSet == null || curPrivSet.photos === 'a'}>Все</option>
                                                    <option value="f" selected={curPrivSet != null && curPrivSet.photos === 'f'}>Только друзья</option>
                                                    <option value="m" selected={curPrivSet != null && curPrivSet.photos === 'm'}>Только я</option>
                                                </select>
                                            </div>
                                            <div className="privacy-option">
                                                <label htmlFor="friends">Кто может просматривать моих друзей?</label>
                                                <select name="friends" id="friends" required="required">
                                                    <option value="a" selected={curPrivSet == null || curPrivSet.friends === 'a'}>Все</option>
                                                    <option value="f" selected={curPrivSet != null && curPrivSet.friends === 'f'}>Только друзья</option>
                                                    <option value="m" selected={curPrivSet != null && curPrivSet.friends === 'm'}>Только я</option>
                                                </select>
                                            </div>
                                            <div className="privacy-option">
                                                <label htmlFor="postAuthors">Кто может оставлять посты на моей странице?</label>
                                                <select name="postAuthors" id="postAuthors" required="required">
                                                    <option value="a" selected={curPrivSet == null || curPrivSet.postAuthors === 'a'}>Все</option>
                                                    <option value="f" selected={curPrivSet != null && curPrivSet.postAuthors === 'f'}>Только друзья</option>
                                                    <option value="m" selected={curPrivSet != null && curPrivSet.postAuthors === 'm'}>Только я</option>
                                                </select>
                                            </div>
                                            <div className="privacy-option">
                                                <label htmlFor="fullInfo">Кто может комментировать мои записи?</label>
                                                <select name="comments" id="comments" required="required">
                                                    <option value="a" selected={curPrivSet == null || curPrivSet.comments === 'a'}>Все</option>
                                                    <option value="f" selected={curPrivSet != null && curPrivSet.comments === 'f'}>Только друзья</option>
                                                    <option value="m" selected={curPrivSet != null && curPrivSet.comments === 'm'}>Только я</option>
                                                </select>
                                            </div>
                                            <div>
                                                <input className="btn btn-outline-dark btn-rounded" type="submit" value="Сохранить"/>
                                                <input className="btn btn-outline-danger btn-rounded" type="reset" value="Сбросить"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Main