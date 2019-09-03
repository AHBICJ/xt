import request from '@/utils/request'

export function getCities() {
  return request({
    url: '/api/all_city',
    method: 'get'
  })
}
export function getArticleList(datas) {
  return request({
    url: '/api/article_list',
    method: 'get',
    params: datas
  })
}
export function getArticle(datas) {
  return request({
    url: '/api/article',
    method: 'get',
    params: datas
  })
}
export function getSidebar1(datas) {
  return request({
    url: '/api/related_article',
    method: 'get',
    params: datas
  })
}
export function getSidebar2(datas) {
  return request({
    url: '/api/PopularArticles',
    method: 'get',
    params: datas
  })
}
export function getComment(datas) {
  return request({
    url: '/api/comment',
    method: 'get',
    params: datas
  })
}
export function getCategories(datas) {
  return request({
    url: '/api/category',
    method: 'get',
    params: datas
  })
}

export function getLanterns(datas) {
  return request({
    url: '/api/Lantern',
    method: 'get',
    params: datas
  })
}


export function task_detail(data) {
  return request({
    url: '/api/task_detail',
    method: 'get',
    params: data
  })
}

export function room_tasks(data) {
  return request({
    url: '/api/room_tasks',
    method: 'get',
    params: data
  })
}

export function get_classroom_info(data) {
  return request({
    url: '/api/get_classroom_info',
    method: 'get',
    params: data
  })
}

export function get_classroom_members(data) {
  return request({
    url: '/api/member_list',
    method: 'get',
    params: data
  })
}

export function getClassroomList(data) {
  return request({
    url: '/api/myclassroom',
    method: 'get',
    params: data
  })
}

export function get_homework(data) {
  return request({
    url: '/api/get_homework',
    method: 'get',
    params: data
  })
}

export function get_homeworklist(data) {
  return request({
    url: '/api/all_commit_homework_stu_list',
    method: 'get',
    params: data
  })
}
