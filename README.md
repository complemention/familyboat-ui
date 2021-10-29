familyboat-ui由独立的两部分组成：

- 布局（Layouts）
- 组件（Components）

## 布局

## 组件

## 变量

familyboat采用双层主题模式，即全局变量指导组件变量。它们各自遵循一定的规范。

### 全局变量

全局变量是为了维护一致性，需遵守的规则如下：

- 采用 `global` 作为前缀，遵循下列公式：
`--fb-global--concept--PropertyCamelCase--modifier--state`。
  - `concept`是指一些概念性的东西，比如`spacer`获取`main-title`。
  - `PropertyCamelCase`是指大驼峰形式的CSS属性值，比如`BackgroundColor`或者`FontSize`。
  - `modifier`是指一些修饰作用的词汇，比如`sm`或者`lg`。
  - `state`是指组件的某种状态，比如`hover`或者`expanded`。
- 上述词汇均是概念性的东西，因此永远不要和某个元素或者组件绑定在一起。所以第一个是错误的范例：
`--fb-global--h1--FontSize`，第二个是正确的范例： `--fb-global--FontSize--3xl`.

设置全局变量的范例：

```scss
  // --fb-global--concept--size
  --fb-global--spacer--lg: .5rem;
  --fb-global--spacer--xl: 1rem;
  --fb-global--spacer--2xl: 2rem;

  // --fb-global--PropertyCamelCase--modifier
  --fb-global--FontSize--3xl: 2rem;
  --fb-global--FontSize--2xl: 1.8rem;
  --fb-global--FontSize--lg: 1rem;

  // --fb-global--concept--PropertyCamelCase--state
  --fb-global--link--TextDecoration--hover: #ccc;

  // --fb-global--PropertyCamelCase--modifier
  --fb-global--Color--100: #000;

  // --fb-global--concept--modifier
  --fb-global--primary-color--100: #00f;
```

### 组件变量

The second layer is scoped to themeable component custom properties. This setup allows for consistency across components, generates a common language between designers and developers, and gives granular control to authors. The rules are as follows:

- They follow this general formula `--fb-c-block[__element][--modifier][--state][--breakpoint][--pseudo-element]--PropertyCamelCase`.
  - `--fb-c-block` refers to the block, usually the component or layout name (i.e., `--fb-c-alert`).
  - `__element` refers to the element inside of the block (i.e., `__title`).
  - `--modifier` refers to a modifier class such as `.pf-m-danger`, and is prefixed with `m-` in the component variable (i.e., `--m-danger`).
  - `--state` is something like `hover` or `active`.
  - `--breakpoint` is a media query breakpoint such as `sm` for `$pf-global--breakpoint--xs`.
  - `--pseudo-element` is one of either `before` or `after`.
- The value of a component variable is **always** defined by a global variable.
- It's possible to include multiple elements, modifiers, states, and breakpoints in a single component variable.
- The order of elements, modifiers, states, and breakpoints in the variable name should match the selector order.

For example:

```scss
// Component scoped variables are always defined by global variables
--fb-c-alert--Padding: var(--fb-global--spacer--xl);
--fb-c-alert--hover--BackgroundColor: var(--fb-global--BackgroundColor--200);
--fb-c-alert__title--FontSize: var(--fb-global--FontSize--2xl);

// --block--PropertyCamelCase
.pf-c-alert {
  padding: var(--fb-c-alert--Padding);
}

// --block--state--PropertyCamelCase
.pf-c-alert {
  &:hover {
    background-color: var(--fb-c-alert--hover--BackgroundColor);
  }
}

// --block__element--PropertyCamelCase
.pf-c-alert__title {
  font-size: var(--fb-c-alert__title--FontSize);
}

// A more complex example
.pf-c-switch {
  @media (max-width: $pf-global--breakpoint--sm) {
    .pf-c-switch__input {
      &:disabled {
        ~ .pf-c-switch__toggle {
          &::before {
            background-color: var(--fb-c-switch--sm__input--disabled__toggle--before--BackgroundColor);
          }
        }
      }
    }
  }
}
```

### 类名
