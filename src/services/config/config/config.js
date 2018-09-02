import devConfig from './config.dev';
import sitConfig from './config.sit';
import uatConfig from './config.uat';
import prodConfig from './config.prod';

export default {
    ...devConfig,
    ...(process.env.BUILD_VARIANT === 'sit' ? sitConfig : {}),
    ...(process.env.BUILD_VARIANT === 'uat' ? uatConfig : {}),
    ...(process.env.BUILD_VARIANT === 'prod' ? prodConfig : {}),
};
