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


## state 和 生命周期
> state 是一个局部的、只能被组件自身控制的数据源。state 中状态可以通过 this.setState 方法进行更新，setState 会导致组件的重新渲染。

> props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 props，否则组件的 props 永远保持不变。

1. 组件第一次加载到DOM中的时候，被称为 挂载
   生成的这个DOM被移除的时候，被称为 卸载

2. 当组件输出到 DOM 后会执行
``` 
componentDidMount() 
```
钩子

   组件被从DOM中移除，React会调用
   ```
   componentWillUnmount()
   ```
   这个钩子函数

## 事件处理
1. 与DOM元素的区别
    - React事件绑定属性的命名采用驼峰式写法，而不是小写。
    - 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
    - 不能使用返回 false 的方式阻止默认行为，而必须明确的使用 preventDefault

2. 
    ```
        <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
        <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
    ```
    - 参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递
    - 通过 bind 方式，事件对象以及更多的参数将会被隐式的进行传递。
    - 通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面
## 条件渲染
1. 在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。
   因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。

2. 组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。
   例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。

> 类似于 <input />、<select />、<textarea> 这些元素的 value 值被 React.js 所控制、渲染的组件，在 React.js 当中被称为受控组件（Controlled Component）。对于用户可输入的控件，一般都可以让它们成为受控组件，这是 React.js 所推崇的做法。