import axios from 'axios';
import { onGlobalError, onGlobalSuccess, API_HOST_PREFIX } from './serviceHelpers';
const endpoint = { fileUrls: `${API_HOST_PREFIX}/api/files` };

const getFiles = (pageIndex, pageSize, isDeleted) => {
    const config = {
        method: 'GET',
        url: `${endpoint.fileUrls}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}&isDeleted=${isDeleted}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getCurrent = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${endpoint.fileUrls}/current/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchFiles = (pageIndex, pageSize, isDeleted, query) => {
    const config = {
        method: 'GET',
        url: `${endpoint.fileUrls}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&isDeleted=${isDeleted}&query=${query}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const uploadFiles = (payload) => {
    const config = {
        method: 'POST',
        url: `${endpoint.fileUrls}`,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const changeFileStatus = (userId) => {
    const config = {
        method: 'PUT',
        url: `${endpoint.fileUrls}/${userId}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const fileService = { getFiles, getCurrent, searchFiles, uploadFiles, changeFileStatus };

export default fileService;
