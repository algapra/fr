import { Generic } from '@/@types/generic';
import { Paginated, PaginationParam } from '@/@types/pagination';
import { request } from '../hooks/useRequest';

export interface Room extends Generic {
  idRoom: string;
  roomName: string;
  floor: number;
}

export const getRooms = async ({
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
  const room = await request.get<Paginated<Room>>(`/room?${params}`);
  
  return room.data;
};

export const createRoom = async (data: Room) => {
  // Get the last room for the specified floor
  const existingRooms = await getRooms({ page: 1, size: 1, search: `floor:${data.floor}` });
  
  let lastLetter = 'A'; // Default to 'A' if no rooms exist for this floor
  
  // If there are existing rooms, find the last letter used
  if (existingRooms && existingRooms.items.length > 0) {
    const lastRoom = existingRooms.items[existingRooms.items.length - 1];
    const lastCharCode = lastRoom.roomName.charCodeAt(0);
    lastLetter = String.fromCharCode(lastCharCode + 1);
  }

  // Set the idRoom as floor + next available letter
  data.idRoom = `${data.floor}${lastLetter}`;

  return request.post('/room', data);
};

export const updateRoom = async (id: string, data: Room) => {
  return request.put(`/room/${id}`, data);
};

export const deleteRoom = async (id: string) => {
  return request.delete(`/room/${id}`);
};
