import { useState } from "react";
import Item from "./Items";

export default function PackingList({ items, onDeletingItem, onToggleCheckbox ,onClearList}) {
    const [sortBy, setSortBy]=useState('input');

    //sorting the items
    let sortedItems;

    if(sortBy==='input'){
        sortedItems=items;
    }
    if(sortBy==='description'){
        sortedItems=items.slice().sort((a,b)=>a.description.localeCompare(b.description));
    }
    if(sortBy==='packed'){
        sortedItems=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed));
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map(function (item) {
                    return <Item item={item} onDeletingItem={onDeletingItem} onToggleCheckbox={onToggleCheckbox} key={item.id} />
                })}
            </ul>
            <div>
                <div className="actions">
                    <select value={sortBy} onChange={ (e)=>setSortBy(e.target.value)}>
                        <option value='input'> Sort by input orders</option>
                        <option value='description'>Sort by decription</option>
                        <option value='packed'>Sort by packed status</option>
                    </select>
                    <button onClick={onClearList}>Clear list</button>

                </div>
            </div>
        </div>
    )

}