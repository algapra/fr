import { ILike } from 'typeorm';
import { PaginationParam } from '@/@types/pagination';
import { RoomRepository } from '@/src/backend/infrastructure/database/room/room.repository';
import {
  CreateRoomRequest,
  UpdateRoomRequest,
} from '@/src/pages/api/rooms/request';

export class RoomService {
  public static readonly service: RoomService = new RoomService();
  static getService(): RoomService {
    return RoomService.service;
  }

  async getRooms(params: PaginationParam<string>) {
    let where = {};
    if (params.search) {
      where = [{ name: ILike(`%${params.search}%`) }, { code: params.search }];
    }
    const Rooms = await RoomRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
      }
    );

    return Rooms;
  }

  async getRoomById(id: string) {
    const Room = await RoomRepository.getRepository().find({
      where: { id },
    });
    
    return Room;
  }

  async createRoom(Room: CreateRoomRequest) {
    const newRoom = await RoomRepository.getRepository().save(Room);

    return newRoom;
  }

  async updateRoom(id: string, Room: UpdateRoomRequest) {
    const updatedRoom = await RoomRepository.getRepository().update(
      id,
      Room
    );

    return updatedRoom;
  }

  async deleteRoom(id: string) {
    const deletedRoom = await RoomRepository.getRepository().softDelete(
      id
    );

    return deletedRoom;
  }
}
