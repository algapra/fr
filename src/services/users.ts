import { request } from '../hooks/useRequest';

export interface ExistanceParam {
  param: string;
}

export const getExistance = async (param: string, data: ExistanceParam) => {
  return request.post(`/users/${param}/exists`, data);
};
