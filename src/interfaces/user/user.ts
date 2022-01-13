export default interface LoginModel {
  username?: string;
  password?: string;
}

export default interface RegisterModel {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default interface UserData {
  username?: string;
  phoneNumber?: string;
  email?: string;
}
