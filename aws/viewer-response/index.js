function handler(event) {

    var response = event.response;
    var headers = response.headers;

    headers['access-control-allow-origin'] = { value: '*' };
    headers['cache-control'] = { value: "no-store" };

    return response;

}
