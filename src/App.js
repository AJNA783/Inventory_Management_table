import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', quantity: 10 },
    { id: 2, name: 'Chair', category: 'Furniture', quantity: 5 },
    { id: 3, name: 'Desk', category: 'Furniture', quantity: 3 },
    { id: 4, name: 'Phone', category: 'Electronics', quantity: 8 },
    { id: 5, name: 'Shirt', category: 'Clothing', quantity: 12 },
    { id: 6, name: 'Basketball', category: 'Sports', quantity: 15 },
  ]);
  
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0 });
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      const newId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
      setItems([...items, { ...newItem, id: newId }]);
      setNewItem({ name: '', category: '', quantity: 0 });
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    setNewItem({ ...itemToEdit });
  };

  const editQuantity = (id, newQuantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const filteredItems = filter === 'All' ? items : items.filter(item => item.category === filter);

  const searchedItems = filteredItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = searchedItems.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.quantity - b.quantity;
    } else {
      return b.quantity - a.quantity;
    }
  });

  const isLowStock = (quantity) => quantity < 10 ? 'low-stock' : '';

  const exportToCSV = () => {
    const header = ['ID', 'Name', 'Category', 'Quantity'];
    const rows = items.map(item => [item.id, item.name, item.category, item.quantity]);

    const csvContent = `data:text/csv;charset=utf-8,${header.join(',')}\n${rows.map(row => row.join(',')).join('\n')}`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'inventory_data.csv');
    link.click();
  };

  const clearFilters = () => {
    setFilter('All');
    setSearchQuery('');
    setSortOrder('asc');
  };

  return (
    <div className="App">
      <h1>Inventory Management</h1>
      
      <div className="search">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filter">
        <label>Filter by Category: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      <div className="sort">
        <label>Sort by Quantity: </label>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      <button className="clear-filters" onClick={clearFilters}>Clear Filters</button>

      <button className="export-btn" onClick={exportToCSV}>Export Data</button>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id} className={isLowStock(item.quantity)}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => editQuantity(item.id, parseInt(e.target.value))}
                />
                {item.quantity < 10 && <span style={{ color: 'red', marginLeft: '8px' }}>⚠ Low Stock</span>}
              </td>
              <td>
                <button className="edit-btn" onClick={() => editItem(item.id)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Item</h2>
      <div className="form">
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
        <button className="add-btn" onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
