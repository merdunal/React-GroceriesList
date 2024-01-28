import React from 'react'

export const SearchItem = ({ search, setSearch }) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='search'>Search Item</label>
      <input
        id='search'
        type='text'
        role='searchbox'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
      </input>
    </form>
  )
}
