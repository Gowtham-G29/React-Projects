import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [selection, setSelection] = useState(1);

  function handleSumbit(e) {
    //Prevent reloading
    e.preventDefault();

    if (!description) return;
    //Add a new items
    const newItem = {
      description,
      selection,
      quantity: selection,
      packed: false,
      id: Date.now(),
    };
    console.log(newItem);
    onAddItems(newItem);

    //set the initial value after all the process
    setDescription("");
    setSelection(1);
  }

  return (
    <form className="add-form" onSubmit={(e) => handleSumbit(e)}>
      <h3>What do you need for Your Trip?</h3>
      <select
        value={selection}
        onChange={(e) => {
          setSelection(Number(e.target.value));
        }}
      >
        {/* dynamicially add the list of options */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map(function (num) {
          return (
            <option value={num} key={num}>
              {num}{" "}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Items...."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add </button>
    </form>
  );
}
