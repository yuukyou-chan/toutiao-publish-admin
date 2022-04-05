/**
 * 新建文章
 */

import request from '@/utils/request'

export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

export const collectImage = (imaeId, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imaeId}`,
    data: {
      collect
    }
  })
}

export const deleteImage = imaeId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imaeId}`
  })
}
