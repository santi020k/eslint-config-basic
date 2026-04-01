import { useQuery } from '@tanstack/react-query'

useQuery({ queryKey: ['foo'], queryFn: () => 'bar' })
