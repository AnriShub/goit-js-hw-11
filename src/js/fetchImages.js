import axios from 'axios';


export { fetchImages }

async function fetchImages(value, page) {

  const params = new URLSearchParams({
    q: value,
    key: '29588079-fbc492831fdad231bf7222b96',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  });

  const url = `https://pixabay.com/api/?${params}`;
  // console.log(url);
  return await axios.get(url).then(response => response.data);
}




