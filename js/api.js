// PHASER API — todas las operaciones del catálogo se realizan contra MockAPI.
const API_URL = "https://6afeff523a0e70bc8d54665f.mockapi.io/productos";

const PhaserAPI = {
  async request(url = API_URL, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) }
    });
    if (!response.ok) {
      const message = await response.text().catch(() => "");
      throw new Error(`API ${response.status}: ${message || response.statusText}`);
    }
    if (response.status === 204) return null;
    return response.json();
  },
  getAll() { return this.request(API_URL); },
  getById(id) { return this.request(`${API_URL}/${encodeURIComponent(id)}`); },
  create(product) { return this.request(API_URL, { method: "POST", body: JSON.stringify(product) }); },
  update(id, product) { return this.request(`${API_URL}/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(product) }); },
  patch(id, changes) { return this.request(`${API_URL}/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(changes) }); },
  remove(id) { return this.request(`${API_URL}/${encodeURIComponent(id)}`, { method: "DELETE" }); }
};

window.PhaserAPI = PhaserAPI;
