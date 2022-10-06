import request from '@/utils/request'
import { FormatResponse } from '@/types/index'

// params
export function getArtUser(id:string):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/artUser/${id}`,
    method: 'get'
  })
}

export function putArtUser(id:string, data: any):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/artUser/${id}`,
    method: 'put',
    data
  })
}
