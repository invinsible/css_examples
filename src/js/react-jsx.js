const e = React.createElement;


function Item(props) {
    return e(
        'div',
        {className: 'item'},
        [
            e('h3', {className: 'item__title', key: 'h3'}, props.item.name),
            e('p', {key:'p'}, props.item.description)
        ]
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
            {
                name: 'Item3',
                description: 'Some descr about Item3'
            },
            {
                name: 'Item4',
                description: 'Some descr about Item4'
            }
        ]
    }

    renderItems() {
        return this.state.items.map(item => {
            return e(
                Item,
                {item: item, key: item.name + Math.random()}
            )
                // return (
                //     <Item item={item} key={item.name + Math.random()}/>
                // )
            })
        
    }

    render() {
        return e(
            'div',
            {className:'container'},
            this.renderItems()
            )
    }
}

ReactDOM.render(
    e(App),
    document.getElementById('app')
)
