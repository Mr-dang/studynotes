# 自定义元素

## 自定义元素`filterable-select`示例:

```javascript
class FilterableSelect extends HTMLElement {
  static get observedAttributes() {
    return ["option-type"];
  }

  static defaultEmptyText = '暂无数据'
  static defaultPlaceholder = '请输入内容，过滤下拉选项'

  static createEmptyElement(text) {
    const el = document.createElement('div');
    el.classList.add('empty');
    el.textContent = text || FilterableSelect.defaultEmptyText;
    return el;
  }

  static createBaseElements(param) {
    const {
      onIconClick,
      onInput,
      onFocus,
      onBlur,
      onListWrapperClick,
      placeholder,
    } = param;
    const container = document.createElement("div");
    container.classList.add('container');

    const elValeCntent = document.createElement("div");
    elValeCntent.classList.add("value-content");
    elValeCntent.classList.add("text-ellipsis");

    const input = document.createElement("input");
    input.setAttribute('placeholder', placeholder || FilterableSelect.defaultPlaceholder);
    input.setAttribute('type', 'text');
    input.addEventListener('input', onInput, false);
    input.addEventListener('focus', onFocus, false);
    input.addEventListener('blur', onBlur, false);

    const icon = document.createElement("span");
    icon.classList.add('icon-clear');
    icon.addEventListener('click', onIconClick, false);

    const listWrapper = document.createElement("div");
    listWrapper.classList.add('list-wrapper');
    listWrapper.addEventListener('click', onListWrapperClick, true);

    const emptyEl = FilterableSelect.createEmptyElement();
    listWrapper.appendChild(emptyEl);

    container.append(elValeCntent, input, icon, listWrapper);
    return container;
  }

  static validateOptionType(optionType) {
    if (!['text', 'object'].includes(optionType)) {
      throw new Error('Illegal value for option-type, expected one of ["text", "object"], but got', optionType);
    }
    return true;
  }

  static getValueByValueType(value, valueType) {
    if (valueType === 'number') {
      return parseInt(value, 10);
    }
    if (valueType === 'boolean') {
      return value === 'true';
    }
    return value;
  }

  /**
   * 创建列表项元素
   * @param {string} text 列表项的文本内容
   * @param {string|number|boolean} value 列表项的值
   * @param {string} keyword 过滤的文本
   * @returns
   */
  static createListItem(text, value, keyword, formItemValue) {
    const elListItem = document.createElement('div');
    elListItem.classList.add('list-item');
    elListItem.classList.add('text-ellipsis');
    if (formItemValue === value) {
      elListItem.classList.add('selected');
    }
    elListItem.dataset.value = value;
    elListItem.dataset.valueType = typeof value;
    elListItem.dataset.valueText = text;

    if (keyword) {
      const upperText = text.toUpperCase();
      const startIndex = upperText.indexOf(keyword);
      if (startIndex === -1) {
        return null;
      }
      if (startIndex > 0) {
        const span1 = document.createElement('span');
        span1.textContent = text.slice(0, startIndex);
        elListItem.appendChild(span1);
      }
      const bold = document.createElement('b');
      bold.classList.add('color-red');
      bold.textContent = text.slice(startIndex, startIndex + keyword.length);
      elListItem.appendChild(bold);

      if (startIndex + keyword.length < text.length) {
        const span3 = document.createElement('span');
        span3.textContent = text.slice(startIndex + keyword.length);
        elListItem.appendChild(span3);
      }
      return elListItem;
    }

    elListItem.textContent = text;
    return elListItem;
  }

  static getListItemElement(el) {
    let _el = el;
    while (_el) {
      if (_el.classList.contains('list-item')) {
        return el;
      }
      _el = _el.parentElement;
    }
    return undefined;
  }

  constructor() {
    super();
    this.onInput = this.onInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onIconClick = this.onIconClick.bind(this);
    this.onListWrapperClick = this.onListWrapperClick.bind(this);
    this.attributeChangedCallback = this.attributeChangedCallback.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.renderListContent = this.renderListContent.bind(this);
    this.renderEmptyContent = this.renderEmptyContent.bind(this);
    this.renderListItems = this.renderListItems.bind(this);
    this.updateIconClearStyle = this.updateIconClearStyle.bind(this);

    const param = {
      onIconClick: this.onIconClick,
      onInput: this.onInput,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onListWrapperClick: this.onListWrapperClick,
      placeholder: this.getAttribute('placeholder'),
    }

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    const div = this.constructor.createBaseElements(param);
    style.textContent = this.getStyle();
    shadow.appendChild(style);
    shadow.appendChild(div);
    this.__blur_timer = null;
    this.options = [];
    this.value = '';
  }

  get valueText() {
    const elValueCntent = this.shadowRoot.querySelector('.value-content');
    return elValueCntent ? elValueCntent.textContent : '';
  }

  set valueText(newVal) {
    const elValueCntent = this.shadowRoot.querySelector('.value-content');
    if (elValueCntent) {
      elValueCntent.textContent = newVal;
    }
    const elInput = this.shadowRoot.querySelector('input');
    if (elInput) {
      if (newVal) {
        elInput.removeAttribute('placeholder');
        elValueCntent.style.display = 'block';
      } else {
        elInput.setAttribute('placeholder', this.getAttribute('placeholder') || this.constructor.defaultPlaceholder);
      }
    }
  }

  onListWrapperClick(evt) {
    const elListItem = this.constructor.getListItemElement(evt.target);
    if (elListItem) {
      const { value, valueType, valueText } = elListItem.dataset;
      this.value = this.constructor.getValueByValueType(value, valueType);
      this.valueText = valueText;
      this.renderListContent();
    }
  }

  setOptions(newOptions) {
    this.options = newOptions;
    this.renderListContent();
  }

  renderListContent() {
    if (Array.isArray(this.options) && this.options.length > 0) {
      this.renderListItems();
    } else {
      this.renderEmptyContent();
    }
  }

  renderEmptyContent() {
    const listWrapper = this.shadowRoot.querySelector('.list-wrapper');
    const el = this.constructor.createEmptyElement();
    listWrapper.replaceChildren(el);
  }

  renderListItems() {
    const optionType = this.getAttribute('option-type');
    const valueKey = this.getAttribute('value-key') || 'value';
    const textKey = this.getAttribute('text-key') || 'label';
    const elList = [];
    const keyword = this.searchText.trim().toUpperCase();
    const formValue = this.value;
    for (const item of this.options) {
      const text = String(optionType === 'object' ? item[textKey] : item).trim();
      const value = optionType === 'object' ? item[valueKey] : item;
      const elListItem = this.constructor.createListItem(text, value, keyword, formValue);
      if (elListItem) {
        elList.push(elListItem);
      }
    }

    if (elList.length > 0) {
      const listWrapper = this.shadowRoot.querySelector('.list-wrapper');
      if (!listWrapper) { return; }
      listWrapper.replaceChildren(...elList);
    }
  }

  get searchText() {
    const inputEl = this.shadowRoot.querySelector('input');
    return inputEl ? inputEl.value.trim() : '';
  }

  set searchText(newText) {
    if (typeof newText === 'string') {
      const inputEl = this.shadowRoot.querySelector('input');
      if (inputEl) {
        inputEl.value = newText;
        this.renderListContent();
      }
    } else {
      throw new Error('expected string for searchText,')
    }
  }

  updateIconClearStyle(inputText) {
    const iconClear = this.shadowRoot.querySelector('.icon-clear');
    if (iconClear) {
      iconClear.style.display = inputText ? 'inline-flex' : 'none';
    }
  }

  onInput(evt) {
    this.updateIconClearStyle(evt.target.value);
    this.renderListContent();
  }

  onFocus(evt) {
    const listWrapper = this.shadowRoot.querySelector('.list-wrapper');
    if (listWrapper) {
      listWrapper.style.display = 'block';
      this.renderListContent();
    }
    const elValueContent = this.shadowRoot.querySelector('.value-content');
    if (elValueContent) {
      elValueContent.style.display = 'none';
    }
    evt.target.setAttribute('placeholder', this.getAttribute('placeholder') || this.constructor.defaultPlaceholder);
  }

  onBlur(evt) {
    this.__blur_timer = setTimeout(() => {
      const listWrapper = this.shadowRoot.querySelector('.list-wrapper');
      if (listWrapper) {
        listWrapper.style.display = 'none';
      }
      this.searchText = '';
      this.updateIconClearStyle(this.searchText);
      if (this.value) {
        const elInput = this.shadowRoot.querySelector('input');
        elInput.removeAttribute('placeholder');
        const elValueCntent = this.shadowRoot.querySelector('.value-content');
        if (elValueCntent) {
          elValueCntent.style.display = 'block';
        }
      }
      this.__blur_timer = null;
    }, 200);
  }

  onIconClick(evt) {
    const input = this.shadowRoot.querySelector('input');
    input.value = '';
    clearTimeout(this.__blur_timer);
    input.focus();
    evt.target.style.display = 'none';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'option-type') {
      this.constructor.validateOptionType(newValue);
    }
  }

  getStyle() {
    return `
    .container {
      position: relative;
      background-color: #fff;
      width: 500px;
    }
    input {
      box-sizing: border-box;
      margin: 0;
      padding: 2px 20px 2px 8px;
      color: rgba(0, 0, 0, 0.88);
      font-size: 14px;
      line-height: 1.5;
      list-style: none;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      position: relative;
      display: inline-block;
      width: 100%;
      min-width: 0;
      background-color: transparent;
      background-image: none;
      border-width: 1px;
      border-style: solid;
      border-color: #d9d9d9;
      border-radius: 6px;
      transition: all 0.2s;
      height: 26px;
      line-height: 24px;
    }
    input:hover {
      border-color: #4096ff;
      border-inline-end-width: 1px;
    }
    input:focus {
      border-color: #4096ff;
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      border-inline-end-width: 1px;
      outline: 0;
    }
    .icon-clear {
      display: none;
      overflow: hidden;
      position: absolute;
      height: 26px;
      width: 20px;
      right: 0;
      top: 0;
      z-index: 1;
      cursor: pointer;
    }
    .icon-clear:hover::after {
      color: #4096ff;
    }
    .icon-clear::after {
      transition: all 0.2s;
      position: absolute;
      content: '+';
      color: #ccc;
      font-size: 24px;
      line-height: 1;
      display: inline-flex;
      right: 2px;
      top: -1px;
      height: 100%;
      transform: rotateZ(45deg);
      align-items: center;
    }
    .list-wrapper {
      display: none;
      max-height: 400px;
      overflow: auto;
      position: absolute;
      left: 0;
      top: 30px;
      right: 0;
      box-sizing: border-box;
      margin: 0;
      padding: 4px;
      font-variant: initial;
      background-color: #fff;
      border-radius: 8px;
      outline: none;
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }
    .list-item {
      line-height: 24px;
      height: 24px;
      cursor: pointer;
    }
    .text-ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .list-item:not(.selected):hover {
      background-color: #e4e809;
    }
    .list-item.selected {
      background-color: #4096ff;
      font-weight: 600;
    }
    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
    }
    .color-blue {
      color: #4096ff;
    }
    .color-red {
      color: red;
    }
    .value-content {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      line-height: 26px;
      height: 26px;
      padding: 0 10px;
    }
    `;
  }
};

window.customElements.define('filterable-select', FilterableSelect);
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .flex { display: flex; }
    .justify-center { justify-content: center; }
    .ml10 { margin-left: 10px; }
    filterable-select { flex: 0 0 500px; }
    button { flex: 0 0 auto; }
  </style>
</head>
<body>
  <div class="flex justify-center">
    <filterable-select empty-text="空空如也" option-type="object" value-key="id" text-key="title"></filterable-select>
    <button id="set-options-one" class="ml10">设置一层列表</button>
    <button id="set-options-two" class="ml10">设置两层列表</button>
    <button id="clear-options" class="ml10">清空列表</button>
  </div>

  <script src="js/filterable-select.js"></script>
  <script src="js/filterable-select-main.js"></script>
</body>
</html>
```

