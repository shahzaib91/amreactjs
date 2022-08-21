import axios from 'axios';
import Config from './Config';

const HttpHandler = () =>
{
    const {baseUrl, appName}    = Config();
    const http                  = axios.create
    ({
        baseURL                 : baseUrl,
        headers                 :
        {
            "Content-type"      : "application/json"
        }
    });
    return { 
        http, baseUrl, appName
    };
}

export default HttpHandler;