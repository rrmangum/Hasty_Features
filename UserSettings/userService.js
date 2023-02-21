import axios from 'axios';
import { onGlobalError, onGlobalSuccess, API_HOST_PREFIX } from './serviceHelpers';
const endpoint = { userUrls: `${API_HOST_PREFIX}/api/users` };

const register = (payload) => {
    const config = {
        method: 'POST',
        url: `${endpoint.userUrls}`,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const login = (payload) => {
    const config = {
        method: 'POST',
        url: `${endpoint.userUrls}/login`,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const logout = () => {
    const config = {
        method: 'GET',
        url: `${endpoint.userUrls}/logout`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateCurrentUser = (payload) => {
    const config = {
        method: 'PUT',
        url: `${API_HOST_PREFIX}/api/users/update`,
        data: payload,
        crossdomain: true,
        headers: {'Content-Type': 'application/json'},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const updateConfirm = (email, token) => {
    const config = {
        method: 'PUT',
        url: `${endpoint.userUrls}/confirm?email=${email}&token=${token}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getCurrentUser = () => {
    const config = {
        method: 'GET',
        url: `${endpoint.userUrls}/current`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const userById = (id) => {
    const config = {
        method: 'GET',
        url: `${endpoint.userUrls}/${id}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getUserDetails = () => {
    const config = {
        method: 'GET',
        url: `${endpoint.userUrls}/profile`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const resetPassword = (payload) => {
    const config = {
        method: 'PUT',
        url: `${endpoint.userUrls}/reset`,
        crossdomain: true,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const changePassword = (payload) => {
    const config = {
        method: 'PUT',
        url: `${endpoint.userUrls}/changepassword`,
        crossdomain: true,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
export {
    register,
    login,
    logout,
    updateCurrentUser,
    updateConfirm,
    getCurrentUser,
    userById,
    getUserDetails,
    resetPassword,
    changePassword,
};
