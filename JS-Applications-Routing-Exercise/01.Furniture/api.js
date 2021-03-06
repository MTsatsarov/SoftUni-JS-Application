async function request(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    try {

        const data = await response.json();
        return data;
    }
    catch (err) {
        alert(error.message)
        return response;

    }


}

export function createOptions(method = 'get', data) {
    const result = {
        method,
        headers: {}
    };
    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        result.headers['X-Authorization'] = token;
    }
    if (data) {
        result.headers['Content-Type'] = 'application/json';
        result.body = JSON.stringify(data);
    }
    return result;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data))
};

export async function put(url, data) {
    return request(url, createOptions('put', data))
};

export async function del(url) {
    return request(url, createOptions('delete'))
}

export const host = 'http://localhost:3030/';