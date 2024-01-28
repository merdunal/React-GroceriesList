import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import { AddItem } from './components/AddItem'
import { SearchItem } from './components/SearchItem'
import { useState } from 'react'

function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')))
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  const setAndSaveNewItem = (newItems) => {
    setItems(newItems)
    localStorage.setItem("shoppinglist", JSON.stringify(newItems))
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item }
    const listItems = [...items, myNewItem]
    setAndSaveNewItem(listItems)
  }

  const handleChange = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    setAndSaveNewItem(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setAndSaveNewItem(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return
    addItem(newItem)
    setNewItem('')
  }


  return (
    <div className="App">
      <Header title={"Grocery List"} />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter((item) => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
