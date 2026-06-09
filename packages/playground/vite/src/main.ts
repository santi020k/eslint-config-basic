const mount = document.querySelector<HTMLDivElement>('#app')

if (mount) {
  mount.textContent = import.meta.env.DEV ? 'Vite dev' : 'Vite build'
}
