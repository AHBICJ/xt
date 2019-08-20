import request from '@/utils/request'

export function getCities() {
  return request({
    url: '/api/all_city',
    method: 'get'
  })
}
export function getArticleList(datas){
  return request({
    url: '/api/article_list',
    method: 'get',
    params:datas
  })
}
export function getArticle(datas){
  return request({
    url: '/api/article',
    method: 'get',
    params:datas
  })
}
export function getSidebar1(datas){
  return request({
    url: '/api/related_article',
    method: 'get',
    params:datas
  })
}
export function getSidebar2(datas){
  return request({
    url: '/api/PopularArticles',
    method: 'get',
    params:datas
  })
}
export function getComment(datas){
  return request({
    url: '/api/comment',
    method: 'get',
    params:datas
  })
}
export function getCategories(datas){
  return request({
    url: '/api/category',
    method: 'get',
    params:datas
  })
}