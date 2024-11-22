# CSS新特性

## aspect-ratio

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
