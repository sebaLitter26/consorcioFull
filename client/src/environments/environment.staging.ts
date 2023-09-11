import { redcoto } from "./environment.utils";

export const environment = {
    production: false,
    preProduction: false,
    staging: true,
    apiUrl: `http://slnxtest01${redcoto}:5020/api/`,
    apiInterfaceUrl: `http://slnxtest01${redcoto}:5021/interfaces/`,
    serialApiUrl: "http://localhost:8080/serialapi/",
    apiIpad: "http://ipadwebservices/empleadosws/ServiceSvc.svc/",
    apiTrack: "http://test3web18/TrackingApi/api/",
    version: `${require('../../package.json').version}-sta`,
    apiUrlRRHH: `http://desa5web18/ApiRRHH/`
};
