import request from '@/utils/request'

export const getData = () => {
  return request.get('/home/getData')
}

export const getUser = params => {
  // console.log(params)
  return request.get('/user/getUser', params)
}

export const addUser = data => {
  return request.post('/user/add', data)
}

export const editUser = data => {
  return request.post('/user/edit', data)
}

export const delUser = data => {
  return request.post('/user/del', data)
}

export const getMenu = data => {
  return request.post('/permission/getMenu', data)
}
