class API {
  constructor() {}
  post(url: string, data?: any) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
  }
  get(url: string, query?: any) {
    // TODO: append query to url
    return fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }).then(response => response.json())
  }
}

export default new API()
