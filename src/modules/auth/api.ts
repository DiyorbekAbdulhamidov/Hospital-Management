// import http from 'services/http'
// import { objectToFormData } from 'utils'

// import { IApi } from './types'

// export const Register = ({ email, username, password, confirmPassword: re_password }: IApi.Register.Request) =>
//   http.post<IApi.Register.Response>('/users/', objectToFormData({ email, username, password, re_password }))

// export const Login = (data: IApi.Login.Request) => http.post<IApi.Login.Response>('/users/token/', objectToFormData(data))

// export const Profile = () => http.get<IApi.Profile.Response>('/users/getme/')

// export const Verification = () => http.post('/users/')
// export const SendResetPasswordCode = () => http.post('/users/')
// export const ConfirmResetPassword = () => http.post('/users/')
export {};
