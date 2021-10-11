import * as api from "../api.js"


export async function registerUser(data) {
  return await api.post(api.host + 'users/register', data)
}

export async function loginUser(data) {
  return await api.post(api.host + 'users/login', data)
}


export async function logoutUser() {
  return await api.get(api.host + 'users/logout')
}

export async function getAllFurniture() {
  return await api.get(api.host + 'data/catalog')
}
export async function getFurnitureDetails(furnitureId) {
  return await api.get(api.host + 'data/catalog/' + furnitureId)
}
export async function deleteFurniture(furnitureId) {
 return await api.del(api.host + 'data/catalog/' + furnitureId)
}

export async function getAllUserFurniture(userId) {
  return await api.get(api.host + `data/catalog?where=_ownerId%3D%22${userId}%22`);
}
export async function createFurniture(furniture) {
return   await api.post(api.host + 'data/catalog', furniture)
}

export async function updateFurniture(id,furniture) {
  await api.put(api.host + 'data/catalog/' + id,furniture)
}
// ⦁	My Furniture (GET): http://localhost:3030/data/catalog