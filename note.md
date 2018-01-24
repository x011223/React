# React 学习笔记

## JSX
1. 推荐在 JSX 代码的外面扩上一个小括号，这样可以防止 分号自动插入 的bug.

2. JSX 防注入 攻击
    - React DOM 在渲染之前默认会 过滤 所有传入的值。
    - 它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。
    - 这样可以有效地防止 XSS(跨站脚本) 攻击。

3. Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用。
    - 方法首先会进行一些避免bug的检查，之后会返回一个类似下面例子的对象：即“React 元素”
        ```     
        const element = {
            type: 'h1',
            props: {
                className: 'greeting',
                children: 'Hello, world'
            }
        };   
        
        ```

## 元素渲染
1. 要将React元素渲染到根DOM节点中，我们通过把它们都传递给 ReactDOM.render() 的方法来将其渲染到页面上

2. React 元素都是immutable 不可变的。当元素被创建之后，你是无法改变其内容或属性的。

3. React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。

## 组件 & props
>   组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。
>   组件的返回值只能有一个根元素。组件可以在它的输出中引用其它组件。 与vue中 template 类似

1. 函数定义组件
    - 只有 render 方法的组件 可以定义为函数定义组件

2. 组件渲染
    - React元素可以是用户自定义的组件：例如: 

```
    const element = <Welcome name="Sara" />
```

3. 当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件,这个对象称之为“props”。

    - 例如,这段代码会在页面上渲染出”Hello,Sara”:
        > 组件名称必须以大写字母开头。

    ```
        function Welcome(props) {
            return <h1>Hello, {props.name}</h1>;
        }

        const element = <Welcome name="Sara" />;
        ReactDOM.render(
            element,
            document.getElementById('root')
        );
    ```
    > 该 例子 经过了 以下 过程
    
        (1)     我们对<Welcome name="Sara" />元素调用了ReactDOM.render()方法。
    
        (2)     React将{name: 'Sara'}作为props传入并调用Welcome组件。
    
        (3)     Welcome组件将<h1>Hello, Sara</h1>元素作为结果返回。
    
        (4)     React DOM将DOM更新为<h1>Hello, Sara</h1>。
    
## props 的 只读性
> 无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。

1. 所有的React组件必须像纯函数那样使用它们的props。
    > 纯函数: 没有改变它自己的输入值，当传入的值相同时，总是会返回相同的结果。