import { Client } from 'minio';
import { Stream } from 'stream';
import { config } from '@/config';
import { awaitToError } from '@/src/utils/await-to-error';
import { isStream, streamToString } from '@/src/utils/stream';
import { PipeFunction } from '../../models/object-storage';
import { InternalServerErrorException } from 'next-api-decorators';

export class ObjectStorageService {
  minioClient: Client;
  bucketName: string;
  presignedUrlExpired = 3600;
  public static readonly service: ObjectStorageService = new ObjectStorageService();
  static getService(): ObjectStorageService {
    return ObjectStorageService.service;
  }
  constructor() {
    const minioURL = new URL(config.objectStorage.url);
    this.minioClient = new Client({
      endPoint: minioURL.hostname,

      // tslint:disable-next-line: radix
      port: this.minioPort(minioURL),
      useSSL: minioURL.protocol === 'https:',
      accessKey: minioURL.username,
      secretKey: minioURL.password,
    });
    this.minioClient.setRequestOptions({ rejectUnauthorized: false });
    this.bucketName = config.objectStorage.bucket;
  }
  private minioPort(url: URL) {
    if (url.port) {
      return parseInt(url.port);
    } else if (url.protocol === 'https:') {
      return 443;
    } else {
      return 80;
    }
  }
  async uploadFile(
    namespace: string,
    objectId: string,
    file: Buffer | Stream,
    replaceOnExists?: boolean,
  ): Promise<void> {
    const data: Buffer | string = isStream(file)
      ? await streamToString(file as Stream)
      : (file as Buffer);
    if (!replaceOnExists) {
      // tslint:disable-next-line: no-shadowed-variable
      const [err] = await awaitToError(
        this.minioClient.getObject(this.bucketName, `${namespace}/${objectId}`),
      );
      if (!err) {
        const n = objectId.split('.'); // spliting extension
        if (n.length > 1) {
          n[n.length - 2] += '-';
          objectId = n.join('.');
        } else {
          objectId += '-';
        }
      }
    }
    const [err] = await awaitToError(
      this.minioClient.putObject(
        this.bucketName,
        `${namespace}/${objectId}`,
        data,
      ),
    );
    if (err) {
      if ((err as any).code !== 'NoSuchBucket') {
        throw err;
      }
      await this.minioClient.makeBucket(this.bucketName, 'id-west');

      return this.uploadFile(namespace, objectId, file);
    }
  }
  async deleteFile(namespace: string, objectId: string): Promise<void> {
    const exists = await this.minioClient.getObject(
      this.bucketName,
      `${namespace}/${objectId}`,
    );
    if (!exists) {
      throw new InternalServerErrorException('No Object to delete!');
    }
    await this.minioClient.removeObject(
      this.bucketName,
      `${namespace}/${objectId}`,
    );
  }

  listFile(namespace: string, path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const stream = this.minioClient.listObjects(
        this.bucketName,
        `${namespace}/${path}`,
      );
      const objectsList: string[] = [];
      stream.on('data', (obj: string) => {
        objectsList.push(obj);
      });
      stream.on('error', (e: Error) => {
        reject(new InternalServerErrorException(e.message));
      });
      stream.on('end', () => {
        resolve(objectsList);
      });
    });
  }
  pipeFile(namespace: string, objectId: string, pipe: PipeFunction): void {
    this.minioClient
      .presignedUrl(`GET`, this.bucketName, `${namespace}/${objectId}`)
      .then((getObjectUrl: string) => pipe(getObjectUrl));
  }
  getObjectUrl(namespace: string, objectId: string): Promise<string> {
    return this.minioClient.presignedUrl(
      `GET`,
      this.bucketName,
      `${namespace}/${objectId}`,
    );
  }
  async getPresignedUrl(
    namespace: string,
    objectId: string,
    method = 'GET',
  ): Promise<{ url: string }> {
    try {
      let presignedUrl = '';
      if (method === 'GET') {
        presignedUrl = await this.minioClient.presignedGetObject(
          this.bucketName,
          `${namespace}/${objectId}`,
          this.presignedUrlExpired,
        );
      } else if (method === 'PUT') {
        presignedUrl = await this.minioClient.presignedPutObject(
          this.bucketName,
          `${namespace}/${objectId}`,
          this.presignedUrlExpired,
        );
      }

      return { url: presignedUrl };
    } catch (error) {
      console.log(error);
      
      return { url: '' };
    }
  }
}
