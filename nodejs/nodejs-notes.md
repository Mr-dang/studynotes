# nodejs笔记

## 新特性

### HTTP请求超时自动取消

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000) // Built-in timeout support
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TimeoutError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}
```

### HTTP请求手动取消

```javascript
// Cancel long-running operations cleanly
const controller = new AbortController();

// Set up automatic cancellation
setTimeout(() => controller.abort(), 10000);

try {
  const data = await fetch('https://slow-api.com/data', {
    signal: controller.signal
  });
  console.log('Data received:', data);
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled - this is expected behavior');
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### 内置的测试框架

```javascript
// test/math.test.js
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { add, multiply } from '../math.js';

describe('Math functions', () => {
  test('adds numbers correctly', () => {
    assert.strictEqual(add(2, 3), 5);
  });

  test('handles async operations', async () => {
    const result = await multiply(2, 3);
    assert.strictEqual(result, 6);
  });

  test('throws on invalid input', () => {
    assert.throws(() => add('a', 'b'), /Invalid input/);
  });
});
```

运行测试用例的命令:

```shell
# Run all tests with built-in runner
node --test

# Watch mode for development
node --test --watch

# Coverage reporting (Node.js 20+)
node --test --experimental-test-coverage
```

### 监听模式和环境变量管理

```json
{
  "name": "modern-node-app",
  "type": "module",
  "engines": {
    "node": ">=20.0.0"
  },
  "scripts": {
    "dev": "node --watch --env-file=.env app.js",
    "test": "node --test --watch",
    "start": "node app.js"
  }
}
```

### 内置安全和性能监控模块

```shell
# Run with restricted file system access
node --experimental-permission --allow-fs-read=./data --allow-fs-write=./logs app.js

# Network restrictions
node --experimental-permission --allow-net=api.example.com app.js
# Above allow-net feature not avaiable yet, PR merged in node.js repo, will be available in future release
```

```javascript
import { PerformanceObserver, performance } from 'node:perf_hooks';

// Set up automatic performance monitoring
const obs = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 100) { // Log slow operations
      console.log(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
    }
  }
});
obs.observe({ entryTypes: ['function', 'http', 'dns'] });

// Instrument your own operations
async function processLargeDataset(data) {
  performance.mark('processing-start');

  const result = await heavyProcessing(data);

  performance.mark('processing-end');
  performance.measure('data-processing', 'processing-start', 'processing-end');

  return result;
}
```

### 分发和部署

可以打包成一个可执行文件：

```shell
# Create a self-contained executable
node --experimental-sea-config sea-config.json
```

`sea-config.json` 内容:

```json
{{
  "main": "app.js",
  "output": "my-app-bundle.blob",
  "disableExperimentalSEAWarning": true,
  "assets": [
    {
      "glob": "**/*",
      "cwd": "./"
    }
  ]
}
```

### 导入地图和内部依赖解析

`package.json`文件中：

```json
{
  "type": "module",
  "imports": {
    "#config": "./src/config/index.js",
    "#utils/*": "./src/utils/*.js",
    "#db": "./src/database/connection.js"
  }
}
```

支持动态导入：

```javascript
// Clean internal imports that don't break when you reorganize
import config from '#config';
import { logger, validator } from '#utils/common';
import db from '#db';

// Load features based on configuration or environment
async function loadDatabaseAdapter() {
  const dbType = process.env.DATABASE_TYPE || 'sqlite';

  try {
    const adapter = await import(`#db/adapters/${dbType}`);
    return adapter.default;
  } catch (error) {
    console.warn(`Database adapter ${dbType} not available, falling back to sqlite`);
    const fallback = await import('#db/adapters/sqlite');
    return fallback.default;
  }
}

// Conditional feature loading
async function loadOptionalFeatures() {
  const features = [];

  if (process.env.ENABLE_ANALYTICS === 'true') {
    const analytics = await import('#features/analytics');
    features.push(analytics.default);
  }

  if (process.env.ENABLE_MONITORING === 'true') {
    const monitoring = await import('#features/monitoring');
    features.push(monitoring.default);
  }

  return features;
}

```

参考链接: [Modern Node.js Patterns for 2025](https://kashw1n.com/blog/nodejs-2025/)

## 常见问题

###依赖安装失败

`nodejs` 在 17及以上版本安装依赖失败，可尝试加上如下配置:

```javascript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
```

在 `.npmrc` 文件中加上如下配置:

```shell
node-options=--openssl-legacy-provider
```

## 常用技巧

### 设置项目根目录

#### ESM项目

在 `ESM` 项目中，可在根目录所在的 `index.mjs` 中使用如下代码设置项目根目录:

```javascript
process.env.ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
```

`import.meta.url` 使用如下:

```javascript
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const IMAGE_FOLDER_PATH = './images';

console.log(import.meta.url);
// file:///Users/alice/test.mjs
console.log(fileURLToPath(import.meta.url));
// /Users/alice/test.mjs
console.log(path.dirname(fileURLToPath(import.meta.url)));
// /Users/alice
console.log(path.resolve(process.env.ROOT_DIR, IMAGE_FOLDER_PATH, 'abbc.jpg'));
// /Users/alice/images/abbc.jpg
```

#### commonjs项目

```javascript
process.env.ROOT_DIR = __dirname;
```
