import request from '@/utils/request'
import { FormatResponse } from '@/types/index'

export function getSubscribe(params?: object):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/subscribe`,
    method: 'get',
    params
  })
}
export function getSubscribeByOrderId(id?: string):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/subscribe/order/${id}`,
    method: 'get',
  })
}

export function getSubscribeById(id?: string):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/subscribe/${id}`,
    method: 'get',
  })
}

export function checkSubscribe({ writer }: any):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/subscribe/checkType/${writer}`,
    method: 'get'
  })
}

export function putSubscribe(id:string , data?: object):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/subscribe/${id}`,
    method: 'put',
    data
  })
}
