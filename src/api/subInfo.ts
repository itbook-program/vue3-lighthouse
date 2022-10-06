import request from '@/utils/request'
import { FormatResponse } from '@/types/index'

export function getSubinfo(id?:String):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/subinfo/${id}`,
    method: 'get'
  })
}

export function putSubinfo(id?:String, data?: object):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/subinfo/${id}`,
    method: 'put',
    data
  })
}
