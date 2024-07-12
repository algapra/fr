import { ILike } from 'typeorm';
import { PaginationParam } from '@/@types/pagination';
import { StatusRepository } from '@/src/backend/infrastructure/database/status/status.repository';
import {
  CreateStatusRequest,
  UpdateStatusRequest,
} from '@/src/pages/api/statuses/request';

export class StatusService {
  public static readonly service: StatusService = new StatusService();
  static getService(): StatusService {
    return StatusService.service;
  }

  async getStatuss(params: PaginationParam<string>) {
    let where = {};
    if (params.search) {
      where = [{ name: ILike(`%${params.search}%`) }, { code: params.search }];
    }
    const statuses = await StatusRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
      }
    );

    return statuses;
  }

  async getStatusById(id: string) {
    const status = await StatusRepository.getRepository().find({
      where: { id },
    });
    
    return status;
  }

  async createStatus(status: CreateStatusRequest) {
    const newStatus = await StatusRepository.getRepository().save(status);

    return newStatus;
  }

  async updateStatus(id: string, status: UpdateStatusRequest) {
    const updatedStatus = await StatusRepository.getRepository().update(
      id,
      status
    );

    return updatedStatus;
  }

  async deleteStatus(id: string) {
    const deletedStatus = await StatusRepository.getRepository().softDelete(
      id
    );

    return deletedStatus;
  }
}
