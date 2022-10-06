import request from '@/utils/request'
import { FormatResponse } from '@/types/index'

export function getUserByUid(id: string):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/uid/${id}`,
    method: 'get'
  })
}
