import { useState } from "react";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

// L13 Activity 8a
const[items, setItems] = useState([])

// L13 Activity 8b
function handleAddItems(item){
  setItems([...items, item])

}

function Logo() {
  return <h1>My Travel List</h1>;
}


function Form() {
  function handleSubmit(e){
    e.preventDefault();

    // L13 Activity 8C
    setDescription('')
    setPacked(false)
  }
  
  const [id, setId] = useState(TEMP)
  const [quantity, setQuantity] = useState(1)
  const [description, setDescription] = useState('')
  const [packed, setPacked] = useState(false)

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select onChange={(e)=>setQuantity(e.target.value)}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input value={description} onChange={(e)=>setDescription(e.target.value)} />
      <button type="submit">ADD</button>
    </form>
  );
}

function Item(quantity, description){
  return (
    packed === true ? <p>{description}({quantity})</p> : <p style='strike-through'>{description}({quantity})</p>
  )
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => {
          <Item quantity={item.quantity} description={item.description} />
        })}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have {items.length} items in the list. You already packed Y ({TempReplaceWithTotalPacked / items.length * 100}%).</em>
    </footer>
  );
}

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

export default App;
