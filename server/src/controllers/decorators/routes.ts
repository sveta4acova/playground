import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      console.log(desc, key);
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    }
  }
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
