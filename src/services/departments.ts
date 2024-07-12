import { Generic } from '@/@types/generic';
import { Paginated, PaginationParam } from '@/@types/pagination';
import { request } from '../hooks/useRequest';

export interface Department extends Generic {
  department: string;
}

export const getDepartments = async ({
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
  const department = await request.get<Paginated<Department>>(`/departments?${params}`);
  
  return department.data;
};

export const createDepartment = async (data: Department) => {
  return request.post('/departments', data);
};

export const updateDepartment = async (id: string, data: Department) => {
  return request.put(`/departments/${id}`, data);
};

export const deleteDepartment = async (id: string) => {
  return request.delete(`/departments/${id}`);
};

export const checkDepartmentProperty = async (
  property: 'department',
  data: Partial<Department>
) => {
  return request.post(`/departments/${property}/exists`, data);
};