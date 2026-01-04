import CryptoJS from "crypto-js";
// Define a secret key (keep this secure and don't hardcode it in production)
// const secretKey = "my-secret-key-123";

// Encrypt data
function encryptData(data) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    import.meta.env.VITE_SECRET_KEY,
  ).toString();
}

// Decrypt data
function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    import.meta.env.VITE_SECRET_KEY,
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
// Custom localStorage wrapper
export const secureLocalStorage = {
  // Set item with encryption
  setItem: (key, value) => {
    const encryptedValue = encryptData(value);
    localStorage.setItem(key, encryptedValue);
  },

  // Get item with decryption
  getItem: (key) => {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      return decryptData(encryptedValue);
    }
    return null;
  },

  // Remove item
  removeItem: (key) => {
    localStorage.removeItem(key);
  },

  // Clear all items
  clear: () => {
    localStorage.clear();
  },
};
