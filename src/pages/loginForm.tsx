import { useState } from "react";
import { LoginModel } from "../interfaces/user/user";
import axios from "axios";
import Endpoints from "../endpoints/endpoints";
import { useHistory } from "react-router-dom";

const LoginForm = ({handleLogin, setIsLoggedIn}: any) => {
    const [userLogin, setUserLogin] = useState<LoginModel>({username: '', password: ''});
    const [isPending, setIsPending] = useState<boolean>(false);

    const history = useHistory();

    const auth = (e: any) => {
        e.preventDefault();
        setIsPending(true);
        axios.post(`${Endpoints.defaultEndpoint}/api/Identity/Login`,
            JSON.stringify(userLogin), {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                setIsPending(false);
                setIsLoggedIn(true);
                console.log(res.data);
                handleLogin(res.data.token, res.data.expiration);
                history.push('/home');
            })
            .catch(error => {
                setIsPending(false);
                console.log(error)
            });
    };

    return (
        <div>
            <form onSubmit={auth}>

                <div>
                    <input type='text' placeholder='Nazwa użytkownika' value={userLogin.username}
                           onChange={e => setUserLogin(prev => ({...prev, username: e.target.value}))}
                    />
                </div>

                <div>
                    <input type='password' placeholder='Hasło' value={userLogin.password}
                           onChange={e => setUserLogin(prev => ({...prev, password: e.target.value}))}
                    />
                </div>

                {!isPending && <button>Zaloguj się</button>}
                {isPending && <button disabled>Logowanie w toku</button>}

            </form>
        </div>
    );
};

export default LoginForm;