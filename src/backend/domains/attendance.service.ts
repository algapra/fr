import { ILike } from 'typeorm';
import { PaginationParam } from '@/@types/pagination';
import { AttendanceRepository } from '@/src/backend/infrastructure/database/attendance/attendance.repository';
import {
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
} from '@/src/pages/api/attendance/request';

export class AttendanceService {
  public static readonly service: AttendanceService = new AttendanceService();
  static getService(): AttendanceService {
    return AttendanceService.service;
  }

  async getAttendances(params: PaginationParam<string>) {
    let where = {};
    if (params.search) {
      where = [{ name: ILike(`%${params.search}%`) }, { code: params.search }];
    }
    const attendances = await AttendanceRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
      }
    );

    return attendances;
  }

  async getAttendanceById(id: string) {
    const attendance = await AttendanceRepository.getRepository().find({
      where: { id },
    });
    
    return attendance;
  }

  async createAttendance(attendance: CreateAttendanceRequest) {
    const newAttendance = await AttendanceRepository.getRepository().save(attendance);

    return newAttendance;
  }

  async updateAttendance(id: string, attendance: UpdateAttendanceRequest) {
    const updatedAttendance = await AttendanceRepository.getRepository().update(
      id,
      attendance
    );

    return updatedAttendance;
  }

  async deleteAttendance(id: string) {
    const deletedAttendance = await AttendanceRepository.getRepository().softDelete(
      id
    );

    return deletedAttendance;
  }
}
