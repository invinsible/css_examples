//NATIVE JS

// function createItem(item) {
//     return `
//         <div class="item">
//             <h3>${item.name}</h3>
//             <p>${item.description}</p>
//         </div>
//     `
// }

// const templates = items.map(item => createItem(item));
// const html = templates.join(' ');
// document.getElementById('app').innerHTML = html;


function Item(props) {
    return (
        <div className="item">
            <h3>{props.item.name}</h3>
            <p>{props.item.description}</p>
        </div>
    )
}

class App extends React.Component {
    state = {
        items : [
            {
                name: 'Item1',
                description: 'Some descr about Item1'
            },
            {
                name: 'Item2',
                description: 'Some descr about Item2'
            },
            // {
            //     name: 'Item3',
            //     description: 'Some descr about Item3'
            // },
            {
                name: 'Item4',
                description: 'Some descr about Item4'
            }
        ]
    }

    renderItems() {
        return (
            this.state.items.map(item => {
                return (
                    <Item item={item} key={item.name + Math.random()}/>
                )
            })
        )
    }

    render() {
        return (
            <div className="container">
               { this.renderItems() } 
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
