import request from '@/utils/request'
import { FormatResponse } from '@/types/index'

export function postCosAuth(id: string, type:string): Promise<FormatResponse>  {
  return request({
    url: `/api/cosSign/${id}`,
    method: 'get',
    params: {
      type
    }
  })
}