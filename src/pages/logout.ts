import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Logout = () => {
	Cookies.remove('Token');
  const history = useHistory();
	history.push('/home')
}

export default Logout;