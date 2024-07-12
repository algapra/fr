import type {
  BaseRequest,
  EnrollFaceRequest,
  IdentifyFaceRequest,
} from '@/@types/face-recognition';
import { Request } from '../../../services/request';
import { config } from '@/config';
import { AttendanceRepository } from '../database/attendance/attendance.repository';
import { Between } from 'typeorm';

export class FRService {
  static service = new FRService();
  static getService = () => FRService.service;
  static client = new Request({
    baseURL: config.faceRecognition.serverUrl,
    headers: {
      Accesstoken: config.faceRecognition.accessToken,
    },
  });
  private baseBodyRequest: BaseRequest = {
    facegallery_id: config.faceRecognition.faceGaleryId as string,
    trx_id: config.faceRecognition.trxId as string,
  };

  async fetchUserId(identify: Promise<any>): Promise<string | null> {
    try {
      const datas = await identify;
      const data = datas.risetai.return;
      const userId = data[0].user_id;

      return userId;
    } catch (error) {
      console.error('Error fetching user ID:', error);

      return null;
    }
  }

  async identifyFace(identifyFaceRequest: IdentifyFaceRequest) {
    const identify = FRService.client.post('/facegallery/identify-face', {
      ...this.baseBodyRequest,
      image: identifyFaceRequest.image,
    });

    const userId = await this.fetchUserId(identify);

    if (!userId) {
      console.error('User ID not found');

      return null;
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const existingAttendances = await AttendanceRepository.getRepository().find(
      {
        where: {
          member: { id: userId },
          createdAt: Between(todayStart, todayEnd),
        },
        order: { createdAt: 'DESC' },
      },
    );

    let newAttendanceType = 'In';
    if (existingAttendances.length > 0) {
      const latestAttendance = existingAttendances[0];
      if (latestAttendance.type === 'In') {
        newAttendanceType = 'Out';
      } else {
        // Update the existing "Out" attendance
        latestAttendance.createdAt = new Date();
        await AttendanceRepository.getRepository().save(latestAttendance);

        return identify;
      }
    }

    const newAttendance = AttendanceRepository.getRepository().create({
      member: { id: userId },
      type: newAttendanceType,
      createdAt: new Date(),
    });

    await AttendanceRepository.getRepository().save(newAttendance);

    return identify;
  }

  async registerFace(enrollFaceRequest: EnrollFaceRequest) {
    return FRService.client.post('/facegallery/enroll-face', {
      ...this.baseBodyRequest,
      user_id: enrollFaceRequest.user_id,
      user_name: enrollFaceRequest.user_name,
      image: enrollFaceRequest.image,
    });
  }
}
