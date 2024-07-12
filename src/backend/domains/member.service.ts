import { MemberRepository } from '@/src/backend/infrastructure/database/member/member.repository';
import {
  CreateMemberRequest,
  UpdateMemberRequest,
} from '@/src/pages/api/members/request';
import { PaginationParam } from '@/@types/pagination';
import { StatusRepository } from '../infrastructure/database/status/status.repository';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from 'next-api-decorators';
import { ObjectStorageService } from '../infrastructure/object-storage/object-storage.service';
import { awaitToError } from '@/src/utils/await-to-error';
import { RequestContext } from '../request-context/request-context';

export class MemberService {
  public static readonly service: MemberService = new MemberService();
  static getService(): MemberService {
    return MemberService.service;
  }

  async getMembers(params: PaginationParam<string>) {
    const { user } = RequestContext.getContext();
    const members = await MemberRepository.getRepository().getPaginated(
      {
        page: params.page,
        size: params.size,
      },
      {
        where: { company: { id: user?.company.id } },
        relations: ['statuses.member', 'attendances.member', 'company'],
      },
    );

    members.items = await Promise.all(
      members.items.map(async d => {
        const a = await ObjectStorageService.getService().getPresignedUrl(
          'fr-faces',
          `${d?.company.id}/${d.nik}`,
        );

        return {
          ...d,
          avatar: a.url,
        };
      }),
    );

    return members;
  }

  async getMemberById(id: string) {
    const member = await MemberRepository.getRepository().find({
      where: { id },
    });

    return member;
  }

  private base64ToBuffer(base64Str: string) {
    return Buffer.from(base64Str.split(';base64,')[1], 'base64');
  }

  async createMember(member: CreateMemberRequest) {
    const { user } = RequestContext.getContext();
    const totalMember = await MemberRepository.getRepository().count({
      where: {
        company: {
          id: user?.company.id,
        },
      },
    });
    if (user?.company.memberCount && totalMember >= user?.company.memberCount) {
      throw new BadRequestException('Member count has reached the limit');
    }
    const newMember = await MemberRepository.getRepository().save({
      avatar: '',
      fullName: member.fullName,
      nik: member.nik,
      role: member.role,
      company: {
        id: user?.company.id,
      },
    });
    const avatarBuffer = this.base64ToBuffer(member.avatar);

    const [err] = await awaitToError(
      ObjectStorageService.getService().uploadFile(
        'fr-faces',
        `${newMember.company.id}/${newMember.nik}`,
        avatarBuffer,
      ),
    );
    if (err) {
      throw new InternalServerErrorException(err.message);
    }

    await awaitToError(
      StatusRepository.getRepository().save({
        type: member.statuses,
        member: newMember,
      }),
    );

    return { ...newMember };
  }

  async updateMember(id: string, member: UpdateMemberRequest) {
    const updateMember = {
      avatar: '',
      fullName: member.fullName,
      nik: member.nik,
      role: member.role,
    };

    const getStatus = await StatusRepository.getRepository().find({
      where: { member: { id } },
    });
    const idStatus = getStatus[0].id;

    const updatedMember = await MemberRepository.getRepository().update(
      id,
      updateMember,
    );

    const updatedStatus = await StatusRepository.getRepository().update(
      { id: idStatus },
      {
        type: member.statuses,
      },
    );

    return { updatedMember, updatedStatus };
  }

  async deleteMember(id: string) {
    const deletedMember = await MemberRepository.getRepository().softDelete(id);

    return deletedMember;
  }

  async existanceCheck(body: Partial<CreateMemberRequest>, property: string) {
    const member = await MemberRepository.getRepository().findOne({
      where: [
        { [property]: body[property as keyof Partial<CreateMemberRequest>] },
      ],
    });
    if (member) {
      throw new ConflictException('ID Member already exists');
    }

    return { exists: false };
  }
}
