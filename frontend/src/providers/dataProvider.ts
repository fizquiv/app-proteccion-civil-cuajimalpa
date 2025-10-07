import jsonServerProvider from "ra-data-json-server";
import { DataProvider } from "react-admin";

const baseDataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL
);

export const dataProvider: DataProvider = {
  ...baseDataProvider,
  getList: (resource, params) => {
    const page = params.pagination?.page || 1;
    const perPage = params.pagination?.perPage || 10;
    const field = params.sort?.field || 'id';
    const order = params.sort?.order || 'ASC';
    
    // Build query parameters
    const query = new URLSearchParams();
    query.set('_page', page.toString());
    query.set('_limit', perPage.toString());
    query.set('_sort', field);
    query.set('_order', order.toLowerCase());
    
    // Add filters
    if (params.filter) {
      Object.keys(params.filter).forEach(key => {
        query.set(key, params.filter[key]);
      });
    }
    
    const url = `${import.meta.env.VITE_JSON_SERVER_URL}/${resource}?${query.toString()}`;
    
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const totalCount = response.headers.get('X-Total-Count');
        return response.json().then(data => ({
          data,
          total: totalCount ? parseInt(totalCount, 10) : data.length,
        }));
      });
  },
};
