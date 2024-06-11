# vue技巧

## 使用vue cdn的示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js" integrity="sha512-FA/meM8xgk2yf3bGWk9YsS5eSuV9MAZGghaJF+4EnwGJOR27xthS4PGl09jH49WHD6DUxStBfvg+500N7wrY6A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.5.4/vue-router.min.js" integrity="sha512-zxWuRslhjyZyRAYInXTNl4vC/vBBwLQuodFnPmvYAEvlv9XCCfi1R3KqBCsT6f9rk56OetG/7KS9dOfINL1KCQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <div id="app">
    <div>App</div>
    <router-view></router-view>
  </div>
  <script>
    const ParentCom = Vue.component('ParentCom', {
      template: `<div>
        <div>parent</div>
        <div>
          <button v-if="$route.name !== 'childA'" @click="goChildA">child-a</button>
          <button v-if="$route.name !== 'childB'" @click="goChildB">child-b</button>
          <router-view></router-view>
        </div>
      </div>`,
      mounted() {
        console.log('[Parent]mounted', this.$route);
      },
      methods: {
        goChildA() {
          this.$router.push({
            path: '/parent/child-a',
          });
        },
        goChildB() {
          this.$router.push({
            path: '/parent/child-b',
          });
        },
      },
    });
    const ChildA = Vue.component('ChildA', {
      template: `<div>childA</div>`
    });
    const ChildB = Vue.component('ChildB', {
      template: `<div>childB</div>`
    });
    Vue.use(VueRouter);
    const routes = [
      {
        name: 'parent',
        path: '/parent',
        component: ParentCom,
        children: [
          { name: 'childA', path: 'child-a', component: ChildA },
          { name: 'childB', path: 'child-b', component: ChildB },
        ]
      }
    ];
    new Vue({
      el: '#app',
      router: new VueRouter({
        mode: 'hash',
        base: location.pathname,
        routes,
      }),
      mounted() {
        this.$router.push({ name: 'parent' });
      },
    });
  </script>
</body>
</html>
```

## vue组件封装

vue组件封装，涉及到四部分内容:

- 属性传递
- 监听事件传递
- slot传递
- ref传递

### vue2组件封装示例

- 属性传递 使用 `$attrs`
- 监听事件传递 使用 `$listeners`
- slot传递，使用 `$slots`
- ref传递，使用 `$refs`

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

### vue3组件封装示例

- 属性传递和监听事件传递，使用 `$attrs`
- slot传递，使用 `$slots`
- ref传递，使用 `defineExpose`

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
