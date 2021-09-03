const getDecodedToken = (token: string) => {
    return JSON.parse(atob(token.split('.')[1]));
}

const user = JSON.parse(sessionStorage.getItem('user')!);
if (user != null) {
    user.roles = [];
    const roles = getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
}

export default {
    getDecodedToken, user
}