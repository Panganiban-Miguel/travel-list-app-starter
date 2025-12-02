import { useState } from "react";
import Logo from "./components/logo.js";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

// function Logo() {
//   return <h1>My Travel List</h1>;
// }

function Form({description, onNewDescription, quantity, onNewQuantity, onAddItems}) {
  function handleSubmit(e){
    e.preventDefault();

    // L13 Activity 8C
    if (!description || quantity <= 0) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);

    onNewQuantity(1);
    onNewDescription("");  
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>

      <h3>What do you need to pack?</h3>

      <select onChange={(e)=>onNewQuantity(Number(e.target.value))}>

        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>

      </select>

      <input type='text'
        placeholder="Item..."
        value={description}
        onChange={(e)=>onNewDescription(e.target.value)}
      />

      <button type="submit">ADD</button>

    </form>
  );
}

function Item({item, onDeleteItem, onToggleItem}) {
  return (
  //   packed === true ? <li>{description}({quantity})</li> : <li style='strike-through'>{description}({quantity})</li>
  <li>
    <input
    type="checkbox"
    checked={item.packed}
    onChange={() => onToggleItem(item.id)}/>
    <span>
      {item.description} ({item.quantity})
    </span>
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
  )
}

function PackingList({items, onDeleteItem, onToggleItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
          key={item.id}
          item={item}
          onDeleteItem={onDeleteItem}
          onToggleItem={onToggleItem}/>
        ))}
      </ul>
    </div>
  );
}

function Stats(items) {
  if (!items.length) {
    return (
      <footer className="stats">
        <p>Your packing list is empty. Start adding some items!</p>
      </footer>
    )
  }

  return (
    <footer className="stats">
      <>
      {items.filter((item) => item.packed).length === 100 ? "Nice, you're done with everything!" : 
      `You have ${items.length} items in the list, and have already packed ${(items.filter((item)=>item.packed).length) / items.length * 100}%.`}
    </>
    </footer>
  );
}

function App() {
  // L13 Activity 8a
  const[items, setItems] = useState(initialItems)
  const [quantity, setQuantity] = useState(1)
  const [description, setDescription] = useState('')

  // L13 Activity 8b
  function handleAddItems(item){
    setItems([...items, item])
  }

  function handleDeleteItem(id) {
    setItems((cur) => cur.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((cur) =>
      cur.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form
      description={description}
      onNewDescription={setDescription}
      quantity={quantity}
      onNewQuantity={setQuantity}
      onAddItems={handleAddItems}
      />
      <PackingList
      items={items}
      onDeleteItem={handleDeleteItem}
      onToggleItem={handleToggleItem}/>
      <Stats items={items}/>
    </div>
  );
}

export default App;
