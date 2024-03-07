// A mock function to mimic making an async request for data

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO
    const response = await fetch("/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category":["smartphone"]}
  //todo
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length>0){
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO
    const response = await fetch(
      "/products?" + queryString+'isAdmin=true'
    );
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) =>
    {
    const response = await fetch("/categories");
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}
