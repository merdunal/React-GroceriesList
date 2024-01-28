import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import apiRequest from './components/apiRequest'
import { AddItem } from './components/AddItem'
import { SearchItem } from './components/SearchItem'
import { useState, useEffect } from 'react'

function App() {
  const API_URL = 'http://localhost:3500/items'

  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error('Data not received as expected')
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch (error) {
        setFetchError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => fetchItem(), 2000)
  }, [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item }
    const listItems = [...items, myNewItem]
    setItems(listItems)

    const postOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result)
  }

  const handleChange = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems)
    const myItems = listItems.filter((item) => item.id === id)

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ checked: myItems[0].checked })
    }

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions)
    if (result) setFetchError(result)
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)

    const deleteOptions = {
      method: 'DELETE'
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions)
    if (result) setFetchError(result)
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
      <main>
        {fetchError && <p>Error: {fetchError}</p>}
        {isLoading && <p>loading...</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter((item) => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
