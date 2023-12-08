import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '40727014-499e89a10edf27dcbea28dfa6';

export const getAllimages = async () => {
  const params = new URLSearchParams({
    key: KEY,
    page: 1,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  const response = await axios.get(`?${params}`);
  return response.data;
};

// ПО ЗАПИТУ

export const getImagesByQuery = async (queryParams, page) => {
  const params = new URLSearchParams({
    key: KEY,
    q: queryParams,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

const  response = await axios.get(`?${params}`);

  return response.data;
};
