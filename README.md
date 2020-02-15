# egg-sentry-node

## 开启插件

```js
// {app_root}/config/plugin.js
exports.sentry = {
  enable: true,
  package: 'egg-sentry-node',
};
```

## 使用场景

### 根据环境配置

```
// config/plugin.js
exports.sentry = {
  enable: false,
  package: 'egg-sentry-node',
  env: ['test', 'prod'] // 只有在指定运行环境才能开启，会覆盖插件自身 package.json 中的配置
};
```

## 详细配置

```js
// {app_root}/config/config.default.js
'use strict';

module.exports = appInfo => {
  return {
    sentry: {
      dsn: '', // sentry dsn
    },
  };
};
```

## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## License

[MIT](LICENSE)
