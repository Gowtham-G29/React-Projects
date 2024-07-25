import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Books", quantity: 8, packed: false },
    { id: 4, description: "Dress", quantity: 10, packed: false },
];

export default function App() {
    const [items, setItems] = useState(initialItems);

    //Derived States

    function handleAddItems(item) {
        //update the item
        //this will immutated the array insted it creating the new array
        setItems((items) => [...items, item]);
        // items.push(item);         
    }

    function handleDeleteItem(id) {
        console.log(id);
        setItems((items) => items.filter((item) => item.id !== id))

    }

    function handleToggleItem(id) {
        setItems((items) => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item)
        );
    }

    return (
        <div>

            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList items={items} onDeletingItem={handleDeleteItem} onToggleCheckbox={handleToggleItem} />
            <Stats items={items} />

        </div>

    )
}

function Logo() {
    return (
        <h1>🌴 Far Away</h1>
    )
}

function Form({ onAddItems }) {

    const [description, setDescription] = useState('');
    const [selection, setSelection] = useState(1);

    function handleSumbit(e) {
        //Prevent reloading
        e.preventDefault();

        if (!description) return;
        //Add a new items
        const newItem = { description, selection, quantity: selection, packed: false, id: Date.now() };
        console.log(newItem);
        onAddItems(newItem);

        //set the initial value after all the process
        setDescription("");
        setSelection(1);


    }

    return (

        <form className="add-form" onSubmit={(e) => handleSumbit(e)}>
            <h3>What do you need for Your Trip?</h3>
            <select value={selection} onChange={(e) => {
                setSelection(Number(e.target.value));
            }}>
                {/* dynamicially add the list of options */}
                {Array.from({ length: 20 }, (_, i) => i + 1).map(function (num) {
                    return <option value={num} key={num}>{num} </option>
                })}
            </select>
            <input type="text" placeholder="Items...." value={description} onChange={(e) => {
                setDescription(e.target.value)
            }} />
            <button>Add  </button>
        </form>
    )
}

function PackingList({ items, onDeletingItem, onToggleCheckbox }) {
    return (
        <div className="list">
            <ul>
                {items.map(function (item) {
                    return <Item item={item} onDeletingItem={onDeletingItem} onToggleCheckbox={onToggleCheckbox} key={item.id} />
                })}
            </ul>
        </div>
    )

}

function Item({ item, onDeletingItem, onToggleCheckbox }) {
    console.log(item.id);
    return (
        <li>
            <input type="checkbox" value={item.packed} onChange={() => onToggleCheckbox(item.id)} />

            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeletingItem(item.id)}>❌</button>
        </li>
    )
}


function Stats({ items }) {
    if (!items.length) {
        return (
            <p className="stats">
                <em>Start Adding Some Items To Your Packing List 🚀</em>
            </p>
        )
    }
    //Derived State
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const packedPercent = (numPacked / numItems) * 100;

    return (
        <footer className="stats">
            {packedPercent === 100 ? ' You Got Everything! Ready to go ✈️'
                : <em>You have {`${numItems}`} items on your List , and you already packed {`${numPacked}`} ({`${packedPercent}%`})</em>}

        </footer>
    )
}