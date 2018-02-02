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
