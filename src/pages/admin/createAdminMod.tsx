import axios from 'axios';
import React, { useState } from 'react';
import Endpoints from '../../endpoints/endpoints';
import RegisterModel from '../../interfaces/user/user';

const CreateAdminMod: React.FC = () => {
  const [newUser, setNewUser] = useState<RegisterModel>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const [userrank, setUserrank] = useState<string>('Administrator');

  const register = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsPending(true);
    if(userrank === 'Administrator') {
      axios.post(`${Endpoints.defaultEndpoint}/Identity/RegisterAdmin`, JSON.stringify(newUser), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        setIsPending(false);
      })
      .catch(error => {
        setIsPending(false);
        console.log(error);
      });
    }
    if(userrank === 'Moderator') {
      axios.post(`${Endpoints.defaultEndpoint}/Identity/RegisterMod`, JSON.stringify(newUser), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        setIsPending(false);
      })
      .catch((error: unknown) => {
        setIsPending(false);
        console.log(error);
      });
    }

  };
  
  return (
    <div>
      <form onSubmit={register}>
        <div>
          <input type="text" placeholder="Username" value={newUser.username} onChange={e => setNewUser(prev => ({ ...prev, username: e.target.value }))} />
        </div>

        <div>
          <input type="email" placeholder="E-mail" value={newUser.email} onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))} />
        </div>

        <div>
          <input type="password" placeholder="Password" value={newUser.password} onChange={e => setNewUser(prev => ({ ...prev, password: e.target.value }))} />
        </div>

        <div>
          <input type="password" placeholder="Confirm Password" value={newUser.confirmPassword} onChange={e => setNewUser(prev => ({ ...prev, confirmPassword: e.target.value }))} />
        </div>

        {/* {!isPending && <button>Register</button>} */}
        {!isPending && <input type="submit" value="Register" />}
        {/* {isPending && <button disabled>Register in progress</button>} */}
        {isPending && <input type="submit" value="Register" disabled/>}
      </form>
      <input type="radio" value="Administrator" name="userrank" onChange={e => setUserrank(e.target.value)} checked={userrank === "Administrator"} /> Administrator
      <input type="radio" value="Moderator" name="userrank" onChange={e => setUserrank(e.target.value)} checked={!(userrank === "Administrator")} /> Moderator
    </div>
  );
}
 
export default CreateAdminMod;
