import Axios from 'axios';
const axios = Axios.create({
    baseURL: 'https://mallapi.duyiedu.com/',
    params: {
        appkey: '1029243083_1611730210078'
    }
})
export default axios;