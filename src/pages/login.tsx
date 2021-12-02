import { useState } from "react";
import { UserLogin } from "../interfaces/user/userLogin";
import axios from "axios";
import Endpoints from "../endpoints/endpoints";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";

const Login = ({handleLogin, setIsLoggedIn}: any) => {
    const [userLogin, setUserLogin] = useState<UserLogin>({username: '', password: ''});
    const [isPending, setIsPending] = useState<boolean>(false);
    //const [cookies, setCookie, removeCookie] = useCookies(['Token']);

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
                //props(() => true);
                setIsLoggedIn(true);
                //Cookies.set('Token', res.data.token, {path: '', expires: new Date(res.data.expiration)});
                //localStorage.setItem('Token', res.data.token);
                //setCookie('Token', res.data.token, {expires: new Date(res.data.expiration)})
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

export default Login;