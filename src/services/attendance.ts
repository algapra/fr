import { Generic } from '@/@types/generic';
import { Paginated, PaginationParam } from '@/@types/pagination';
import { request } from '../hooks/useRequest';
import { Member } from './member';

export interface Attendance extends Generic {
  type: string;
  member: Member;
}

export const getAttendances = async ({
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
  const attendance = await request.get<Paginated<Attendance>>(`/attendances?${params}`);
  
  return attendance.data;
};

export const createAttendance = async (data: Attendance) => {
  return request.post('/attendances', data);
};

export const updateAttendance = async (id: string, data: Attendance) => {
  return request.put(`/attendances/${id}`, data);
};

export const deleteAttendance = async (id: string) => {
  return request.delete(`/attendances/${id}`);
};

export const checkAttendanceProperty = async (
  property: 'attendance',
  data: Partial<Attendance>
) => {
  return request.post(`/attendances/${property}/exists`, data);
};