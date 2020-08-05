import { getData } from "../../../services/Request";

const getOrder = async () => {
  const { data, error } = await getData(`http://localhost:5000/orders`);

  if (error) {
    return { error: error.message, data: [] };
  }

  if (!data) {
    return { data: [] };
  }

  return { data: data.orders };
};

export { getOrder };
