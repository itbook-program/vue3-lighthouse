import request from '@/utils/request'
import { FormatResponse } from '@/types/index'

export function postPushTask(data?: object):Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/push/task`,
    method: 'post',
    data
  })
}
