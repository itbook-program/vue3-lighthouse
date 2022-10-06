import request from '@/utils/request'
import { FormatResponse } from '@/types/index'
// params

export function postConsumption(data: any):Promise<FormatResponse> {
  return request({
    url: '/lhs/api/v1/consumption',
    method: 'get',
    data
  })
}
