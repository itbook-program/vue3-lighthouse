import request from '@/utils/request'
import { FormatResponse, PostArticle, ArticleCtx } from '@/types/index'

export function postArticle(data: PostArticle): Promise<FormatResponse>  {
  return request({
    url: `/lhs/api/v1/article`,
    method: 'post',
    data
  })
}

export function getArtList(uid:any, params: ArticleCtx): Promise<FormatResponse>  {
  return request({
    url: `/lhs/api/v1/art/list/${uid}`,
    method: 'get',
    params
  })
}

export function getArticleList(params: ArticleCtx): Promise<FormatResponse>  {
  return request({
    url: `/lhs/api/v1/article`,
    method: 'get',
    params
  })
}

export function getArtDetail(id?: string, check?: boolean): Promise<FormatResponse>  {
  return request({
    url: `/lhs/api/v1/artDetail/${id}`,
    method: 'get',
    params: {
      check
    }
  })
}

export function getArticleDetail(id: string): Promise<FormatResponse>  {
  return request({
    url: `/lhs/api/v1/article/${id}`,
    method: 'get'
  })
}

export function putArticle(id:string, data?: ArticleCtx): Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/article/${id}`,
    method: 'put',
    data
  })
}

export function deleteArticleById(id: string): Promise<FormatResponse> {
  return request({
    url: `/lhs/api/v1/article/${id}`,
    method: 'delete'
  })
}