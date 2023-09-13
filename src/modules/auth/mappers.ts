import get from 'lodash/get'

// import { IEntity } from './types'

// export const Comment = (item: any): IEntity.Comment => ({
//   id: get(item, 'id'),
//   movie: get(item, 'movie'),
//   author: get(item, 'author'),
//   text: get(item, 'text'),
//   createdAt: get(item, 'created_at')
// })

// export const Review = (item: any): IEntity.Review => ({
//   ...Comment(item),
//   rating: get(item, 'rating')
// })

// export const User = (item: any): IEntity.User => ({
//   id: get(item, 'id'),
//   image: get(item, 'image') || null,
//   firstName: get(item, 'first_name') || '',
//   lastName: get(item, 'last_name') || '',
//   email: get(item, 'email') || '',
//   username: get(item, 'username') || '',
//   subscription: get(item, 'subscription') || false,
//   status: get(item, 'status'),
//   createdAt: get(item, 'created_at') || '',
//   isModerator: get(item, 'is_moderator') || false,
//   isStaff: get(item, 'is_staff') || false
// })