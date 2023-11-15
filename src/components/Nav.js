import React from 'react'
import { Link } from 'react-router-dom'

function Nav({ search, setSearch }) {
    return (
        <nav className='Nav'>
            <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                <label>Search Posts</label>
                <input
                    id='search'
                    placeholder='Search Posts'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text" />
            </form>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/post'>Post</Link></li>
                <li><Link to='about'>About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
