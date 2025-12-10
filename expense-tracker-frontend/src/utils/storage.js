import * as SecureStore from "expo-secure-store";

export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync("auth_token", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("auth_token");
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("auth_token");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
