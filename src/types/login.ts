import { FormatResponse } from './index'
export interface RegisterForm {
    phone: string;
    passwd: string;
    smsCode: number | null;
    rePasswd?: string;
}

export interface PostSmsCode {
    phone: string
}

export interface LoginForm extends RegisterForm {}

export interface PostLogin extends  FormatResponse {}

export interface PostRsetPasswd extends RegisterForm {}
