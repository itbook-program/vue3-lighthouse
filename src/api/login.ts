import request from '@/utils/request'
import { RegisterForm, FormatResponse, PostSmsCode, PostRsetPasswd } from '@/types/index'

export function postLogin(data: RegisterForm): Promise<FormatResponse> {
  return request({
    url: '/auth/api/v1/login',
    method: 'post',
    data
  })
}

export function postRegister(data: RegisterForm): Promise<FormatResponse> {
  return request({
    url: '/auth/api/v1/register',
    method: 'post',
    data
  })
}

export function postSmsCode(data: PostSmsCode): Promise<FormatResponse> {
  return request({
    url: '/auth/api/v1/smsCode',
    method: 'post',
    data
  })
}

export function postResetPasswd(data: PostRsetPasswd): Promise<FormatResponse> {
  return request({
    url: '/auth/api/v1/resetPasswd',
    method: 'post',
    data
  })
}
