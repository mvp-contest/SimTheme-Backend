import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3Client: S3Client;
  private bucketName: string;
  private cdnUrl: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: this.configService.get('R2_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get('R2_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('R2_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.get('R2_BUCKET_NAME');
    this.cdnUrl = this.configService.get('CDN_URL');
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `${this.cdnUrl}/${fileName}`;
  }

  async uploadProjectFiles(
    modelFile: Express.Multer.File,
    jsonFile: Express.Multer.File,
    projectId: string,
  ): Promise<{ modelFileUrl: string; jsonFileUrl: string }> {
    const [modelFileUrl, jsonFileUrl] = await Promise.all([
      this.uploadFile(modelFile, `projects/${projectId}/models`),
      this.uploadFile(jsonFile, `projects/${projectId}/data`),
    ]);

    return { modelFileUrl, jsonFileUrl };
  }
}
