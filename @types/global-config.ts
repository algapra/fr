import { config } from '@/config';

type AppConfig = typeof config.appConfig;
export interface GlobalConfig extends AppConfig {}
