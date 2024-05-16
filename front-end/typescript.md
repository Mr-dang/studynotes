# TypeScript笔记

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
