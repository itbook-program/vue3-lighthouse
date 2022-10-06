import request from '@/utils/request'
import { FormatResponse } from '@/types/index'

export function postOrder(data: any):Promise<FormatResponse> {
  return request({
    url: '/lhs/api/v1/order',
    method: 'post',
    data
  })
}

export function postCheckOrderType(data: any):Promise<FormatResponse> {
  return request({
    url: '/lhs/api/v1/order/checkSubscribe',
    method: 'post',
    data
  })
}

export function getCollectById(id: string):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/order/statistics/${id}`,
    method: 'get'
  })
}
