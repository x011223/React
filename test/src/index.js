import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 只有 render 方法的组件 可以定义为函数定义组件
function Square (props) {
    return (
        // <button className = "square" onClick={ () => props.onClick() }>
        // <button className = "square" onClick={ props.onClick() }>
        // 如果写成 props.onClick() 会在 组件渲染时触发, 导致死循环
        <button className = "square" onClick={ props.onClick }>
            {props.value}
        </button>  
    )
}

class Board extends React.Component {  
    renderSquare (i) {
        // 在 Board 组件的 renderSquare 方法中，我们将代码改写成下面这样，传递一个名为 value 的 prop 到 Square 当中
        return <Square
            value = { this.props.squares[i] } 
            // onClick={() => this.handleClick(i)}
            onClick = { () => this.props.onClick(i) }
        />
    }

    render () {
        // const status = 'Next player: ' + this.state.isXNext ? this.state.X : this.state.Y;
        // let status
        // const winner = calculateWinner(this.props.squares)
        // if (winner) {
        //     status = "Winner is: " + winner
        // } else {
        //     let next = this.props.isXNext ? this.props.X : this.props.Y;
        //     status = "Next player: " + next;
        // }
        return (
            <div>
                {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}  

class Game extends React.Component {
    constructor () {
        // 在使用 JavaScript classes 时，必须调用 super(); 方法才能在继承父类的子类中正确获取到类型的 this 。                
        super()
        this.state = {
            // 初始化一个包含9个空值的数组作为状态数据，并将这个数组中的9个元素分别传递到对应的9个 Square 组件当中。
            history: [
                { squares: Array(9).fill(null), }
            ],
            //  设置 X 默认 先下
            isXNext: true,
            X: '我',
            Y: '你',
            stepNumber: 0,
        }
    }
    handleClick(i) {
        // 浅拷贝 防止对已有数据的改变
        // 改变应用数据的方式一般分为两种。第一种是直接修改已有的变量的值。第二种则是将已有的变量替换为一个新的变量。
        // 替换修改的好处
        // 1. 很轻松地实现 撤销/重做以及时间旅行  即 在需要的时候随时切换回历史数据。
        // 2. 记录变化
        // 3. 在 React 当中判定何时重新渲染
        const history = this.state.history;
        const current = history[history.length - 1];
        // const squares = current.squares.slice();
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
          }
        squares[i] = this.state.isXNext ? this.state.X : this.state.Y;
        this.setState({ 
            history: history.concat(
                [
                    { squares: squares }
                ]
            ),
            isXNext: !this.state.isXNext,
            stepNumber: history.length,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    }
    render() {
        let status
        // const history = this.state.history;
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares)
        if (winner) {
            status = "赢家: " + winner
        } else if (!winner && history.length > 1 && history.length % 9 === 1) {
            status = "平局"
        } else {
            let next = this.state.isXNext ? this.state.X : this.state.Y;
            status = "下一个: " + next;
        }
        // React 会自动的在判断元素更新时使用 key ，而组件自己是无法获取到 key 的。 
        // 组件的 keys 值并不需要在全局都保证唯一，只需要在当前的节点里保证唯一即可。
        const moves = history.map((step, move) => {
            const desc = move ? 'Move Step  ' + move : 'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
        return (
            <div className="game">
                <div className="game-board">
                    <Board  squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>
                        { status }
                    </div>
                    <ol>
                        { moves }
                    </ol>
                </div>
            </div>
        );
    }
}
  
  // ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);