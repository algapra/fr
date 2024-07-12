import * as UUID from 'uuid';
import { AsyncLocalStorage } from 'async_hooks';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserEntity } from '../infrastructure/database/user/user.entity';
import { Nullable } from '@/@types/nullable';

export interface Context {
  user: Nullable<UserEntity>;
  record?: Record<string, any>;
  request?: NextApiRequest;
  response?: NextApiResponse;
}

export class RequestContext {
  static contextMap: Map<string, Context> = new Map();
  static asyncLocalStorage = new AsyncLocalStorage<string>();
  static async startContext<T>(handler: () => void | Promise<T>) {
    const contextId = UUID.v4();
    const initialContext: Context = {
      user: null,
      record: {},
    };
    RequestContext.contextMap.set(contextId, initialContext);
    const res = await RequestContext.asyncLocalStorage.run(contextId, handler);
    RequestContext.contextMap.delete(contextId);

    return res as T;
  }
  static getContext(): Context {
    const id = RequestContext.asyncLocalStorage.getStore();

    return RequestContext.contextMap.get(id as string) || ({} as Context);
  }
  static setContext(data: Partial<Context>): void {
    const id = RequestContext.asyncLocalStorage.getStore();
    const context = RequestContext.getContext();
    RequestContext.contextMap.set(id as string, {
      ...context,
      ...data,
    });
  }
}
