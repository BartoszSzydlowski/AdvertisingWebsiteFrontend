import { useState } from "react";
import { UserLogin } from "../interfaces/user/userLogin";
import axios from "axios";
import Endpoints from "../endpoints/endpoints";
import { useHistory } from "react-router-dom";

const Login = () => {

	const [userLogin, setUserLogin] = useState<UserLogin>({username: '', password: ''});
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
				console.log(res.data);
				localStorage.setItem('Token', res.data.token);
				history.push('/home');
			})
			.catch(error => {
				setIsPending(false);
				console.log(error.response.data)
			});
		// fetch(`${Endpoints.defaultEndpoint}/api/Identity/Login`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(userLogin),
		// })
		// 	.then(res => res.json())
		// 	.then(data => {
		// 		setIsPending(false);
		// 		console.log(data)
		// 	})
		// 	.catch(error => {
		// 		console.log(error.type)
		// 	})
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
