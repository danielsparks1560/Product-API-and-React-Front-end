const BASE_URL = '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export function getAll() {
  return request('/packages');
}

export function create(pkg) {
  return request('/packages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pkg),
  });
}

export function update(id, pkg) {
  return request(`/packages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pkg),
  });
}

export function remove(id) {
  return request(`/packages/${id}`, {
    method: 'DELETE',
  });
}
