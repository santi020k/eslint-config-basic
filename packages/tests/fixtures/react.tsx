// @ts-nocheck
import React from 'react'

export const Component = () => {
  const [count, setCount] = React.useState(0)
  
  React.useEffect(() => {
    console.log(count)
  }, []) // Missing dependency 'count' for react-hooks/exhaustive-deps (warn/error)

  return <div onClick={() => setCount(count + 1)}>{count}</div>
}
