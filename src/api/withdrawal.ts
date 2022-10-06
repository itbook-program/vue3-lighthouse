import request from '@/utils/request'
import { FormatResponse } from '@/types/index'

export function postwithdrawal(data: any):Promise<FormatResponse> {
  return request({
    url: '/lhs/api/v1/withdrawal',
    method: 'post',
    data
  })
}

export function getWithdrawalCheckType(id: string):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/withdrawal/checkType/${id}`,
    method: 'get'
  })
}

export function getWithdrawalById(id: string):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/withdrawal/${id}`,
    method: 'get'
  })
}