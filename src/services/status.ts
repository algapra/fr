import { Generic } from '@/@types/generic';
import { Paginated, PaginationParam } from '@/@types/pagination';
import { request } from '../hooks/useRequest';
import { Member } from './member';

export interface Status extends Generic {
  type: string;
  member?: Member;
}

export const getStatuses = async ({
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
  const status = await request.get<Paginated<Status>>(`/statuses?${params}`);

  return status.data;
};

export const createStatus = async (data: Status) => {
  return request.post('/statuses', data);
};

export const updateStatus = async (id: string, data: Status) => {
  return request.put(`/statuses/${id}`, data);
};

export const deleteStatus = async (id: string) => {
  return request.delete(`/statuses/${id}`);
};

export const checkStatusProperty = async (
  property: 'status',
  data: Partial<Status>
) => {
  return request.post(`/statuses/${property}/exists`, data);
};