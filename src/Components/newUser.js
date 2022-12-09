import React, { useState } from 'react';
import axios from 'axios'

export const NewUser = () => {

     const [ user, setUser ] = useState({
         username : "",
     });

     const {username} = user;

     const handleChange = nam => event => {
         setUser({...user, [nam]: event.target.value});
     };

     const onSubmit = e => {
        e.preventDefault();
        axios.post('https://backend-for-the-bois.onrender.com/users/add', user)
        .then(user => {
            window.location = '/'
        })
        .catch(err => {
            console.log(err)
        });

     }
 
    const formInput = () => {
        return(
            <div className="mb-3">
                <h1 className="text-center mt-3">New User</h1>
                <br/>
                <div className="container w-75 mt-5">
                    <div className="form-floating mb-3">
                        <input className="form-control" placeholder="Username" 
                            value={username} onChange={handleChange("username")}></input>
                        <label>Username</label>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary" onClick={onSubmit}>Add user</button>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div> 
            {formInput()}
        </div>
    )
}