import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from 'next-api-decorators';
import {
  CreateCompanyRequest,
  CreateUserRequest,
} from '@/src/pages/api/users/request';
import { UserRepository } from '@/src/backend/infrastructure/database/user/user.repository';
import { hashString } from 'src/utils/hash';
import { encode, validate } from 'src/utils/jwt';
import { UserEntity } from '@/src/backend/infrastructure/database/user/user.entity';
import { LoginRequest, RegisterRequest } from '@/src/pages/api/auth/request';
import { CompanyEntity } from '../infrastructure/database/company/company.entity';
import { awaitToError } from '@/src/utils/await-to-error';
import { CompanyRepository } from '../infrastructure/database/company/company.repository';
import { FindOneOptions } from 'typeorm';
import { Profile } from '../models/profile';

export class UserService {
  public static readonly service: UserService = new UserService();
  static getService(): UserService {
    return UserService.service;
  }

  async login(loginRequest: LoginRequest) {
    const user = await this.getUserData({
      email: loginRequest.email,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== hashString(loginRequest.password)) {
      throw new UnauthorizedException('Incorrect Credentials');
    }

    const userData = { ...user, password: undefined };
    const token = await encode(userData);

    return {
      token,
      userData,
    };
  }

  async register(registerRequest: RegisterRequest) {
    const user = await UserRepository.getRepository().findOne({
      where: { email: registerRequest.email },
    });
    if (user) {
      throw new ConflictException('User already exists');
    }

    const [errCompany, company] = await awaitToError(
      this.createCompany({
        companyName: registerRequest.companyName,
        companyEmail: registerRequest.companyEmail,
        companyAddress: registerRequest.companyAddress,
        companyType: registerRequest.companyType,
        companyField: registerRequest.companyField,
        companyPhoneNumber: registerRequest.companyPhoneNumber,
        memberCount: registerRequest.memberCount,
      }),
    );
    if (errCompany || !company) {
      throw new UnprocessableEntityException('Failed to create company');
    }
    await this.createUser({
      email: registerRequest.email,
      username: new Date().getTime().toString(),
      password: registerRequest.password,
      phoneNumber: registerRequest.phoneNumber,
      name: registerRequest.name,
      address: registerRequest.address,
      companyId: company.id,
    });

    return registerRequest;
  }

  async me(token: string) {
    const valid = await validate<UserEntity<Profile>>(token);

    const user = await this.getUserData({
      id: valid.payload.id,
    });

    return { ...user, password: undefined } as unknown as UserEntity<Profile>;
  }

  async createUser(user: CreateUserRequest) {
    const u = new UserEntity({
      email: user.email,
      username: user.username,
      password: hashString(user.password),
      phone: user.phoneNumber,
      rawUserMetadata: JSON.stringify({
        name: user.name,
        address: user.address,
      }) as any,
      company: {
        id: user.companyId,
      } as CompanyEntity,
    });

    return UserRepository.getRepository().save(u);
  }

  async createCompany(company: CreateCompanyRequest) {
    const c = new CompanyEntity({
      name: company.companyName,
      email: company.companyEmail,
      address: company.companyAddress,
      type: company.companyType,
      field: company.companyField,
      phone: company.companyPhoneNumber,
      memberCount: company.memberCount,
    });

    return CompanyRepository.getRepository().save(c);
  }

  async checkExistance(param: string, body: any) {
    const user = await UserRepository.getRepository().findOne({
      where: { [param]: body.param },
    });

    return { exists: !!user };
  }

  getUserDataById(id: string) {
    return this.getUserData({ id });
  }

  private async getUserData(
    where: FindOneOptions<UserEntity<Profile>>['where'],
  ) {
    const user = await UserRepository.getRepository().findOne({
      where,
      relations: {
        company: true,
      },
    });

    user?.rawUserMetadata &&
      (user.rawUserMetadata = JSON.parse(user.rawUserMetadata as any));

    return { ...user, role: 'company_owner' } as UserEntity;
  }
}
