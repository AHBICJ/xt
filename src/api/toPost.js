import request from '@/utils/request'

export function postComment(datas){
    return request({
      url: '/api/add_comments',
      method: 'post',
      data:datas
    })
  }