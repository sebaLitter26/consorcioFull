import { port } from "./environment.utils";

export const environment = {
    production: false,
    preProduction: false,
    staging: false,
    apiUrl: `http://localhost:${port}/graphql/`, 
    /* apiInterfaceUrl: `http://slnxtest01${redcoto}:5021/interfaces/`,
    serialApiUrl: "http://localhost:8080/serialapi/",
    apiIpad: "http://ipadwebservices/empleadosws/ServiceSvc.svc/",
    apiTrack: "http://test3web18/TrackingApi/api/", */
    version: `${require('../../package.json').version}-dev`,

    cloudinary: {
        name: 'latinmed', 
        preset: 'itidmuni',
        api_key: '716319916531578',
        api_secret: 'PYBHq86YlkJLo_BpnWtrmIlMfeM' 
    },

    oauth: {
        domain : 'sebalitter.auth0.com',
        clientId:'RCgluXpdLwPsqvtMCbdto86jg7X6KRv3',
        authorizationParams: {
            audience: 'http://localhost:3001/api/',
            redirect_uri: 'http://localhost:4200/#/sign',
            //scope: REACT_APP_AUTH0_SCOPES,
        }
    }

}
