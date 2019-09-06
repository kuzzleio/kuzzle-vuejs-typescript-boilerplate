import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import { LogLevels } from 'vuejs-logger/dist/vue-logger/enum/log-levels';
import { ILoggerOptions } from 'vuejs-logger/dist/vue-logger/interfaces/logger-options';
const isProduction = process.env.NODE_ENV === 'production';

const options = {
  isEnabled: true,
  logLevel: isProduction ? LogLevels.ERROR : LogLevels.DEBUG,
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
} as ILoggerOptions;

Vue.use(VueLogger, options);
