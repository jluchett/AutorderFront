const ipHost = '192.168.1.18'
export const actualUsers = async () => {
  try {
    const response = await fetch(`http://${ipHost}:3001/users/`);
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.log("Error fetching users:", error);
    return [];
  }
};

export const actualClients = async () => {
  try {
    const response = await fetch(`http://${ipHost}:3001/clients/`);
    const data = await response.json();
    return data.clients;
  } catch (error) {
    console.log("Error fetching clients", error);
    return [];
  }
};

export const actualVehicles = async () => {
  try {
    const response = await fetch(`http://${ipHost}:3001/vehicles/`);
    const data = await response.json();
    return data.vehicles;
  } catch (error) {
    console.log("Error fetching vehicles", error);
    return [];
  }
};

export const actualProducts = async () => {
  try {
    const response = await fetch(`http://${ipHost}:3001/products/`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log("Error fetching products", error);
    return [];
  }
};

export const actualOrders = async () => {
  try {
    const response = await fetch(`http://${ipHost}:3001/orders/`);
    const data = await response.json();
    return data.orders;
  } catch (error) {
    console.log("Error fetching products", error);
    return [];
  }
};

export const actualDetalle = async (idOrder)=> {
  try {
    const response = await fetch(`http://${ipHost}:3001/orders/detail/${idOrder}`);
    const data = await response.json();
    return data.detalle;
  } catch (error) {
    console.log("Error fetching products", error);
    return [];
  }
}
