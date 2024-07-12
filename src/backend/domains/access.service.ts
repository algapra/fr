import { AccessRepository } from '@/src/backend/infrastructure/database/access/access.repository';
import { DepartmentRepository } from '@/src/backend/infrastructure/database/department/department.repository';
import { RoomRepository } from '@/src/backend/infrastructure/database/room/room.repository';
import {
  CreateAccessRequest,
  UpdateAccessRequest,
} from '@/src/pages/api/accesses/request';
import { PaginationParam } from '@/@types/pagination';
import { ILike } from 'typeorm';

export class AccessService {
  public static readonly service: AccessService = new AccessService();
  static getService(): AccessService {
    return AccessService.service;
  }

  async getAccesses(params: PaginationParam<string>) {
    let where = {};
    if (params.search) {
      where = [{ name: ILike(`%${params.search}%`) }];
    }
    const accesses = await AccessRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
        relations: ['department', 'room'],
      },
    );

    return accesses;
  }

  async getAccessById(id: string) {
    const access = await AccessRepository.getRepository().find({
      where: { id },
    });

    return access;
  }

  async createAccess(access: CreateAccessRequest) {
    const department = await DepartmentRepository.getRepository().findOne({
      where: { id: access.department?.id },
    });
    const room = await RoomRepository.getRepository().findOne({
      where: { id: access.room?.id },
    });
    const newAccess = await AccessRepository.getRepository().save({
      roleName: access.roleName,
      quoteAccess: access.quoteAccess,
      department: access.department && department ? department : undefined,
      room: access.room && room ? room : undefined,
    });

    return newAccess;
  }

  async updateAccess(id: string, access: UpdateAccessRequest) {
    const updatedAccess = await AccessRepository.getRepository().update(
      id,
      access,
    );

    return updatedAccess;
  }

  async deleteAccess(id: string) {
    const deletedAccess =
      await AccessRepository.getRepository().softDelete(id);

    return deletedAccess;
  }
}
