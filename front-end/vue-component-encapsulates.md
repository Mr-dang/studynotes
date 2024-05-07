# vue组件封装

vue组件封装，涉及到四部分内容:

- 属性传递 使用 `$attrs`
- 监听事件传递 使用 `$listeners`
- slot传递，使用 `$slots`
- ref传递，使用 `$refs`

## vue2组件封装示例

```vue
<template>
  <div>
    <RealCom v-bind="$attrs" v-on="$listeners" ref="realCom">
      <template v-for="(_, name) in $slots" :key="name" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData">
      </template>
    </RealCom>
  </div>
</template>
<script>
export default {
  name: 'MyRealCom',
  mounted() {
    for (const key in this.$refs.realCom) {
      this[key] = this.$refs.realCom[key];
    }
  },
}
</script>
```


## vue3组件封装示例

```vue
<template>
  <div>
    <AInput v-bind="$attrs" ref="realInput">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData || {}" />
      </template>
    </AInput>
  </div>
</template>

<script setup lang="ts">
import { useSlots, useAttrs, onMounted, ref, defineExpose } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
const realInput = ref()

defineExpose({ realInput })

onMounted(() => {
  console.log('[DangInput]slots:', slots);
  console.log('[DangInput]attrs:', attrs);
  for (const key in realInput.value) {
    console.log(key);
  }
})
</script>
```
