import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { useTheme } from './ThemeContext.jsx'

// Helper function to simulate fetching data
const fetchTodos = () => new Promise(resolve => {
  setTimeout(() => {
    resolve([
      { id: 1, text: 'Learn React', completed: true },
      { id: 2, text: 'Build a Todo App', completed: false },
      { id: 3, text: 'Profit!', completed: false }
    ])
  }, 1000)
})

const TodoApp = () => {
  const { theme, toggleTheme } = useTheme()
  // eslint-disable-next-line no-unused-vars
  const [unusedState, setUnusedState] = useState('test')
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('asc')
  const [loading, setLoading] = useState(true)
  const inputRef = useRef(null)

  // Fetch todos when the component mounts
  useEffect(() => {
    let isMounted = true

    const loadTodos = async () => {
      setLoading(true)

      try {
        const fetchedTodos = await fetchTodos()

        if (isMounted) {
          setTodos(fetchedTodos)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadTodos()

    return () => {
      isMounted = false
    }
  }, []) // Empty dependency array fixes the infinite loop

  // Handle adding a new todo
  const addTodo = useCallback(() => {
    if (!inputRef.current) return

    const text = inputRef.current.value.trim()

    if (text) {
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Date.now(), text, completed: false }
      ])

      inputRef.current.value = ''
    }
  }, [])

  // Handle toggling the completion state of a todo
  const toggleTodo = useCallback(id => {
    setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }, [])

  // Handle changing the filter state
  const handleFilterChange = useCallback(event => {
    setFilter(event.target.value)
  }, [])

  // Handle changing the sort order
  const handleSortChange = useCallback(event => {
    setSortOrder(event.target.value)
  }, [])

  // Filter and sort todos based on current state
  const filteredAndSortedTodos = useMemo(() => {
    const filteredTodos = todos.filter(todo => {
      if (filter === 'completed') return todo.completed

      if (filter === 'incomplete') return !todo.completed

      return true
    })

    return filteredTodos.sort((a, b) => {
      if (sortOrder === 'asc') return a.text.localeCompare(b.text)

      return b.text.localeCompare(a.text)
    })
  }, [todos, filter, sortOrder])

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '20px',
        minHeight: '100vh'
      }}
    >
      <header>
        <h1>
          Todo List
        </h1>
        <button
          type="button"
          onClick={toggleTheme}
        >
          Switch to
          {' '}
          {
            theme === 'light' ?
              'Dark' :
              'Light'
          }
          {' '}
          Mode
        </button>
      </header>

      {
        loading ?
          (
            <p>
              Loading todos...
            </p>
          ) :
          (
            <>
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="New todo"
                />
                <button
                  type="button"
                  onClick={addTodo}
                >
                  Add Todo
                </button>
              </div>
              <div style={{ marginTop: '10px' }}>
                <label>
                  Filter:
                  <select
                    value={filter}
                    onChange={handleFilterChange}
                  >
                    <option value="all">
                      All
                    </option>
                    <option value="completed">
                      Completed
                    </option>
                    <option value="incomplete">
                      Incomplete
                    </option>
                  </select>
                </label>
                <label style={{ marginLeft: '10px' }}>
                  Sort:
                  <select
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option value="asc">
                      Ascending
                    </option>
                    <option value="desc">
                      Descending
                    </option>
                  </select>
                </label>
              </div>
              <ul>
                {
                  filteredAndSortedTodos.map(todo => (
                    <li
                      key={todo.id}
                      style={{
                        textDecoration: todo.completed ?
                          'line-through' :
                          'none'
                      }}
                    >
                      {todo.text}
                      <button
                        type="button"
                        onClick={() => toggleTodo(todo.id)}
                        style={{ marginLeft: '10px' }}
                      >
                        {
                          todo.completed ?
                            'Undo' :
                            'Complete'
                        }
                      </button>
                    </li>
                  ))
                }
              </ul>
            </>
          )
      }
    </div>
  )
}

export default TodoApp
