# TypeScript笔记

## esmodule项目中使用ts
1. 安装 `tsc` 工具
2. 安装 `typescript` 包
3. 安装 `@types/node` 包

默认编译出来的文件引用不带`.js`后缀，需要在`tsconfig.json`中配置：
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

在`.ts`文件中需要显示导入`.js`文件：
```javascript
// index.ts
import utils from './utils.js';
```

这样编译出来的js文件在引入别的文件时才会有`.js`后缀, 否则在`node`环境下会报错.

## 获取组件的类型

使用 `InstanceType<typeof ComName>`：

```javascript
import { ref, type Ref } from 'vue';
import { AButton } from 'ant-design-vue';
const buttonRef: Ref<InstanceType<typeof AButton>> = ref();
```

封装成 `composable`:

```javascript
import { ref } from 'vue';

export function useCompRef<T extends abstract new (...args: any) => any>() {
  return ref<InstanceType<T>();
}

// usage:
import { AButton } from 'ant-design-vue';
const btnRef1 = useCompRef<typeof AButton>;

export function useCompRef1<T extends abstract new (...args: any) => any>(_comp: T) {
  return ref<InstanceType<T>();
}

// usage:
const btnRef2 = useCompRef(AButton);
```
