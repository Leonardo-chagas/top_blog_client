import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    const onUsernameChange: React.InputEventHandler<HTMLInputElement> = (e) => {
        setUsername(e.currentTarget.value);
    }

    const onPasswordChange: React.InputEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.currentTarget.value);
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        axios.post(apiUrl + 'login', {
            username: username,
            password: password
        }).then(
            response => {
                console.log('Success: ', response.data)
            }
        ).catch(error => {
            console.log(error)
        })
    }

    return(
        <main>
            <Link to={'/'}>Go back</Link>
            <form onSubmit={() => handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={() => onUsernameChange}></input>

                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" value={password} onChange={() => onPasswordChange}></input>

                <button type="submit">Login</button>
            </form>
        </main>
    );
}

export default Login;