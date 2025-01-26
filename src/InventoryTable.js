import React, { useState } from "react";
import './App.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Laptop", category: "Electronics", quantity: 5 },
    { id: 2, name: "Desk", category: "Furniture", quantity: 12 },
    { id: 3, name: "Chair", category: "Furniture", quantity: 8 }
  ]);

  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });

  const addItem = () => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    setItems([...items, { ...newItem, id, quantity: Number(newItem.quantity) }]);
    setNewItem({ name: "", category: "", quantity: "" });
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (id) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, name: "Updated Item" } : item
    );
    setItems(updatedItems);
  };

  const filterItems = (category) => {
    return items.filter(item => item.category === category);
  };

  const sortItems = () => {
    const sortedItems = [...items].sort((a, b) => a.quantity - b.quantity);
    setItems(sortedItems);
  };

  return (
    <div className="App">
      <h1>Inventory Management</h1>
      <div>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <div>
        <button onClick={() => setItems(filterItems("Furniture"))}>Filter by Furniture</button>
        <button onClick={() => setItems(filterItems("Electronics"))}>Filter by Electronics</button>
        <button onClick={sortItems}>Sort by Quantity</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ backgroundColor: item.quantity < 10 ? "yellow" : "transparent" }}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => editItem(item.id)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
