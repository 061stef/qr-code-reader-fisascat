export const BASE_PATH = '';
export const TOKEN_NAME = 'fisascat-jwt-congress';

export async function apiCall(url, method, headers, data) {
    try {
        let option = null;
        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            option = {
                method: method,
                headers: headers,
                body: JSON.stringify(data)
            }
        } else {
            option = {
                method: method,
                headers: headers
            }
        }
        const response = await fetch(url, option);
        const json = await response.json();
        return response.status === 200 ? {data: json} : {error: json};
    } catch (e) {
        console.error(e);
        return { error: e }
    }
}

export async function checkLogged(token) {
    if(!token){
        return false; 
    }
    try{
        const user = await apiCall(BASE_PATH + '/me', 'GET', {'Authorization': 'Bearer ' + token});
        return user.error ? false : true;
    }catch(e){
        return false;
    }
    
}

export async function checkUserValidity(users, congress_user_email){
    const find = (users || []).find(item => item.email === congress_user_email);
    return find;
}



