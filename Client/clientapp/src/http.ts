import { Api } from "./myApi";

export const baseUrl = 'http://localhost:5102';

export const http = new Api({
    baseUrl: baseUrl
});