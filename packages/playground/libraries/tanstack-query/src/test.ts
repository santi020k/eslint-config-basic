import { useQuery } from '@tanstack/react-query'

// eslint-disable-next-line no-var, @typescript-eslint/no-unused-vars
var queryTest = 'test'

useQuery({ queryKey: ['foo'], queryFn: () => 'bar' })
