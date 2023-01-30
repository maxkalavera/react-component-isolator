const localStorageWrapper: {
  get: (key: string, defaultValue?: any) => any;
  set: (key: string, value: any) => void;
} = {
  get: (key, defaultValue = undefined) => {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  },
};

export default localStorageWrapper;
