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

## REDUCER
1. createStore 接受一个叫 reducer 的函数作为参数，这个函数规定是一个纯函数，它接受两个参数，一个是 state，一个是 action。

2. 如果没有传入 state 或者 state 是 null，那么它就会返回一个初始化的数据。如果有传入 state 的话，就会根据 action 来“修改“数据，但其实它没有、也规定不能修改 state，而是要通过把修改路径的对象都复制一遍，然后产生一个新的对象返回。如果它不能识别你的 action，它就不会产生新的数据，而是（在 default 内部）把 state 原封不动地返回。

3. reducer 是不允许有副作用的。你不能在里面操作 DOM，也不能发 Ajax 请求，更不能直接修改 state，它要做的仅仅是 —— 初始化和计算新的 state。

4. 通用redux模式
```
// 定一个 reducer
function reducer (state, action) {
  /* 初始化 state 和 switch case */
}

// 生成 store
const store = createStore(reducer)

// 监听数据变化重新渲染页面
store.subscribe(() => renderApp(store.getState()))

// 首次渲染页面
renderApp(store.getState()) 

// 后面可以随意 dispatch 了，页面自动更新
store.dispatch(...)
```

## Smart 和 Dumb 
1. 根据是否需要高度的复用性，把组件划分为 Dumb 和 Smart 组件，约定俗成地把它们分别放到 components 和 containers 目录下。

2. Dumb 基本只做一件事情 —— 根据 props 进行渲染。而 Smart 则是负责应用的逻辑、数据，把所有相关的 Dumb（Smart）组件组合起来，通过 props 控制它们。

3. Smart 组件可以使用 Smart、Dumb 组件；而 Dumb 组件最好只使用 Dumb 组件，否则它的复用性就会丧失。