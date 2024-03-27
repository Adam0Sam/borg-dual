// TODO: Create API tokens
/**
 * Returns the Strapi URL with the specified path.
 * @param {string} [path=''] - The path to append to the Strapi URL.
 * @returns {string} The complete Strapi URL.
 */
export function getStrapiURL(path = '') {
    return `${
        'https://borg.licejus.lt'
        // 'http://localhost:1337'
        }${path}`;
}

/**
 * Fetches API content from the specified path.
 * @param {string} path - The path to fetch the API content from.
 * @returns {Promise<Object>} - A promise that resolves to the API content attributes.
 * @throws {Error} - If the data received is invalid or if an error occurs during the fetch.
 */
export async function fetchApiContent(path) {
    try {
        const data = await fetchAPI(path);
        if (!data || !data.data || !data.data.attributes) {
            throw new Error("Invalid data received");
        }
        return data.data.attributes;
    }
    catch (err) {
        throw new Error(err);
    }
}

/**
 * Fetches data from the API using the specified path and options.
 * @param {string} path - The API endpoint path.
 * @param {Object} options - The options for the API request.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 * @throws {Error} - If an error occurs during the API request.
 */
export default async function fetchAPI(path, options = {}) {
    try {
        const mergedOptions = {
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
            ...options,
        };
        const res = await fetch(getStrapiURL(path), mergedOptions);
        const data = await res.json();
        return data;
    }
    catch (err) {
        throw err;
    }
}
