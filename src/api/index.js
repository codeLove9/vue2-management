import request from '@/utils/request'

export const getData = () => {
  return request.get('/home/getData')
}