import React from 'react';
// import {useEffect} from 'react';
import axios from 'axios';
import Layout from './layoutStyles/UserList-Layout';

function UsersList({name, email, user, refresh}) {

    const id = user.id;
    const togggleUserList = document.getElementById("users");
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const submitUpdate = document.getElementById("update")

    function deleteUser() {
        axios.delete(`https://fashsta-rest-test.herokuapp.com/users/${id}`)
        .then( (result) => { console.log(result.data)})
        .then( ()=> { return refresh})
    }

    function updateUser(){
            axios.put(`https://fashsta-rest-test.herokuapp.com/users/${id}`,
                {
                    email,
                    name,
                }
            );
    }
    
    function editUser(){

        // togggleUserList.style.display = "none";
        userName.value = name;
        userEmail.value = email;
        
        // sunmitbutton = updateUser()
    }

    return (
        <Layout>
            <div className="user">
                <div className="title">
                    <div className="thumb">
                        <img className="img-fluid thumb-style" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""></img>
                    </div>
                    <div className="user-details">
                            <div className="user-name">
                                <h5 className="name-style">{name}</h5>
                            </div>
                            <div className="user-mail">
                                    <h5 className='mail-style'>{email}</h5>
                            </div>
                    </div>
                </div>
                <div className='icons'>
                    <ul className="user-icons">
                        <li className='edit'onClick={editUser}> Edit</li>
                        <li className='delete' onClick={deleteUser}>Delete</li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
}

export default UsersList;