```javascript
// filterable-select-main.js
const filterableSelect = document.querySelector('filterable-select');
console.log('filterableSelect:', filterableSelect);

const btn1 = document.getElementById('set-options-one');
let btn1Loading = false;
btn1.addEventListener('click', evt => {
  if (btn1Loading) { return; }
  btn1Loading = true;
  filterableSelect.setAttribute("loading", "true");
  const text = evt.target.textContent;
  evt.target.textContent = '加载中...';
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
    evt.target.textContent = text;
    filterableSelect.setAttribute('option-type', 'text');
    filterableSelect.setOptions(json.map(t => t.name));
    filterableSelect.removeAttribute("loading");
    btn1Loading = false;
  })
  .catch(() => {
    evt.target.textContent = text;
    btn1Loading = false;
    filterableSelect.removeAttribute("loading");
  });
});

const btn2 = document.getElementById('set-options-two');
let btn2Loading = false;
btn2.addEventListener('click', evt => {
  if (btn2Loading) { return; }
  btn2Loading = true;
  filterableSelect.setAttribute("loading", "true");
  const text = evt.target.textContent;
  evt.target.textContent = '加载中...';
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => {
    evt.target.textContent = text;
    filterableSelect.setAttribute('label-key', 'title');
    filterableSelect.setAttribute('value-key', 'id');
    filterableSelect.setAttribute('option-type', 'object');
    filterableSelect.setOptions(json);
    filterableSelect.removeAttribute("loading");
    btn2Loading = false;
  })
  .catch(() => {
    evt.target.textContent = text;
    btn2Loading = false;
    filterableSelect.removeAttribute("loading");
  });
});

const btn3 = document.getElementById('clear-options');
btn3.addEventListener('click', evt => {
  filterableSelect.setOptions([]);
});
```
