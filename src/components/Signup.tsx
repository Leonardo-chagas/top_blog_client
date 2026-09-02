import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import type { TokenData } from "../types";

type SignupProps = {
    addToken: (token:string)=>void,
    addUsername: (username:string)=>void
}

function Signup({addToken, addUsername}:SignupProps){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value);
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const onConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirm(e.currentTarget.value);
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        await axios.post(apiUrl + 'users', {
            username: username,
            password: password
        }).then(
            response => {
                console.log('Success: ', response.data)
            }
        ).catch(error => {
            console.log(error)
        })

        axios.post<TokenData>(apiUrl + 'login', {
            username: username,
            password: password
        }).then(
            response => {
                const apiInfo = response.data;
                console.log('Success: ', response.data)
                addToken(apiInfo.token);
                addUsername(username);
                localStorage.setItem("username", username);
                localStorage.setItem("userId", apiInfo.userId);
                navigate('/');
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
                <input type="text" name="username" id="username" value={username} onChange={onUsernameChange}></input>

                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" value={password} onChange={onPasswordChange}></input>

                <label htmlFor="confirm">Confirm Password</label>
                <input type="text" name="confirm" id="confirm" value={confirm} onChange={onConfirmChange}></input>

                <button type="submit">Signup</button>
            </form>
        </main>
    );
}

export default Signup;