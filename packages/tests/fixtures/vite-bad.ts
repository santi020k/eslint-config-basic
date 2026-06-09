const mount = document.querySelector("#app");

if (mount) {
  mount.textContent = import.meta.env.DEV ? "Vite dev" : "Vite build";
}
