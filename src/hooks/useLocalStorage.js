export const getLocalStorageItem = (key) => {
  let data = localStorage.getItem(key);

  // for ie - ie(old 11 builds) not supported JSON.parse with not json string, JSON.parse('1234') will throw error
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

export const setLocalStorageItem = (key, data) => {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
