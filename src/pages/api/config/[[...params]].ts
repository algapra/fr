import { config } from '@/config';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';
import { Get, HttpCode } from 'next-api-decorators';

class ConfigHandler extends BaseHandler {
  @Get()
  @HttpCode(200)
  getConfig() {
    const cnf = process.env;
    const prefix = 'APP_';

    const c = Object.keys(cnf)
      .filter(key => key.startsWith(prefix))
      .reduce((result: any, key) => {
        const strippedKey = key.replace(new RegExp(`^${prefix}`), '');
        result[strippedKey] = cnf[key];

        return result;
      }, {});
    const appConfig = config.appConfig;

    return { ...appConfig, ...c };
  }
}

export default enhancedHandler(ConfigHandler);
