import { ILike } from 'typeorm';
import { PaginationParam } from '@/@types/pagination';
import { DepartmentRepository } from '@/src/backend/infrastructure/database/department/department.repository';
import {
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from '@/src/pages/api/departments/request';
import { ConflictException } from 'next-api-decorators';

export class DepartmentService {
  public static readonly service: DepartmentService = new DepartmentService();
  static getService(): DepartmentService {
    return DepartmentService.service;
  }

  async getDepartments(params: PaginationParam<string>) {
    let where = {};
    if (params.search) {
      where = [{ name: ILike(`%${params.search}%`) }, { code: params.search }];
    }
    const departments = await DepartmentRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where,
      }
    );

    return departments;
  }

  async getDepartmentById(id: string) {
    const department = await DepartmentRepository.getRepository().find({
      where: { id },
    });
    
    return department;
  }

  async createDepartment(department: CreateDepartmentRequest) {
    const newDepartment = await DepartmentRepository.getRepository().save(department);

    return newDepartment;
  }

  async updateDepartment(id: string, department: UpdateDepartmentRequest) {
    const updatedDepartment = await DepartmentRepository.getRepository().update(
      id,
      department
    );

    return updatedDepartment;
  }

  async deleteDepartment(id: string) {
    const deletedDepartment = await DepartmentRepository.getRepository().softDelete(
      id
    );

    return deletedDepartment;
  }

  async existanceCheck(body: Partial<CreateDepartmentRequest>, property: string) {
    const department = await DepartmentRepository.getRepository().findOne({
      where: [
        { [property]: body[property as keyof Partial<CreateDepartmentRequest>] },
      ],
    });
    if (department) {
      throw new ConflictException('Department already exists');
    }

    return { exists: false };
  }
}
