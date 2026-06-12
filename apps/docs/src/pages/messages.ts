import type { APIRoute } from 'astro'

export const prerender = true

export const GET: APIRoute = () =>
  new Response(JSON.stringify([]), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200
  })

