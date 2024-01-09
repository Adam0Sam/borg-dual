// TODO: Create API tokens
export function getStrapiURL(path = '') {
    return `${
        'https://borg.licejus.lt'
    }${path}`;
}

export default async function fetchAPI(path, options = {}) {

    try{
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
    catch(err){
        throw err;
    }
}
