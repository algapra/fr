import { Generic } from '@/@types/generic';
import { Paginated, PaginationParam } from '@/@types/pagination';
import { request } from '../hooks/useRequest';
import { Department } from './departments';
import { Room } from './rooms';

export interface Access extends Generic {
  roleName: string;
  quoteAccess: number;
  department: Department;
  room: Room;
}

export const getAccesses = async ({
  page,
  size,
  search,
}: PaginationParam<string>) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());
  if (search) {
    params.append('search', search);
  }
  const accesses = await request.get<Paginated<Access>>(`/accesses?${params}`);

  return accesses.data;
};

export const createAccess = async (data: Access) => {
  return request.post('/accesses', data);
};

export const updateAccess = async (id: string, data: Access) => {
  return request.put(`/accesses/${id}`, data);
};

export const deleteAccess = async (id: string) => {
  return request.delete(`/accesses/${id}`);
};
