export const persistencia = {
  setStorage: (key, record) => {
    localStorage.setItem(key, record);
  },
  getStorage: (key) => {
    return localStorage.getItem(key);
  },
};
