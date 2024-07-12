export const config = {
  appEnv: process.env.APP_ENV ?? 'development',
  db: {
    type: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '') ?? 3306,
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME,
    maxPoolConnection: process.env.DB_MAX_POOL_CONNECTION ?? 10,
  },
  jwtSecret: process.env.JWT_SECRET ?? 'super-secret-jwt-key',
  faceRecognition: {
    serverUrl:
      process.env.SERVER_URL ?? 'https://fr.neoapi.id/risetai/face-api',
    accessToken: process.env.ACCESS_TOKEN,
    faceGaleryId: process.env.FACE_GALLERY_ID,
    trxId: process.env.TRX_ID,
  },
  midtrans: {
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    merchantId: process.env.MIDTRANS_MERCHANT_ID,
    isProd: process.env.MIDTRANS_IS_PROD === 'true',
    callbackUrl:
      process.env.MIDTRANS_CALLBACK_URL ??
      'http://localhost:3000/midtrans/callback',
  },
  objectStorage: {
    url: process.env.OBJECT_STORAGE_URL ?? 'https://minio.productzillaacademy.com/',
    bucket: process.env.OBJECT_STORAGE_BUCKET ?? 'fr-member-management',
  },

  /**
   * this config is used in the front-end
   * some of them might be same with the backend config
   *
   * becareful do not expose sensitive data here
   */
  appConfig: {
    midtransIsProd: process.env.MIDTRANS_IS_PROD === 'true',
    midtransClientKey: process.env.MIDTRANS_CLIENT_KEY as string,
  },
};
