import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import  Stats  from "./Stats";

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

    //delete the all items 
    function handleClearList() {
        const confirmed = window.confirm("Are you sure you wnat to delete all items?")
        if (confirmed) setItems([]);
    }

    return (
        <div>

            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList items={items} onDeletingItem={handleDeleteItem} onToggleCheckbox={handleToggleItem} onClearList={handleClearList} />
            <Stats items={items} />

        </div>

    )
}









