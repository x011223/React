## 深入JSX
> 大写开头的 JSX 标签表示一个 React 组件。这些标签将会被编译为同名变量并被引用，
> 所以如果你使用了 <Foo /> 表达式，则必须在作用域中先声明 Foo 变量。
1. 本质上来讲，JSX 只是为 React.createElement(component, props, ...children) 方法提供的语法糖。
例如
```
<MyButton color="blue" shadowSize={2}>
    Click Me
</MyButton>
```
编译为
```
React.createElement(
    MyButton,
    {color: 'blue', shadowSize: 2},
    'Click Me'
)
```
> 如果没有子代，你还可以使用自闭合标签 类似于HTML中的 ` <img /> `

2. 点表示法
> 例如，有一个名为 MyComponents.DataPicker 的组件
```
<!-- 这个引用是必须的 -->
import React from 'react';

const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>Imagine a {props.color} datepicker here.</div>;
    }
}

function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}
```

3. 大写开头命名组件
4. 组件的内容编写顺序如下:    
    static 开头的类属性，如 defaultProps、propTypes。
    构造函数，constructor。
    getter/setter（还不了解的同学可以暂时忽略）。
    组件生命周期。
    _ 开头的私有方法。
    事件监听方法，handle*。
    render__ 开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render__ 开头。
    render() 方法。

## 高阶组件
> 高阶组件（HOC）是react中对组件逻辑进行重用的高级技术。但高阶组件本身并不是React API。它只是一种模式，这种模式是由react自身的组合性质必然产生的。

1. 高阶组件是一个函数，接收一个组件为参数并返回一个新的组件(高阶组件是一个函数而不是组件)
    - 对比组件将props属性转变成UI，高阶组件则是将一个组件转换成另一个新组件。

2. 高阶组件的作用是用于代码复用，可以把组件之间可复用的代码、逻辑抽离到高阶组件当中。新的组件和传入的组件通过 props 传递信息。

## context
1. 一个组件的 context 只有它的子组件能够访问，它的父组件是不能访问到的

2. 某个组件只要往自己的 context 里面放了某些状态，这个组件之下的所有子组件都直接访问这个状态而不需要通过中间组件的传递。

3. 如果你要给组件设置 context，那么 childContextTypes 是必写的。

4. 子组件要获取 context 里面的内容的话，就必须写 contextTypes 来声明和验证你需要获取的状态的类型，它也是必写的，如果你不写就无法获取 context 里面的状态。

5. context 里面的数据能被随意接触就能被随意修改

## 纯函数
> 一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。
1. 函数的返回结果只依赖于它的参数。

2. 函数执行过程里面没有副作用。

3. 一个函数执行过程对产生了外部可观察的变化那么就说这个函数是有副作用的。

```
const a = 1
const foo = (x, b) => x + b
foo(1, 2) // => 3
```