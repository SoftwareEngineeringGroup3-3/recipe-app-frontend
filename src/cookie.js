export const setCookie = (name, value, duration) => {
    let token_expire;
    if(duration) {
        const date = new Date();
        date.setTime(date.getTime() + duration);
        token_expire = `; expires=${date.toUTCString()}`;
    } else {
        token_expire = '';
    }

    const encoded = encodeURIComponent(value);
    document.cookie = `${name}=${encoded}${token_expire}; path=/`;
}

export const getCookie = (name) => {
    const cookies = document.cookie.split(';');

    for(const cookie of cookies) {
        let [cookie_name, cookie_value] = cookie.split('=');

        cookie_name = cookie_name.replace(/^\s+/, '');
        if(cookie_name === name) {
            return decodeURI(cookie_value);
        }
    }

    return null;
}

export const deleteCookie = (name) => {
    const date = (new Date(0)).toUTCString();
    document.cookie = `${name}=; expires=${date}`;
}