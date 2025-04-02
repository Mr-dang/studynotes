# CSS笔记

## CSS新特性

### aspect-ratio

```html
<div>
  <div class="block block1 aspect-ratio-16-9">
  </div>
  <div class="block block2 aspect-ratio-4-3">
  </div>
</div>

<style>
.aspect-ratio-16-9 {
  aspect-ratio: 16/9;
}
.aspect-ratio-4-3 {
  aspect-ratio: 4/3;
}

.block {
  width: 200px;
  display: inline-block;
}
.block1 {
  background-color: red;
}

.block2 {
  background-color: blue;
  margin-left: 40px;
}
</style>
```

<div>
  <div class="block block1 aspect-ratio-16-9">
  </div>
  <div class="block block2 aspect-ratio-4-3">
  </div>
</div>

参考链接:

- [12 Modern CSS One-Line Upgrades](https://moderncss.dev/12-modern-css-one-line-upgrades/)

<style>
.aspect-ratio-16-9 {
  aspect-ratio: 16/9;
}
.aspect-ratio-4-3 {
  aspect-ratio: 4/3;
}

.block {
  width: 200px;
  display: inline-block;
}
.block1 {
  background-color: red;
}

.block2 {
  background-color: blue;
  margin-left: 40px;
}
</style>

## 不常见的css属性

### 行盒的截断属性

```css
span.highlight {
  background: linear-gradient(90deg, rgba(255, 255, 0, 0.2) 0%, rgba(255, 255, 0, 0) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  box-decoration-break: clone; // slice 截断，clone 保留
}
```

## sass/scss

### @include、@mixin、@content
```scss
// media.scss
// mixin函数 可以给参数设置默认值
@mixin flex($layout = center) {
  display: flex;
  justify-content: $layout;
  align-items: $layout;
  @content; // 自定义内容，透传
}

// index.scss
@use './media.scss';
.container {
  @include media.flex(center);
}
.box {
  @include media.flex(start) {
    height: 300px;
  };
}
```

### 用sass简化媒介查询

```scss
// media.scss
$breakPoints: (
  'mobile': (320px, 480px),
  'pad': (481px, 768px),
  'smalllaptop': (769px, 1024px),
  'laptop': (1025px, 1280px),
  'desktop': (1281px, 1920px),
  'wide': (1921px, 2560px),
  'ultrawide': (2561px, 3840px),
  '4k': (3841px, 4096px),
  '8k': (4097px, 5120px),
  'other': 5121px,
)

@mixin responseTo($device) {
  $config: map-get($breakPoints, $device);
  @if type-of($config) == 'list' {
    @media screen and (min-width: nth($config, 1)) and (max-width: nth($config, 2)) {
      @content;
    }
  } @else {
    @media screen and (min-width: $config) {
      @content;
    }
  }
}

@mixin responseTo($device) {
  @each $key, $value in $breakPoints {
    @if $device == $key {
      @media screen and (min-width: nth($value, 1)) and (max-width: nth($value, 2)) {
        @content;
      }
    }
  }
} // 响应式媒体查询

// 响应式媒体查询 deprecated
@mixin responseTo1($device) {
  @if $device == mobile {
    @media screen and (max-width: 480px) {
      @content;
    }
  } @else if $device == pad {
    @media screen and (min-width: 481px) and (max-width: 1024px) {
      @content;
    }
  } @else if $device == pc {
    @media screen and (min-width: 1025px) {
      @content;
    }
  }
}

// index.scss
@use './media.scss';

.container {
  @include media.responseTo(pad) {
    background-color: red;
  }
}
```
