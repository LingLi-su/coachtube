import React, {useState} from 'react';
import Axios from 'axios';


function ForgotPassword() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleOnChange = (e) => {
        e.preventDefault();
        if(e.target.id === "name") {
            setName(e.target.value)
        }else{
            setEmail(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            name,
            email
        }
        Axios.post('/api/sendMail', dataToSubmit)
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <input id ="name" placeholder="Name" value={name} onChange={handleOnChange}/><br/>
        <input id ="email" placeholder="Email" value={email} onChange={handleOnChange}/><br/>

        <button onClick={handleSubmit}> Send Email</button>
        </form>
            
        </div>
    )
}

export default ForgotPassword
