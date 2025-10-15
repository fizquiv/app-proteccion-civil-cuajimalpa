import { DataProvider, fetchUtils } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_JSON_SERVER_URL;

// HTTP Client with authentication
const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  
  // Add authentication token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const page = params.pagination?.page || 1;
    const perPage = params.pagination?.perPage || 10;
    const field = params.sort?.field || 'id';
    const order = params.sort?.order || 'ASC';
    
    // Backend expects _start and _end, not _page and _limit
    const start = (page - 1) * perPage;
    const end = start + perPage;
    
    const query = new URLSearchParams({
      _start: start.toString(),
      _end: end.toString(),
      _sort: field,
      _order: order,
    });
    
    // Add filters
    if (params.filter) {
      Object.keys(params.filter).forEach(key => {
        if (params.filter[key] !== undefined && params.filter[key] !== '') {
          query.set(key, params.filter[key]);
        }
      });
    }
    
    const url = `${API_URL}/${resource}?${query.toString()}`;
    
    return httpClient(url).then(({ headers, json }) => {
      // Backend sends total count in X-Total-Count header
      const total = headers.get('X-Total-Count') 
        ? parseInt(headers.get('X-Total-Count') as string, 10)
        : json.length;
      
      return {
        data: Array.isArray(json) ? json : (json.data || []),
        total: total,
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = new URLSearchParams();
    params.ids.forEach(id => query.append('id', id.toString()));
    const url = `${API_URL}/${resource}?${query.toString()}`;
    
    return httpClient(url).then(({ json }) => ({
      data: json.data || json,
    }));
  },

  getManyReference: (resource, params) => {
    const page = params.pagination?.page || 1;
    const perPage = params.pagination?.perPage || 10;
    const field = params.sort?.field || 'id';
    const order = params.sort?.order || 'ASC';
    
    const start = (page - 1) * perPage;
    const end = start + perPage;
    
    const query = new URLSearchParams({
      _start: start.toString(),
      _end: end.toString(),
      _sort: field,
      _order: order,
      [params.target]: params.id.toString(),
    });
    
    // Add filters
    if (params.filter) {
      Object.keys(params.filter).forEach(key => {
        if (params.filter[key] !== undefined && params.filter[key] !== '') {
          query.set(key, params.filter[key]);
        }
      });
    }
    
    const url = `${API_URL}/${resource}?${query.toString()}`;
    
    return httpClient(url).then(({ headers, json }) => {
      const total = headers.get('X-Total-Count') 
        ? parseInt(headers.get('X-Total-Count') as string, 10)
        : json.length;
      
      return {
        data: Array.isArray(json) ? json : (json.data || []),
        total: total,
      };
    });
  },

  create: (resource, params) =>
    httpClient(`${API_URL}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json,
    })),

  update: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const promises = params.ids.map(id =>
      httpClient(`${API_URL}/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      })
    );
    
    return Promise.all(promises).then(() => ({
      data: params.ids,
    }));
  },

  delete: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(() => ({ data: params.previousData as any })),

  deleteMany: (resource, params) => {
    const promises = params.ids.map(id =>
      httpClient(`${API_URL}/${resource}/${id}`, {
        method: 'DELETE',
      })
    );
    
    return Promise.all(promises).then(() => ({
      data: params.ids,
    }));
  },
};
