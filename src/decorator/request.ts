import { RequestHandler, Router } from "express";


enum Methods {
  get = 'get',
  post = 'post'
}

// export function get(path:string){
//   return function(target: any, key: string){
//     Reflect.defineMetadata('path',path,target,key)
//     Reflect.defineMetadata('method','get',target,key)
//   }
// }

// export function post(path:string){
//   return function(target: any, key: string){
//     Reflect.defineMetadata('path',path,target,key)
//     Reflect.defineMetadata('method','post',target,key)
//   }
// }

function getRequestDecorator(type: string) {
  return function(path: string) {
    return function(target: any, key: string){
      Reflect.defineMetadata('path',path,target,key)
      Reflect.defineMetadata('method',type,target,key)
    }
  }
}

export const get = getRequestDecorator('get')
export const post = getRequestDecorator('post')
export const put = getRequestDecorator('put')
export const del = getRequestDecorator('delete')