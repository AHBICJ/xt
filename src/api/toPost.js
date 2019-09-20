import request from '@/utils/request'

export function postComment(datas){
    return request({
      url: '/api/add_comments',
      method: 'post',
      data:datas
    })
  }
  export function create_task(data){
    return request({
      url: '/api/create_task',
      method: 'post',
      data
    })
  }
  export function create_classroom(data){
    return request({
      url: '/api/create_classroom',
      method: 'post',
      data
    })
  }
  
  export function submit_home(data){
    return request({
      url: '/api/submit_homework',
      method: 'post',
      data
    })
  }
  
  export function mark_score(data){
    return request({
      url: '/api/mark_score',
      method: 'post',
      data
    })
  }

  export function JoinClassRoom(data){
    return request({
      url: '/api/join_classroom',
      method: 'post',
      data
    })
  }

  export function createTopic(data){
    return request({
      url: '/api/topic',
      method:'post',
      data
    })
  }
