export interface BaseRequest {
  facegallery_id: string;
  trx_id: string;
}

export interface IdentifyFaceRequest {
  image: string;
}

export interface EnrollFaceRequest {
  user_id: string;
  user_name: string;
  image: string;
}
