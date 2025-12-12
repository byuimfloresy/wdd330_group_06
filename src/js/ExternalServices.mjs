const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: res };
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id, category) {
    const products = await this.getData(category);
    return products.find((item) => item.Id === id);
  }
  async checkout(request) {
    const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)}

    const response = await fetch(`${baseURL}checkout`, options)
    const data = await convertToJson(response);
    return data.Result;
  }
}
