import { Generic } from '@/@types/generic';
import { Paginated, PaginationParam } from '@/@types/pagination';
import { request } from '../hooks/useRequest';

export interface Member extends Generic {
  avatar?: string;
  fullName: string;
  nik: string;
  attendances?: string;
  statuses: string;
  role: string;
}

export const getMembers = async ({
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
  const members = await request.get<Paginated<Member>>(`/members?${params}`);

  return members.data;
};

export const createMember = async (data: Member) => {  
  return request.post('/members', data);
};

export const updateMember = async (id: string, data: Member) => {
  return request.put(`/members/${id}`, data);
};

export const deleteMember = async (id: string) => {
  return request.delete(`/members/${id}`);
};

export const checkMemberProperty = async (
  property: 'nik',
  data: Partial<Member>
) => {
  return request.post(`/members/${property}/exists`, data);
};