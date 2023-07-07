export const actualUsers = async () => {
  try {
    const response = await fetch("http://192.168.1.9:3001/users/users");
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.log("Error fetching users:", error);
    return [];
  }
};
