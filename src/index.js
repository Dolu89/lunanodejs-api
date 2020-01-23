import hmacSHA512 from 'crypto-js/hmac-sha512';
import axios from 'axios';

const LNDYNAMIC_URL = 'https://dynamic.lunanode.com/api/{CATEGORY}/{ACTION}/';

export class LunanodejsApi {


    constructor(api_id, api_key) {
        if (api_id.length !== 16) {
            throw 'supplied api_id incorrect length, must be 16';
        }
        if (api_key.length !== 128) {
            throw 'supplied api_key incorrect length, must be 128';
        }

        this.api_id = api_id;
        this.api_key = api_key;
        this.api_partialkey = api_key.substring(0, 64);
    }

    async request(category, action, params = {}) {

        const lndynamic_url = LNDYNAMIC_URL.replace('{CATEGORY}', category).replace('{ACTION}', action);
        let request = params;
        request['api_id'] = this.api_id;
        request['api_partialkey'] = this.api_partialkey;
        const request_raw = JSON.stringify(request);
        const handler = `${category}/${action}/`;
        const nonce = Math.round(new Date().getTime() / 1000);
        const signature = hmacSHA512(`${handler}|${request_raw}|${nonce}`, this.api_key).toString();

        const data = {
            req: request_raw,
            handler,
            signature,
            nonce: nonce
        };

        var request_result = await axios.post(lndynamic_url, JSON_to_URLEncoded(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        const result_data = request_result.data;

        if (!result_data.success) {
            throw 'server gave invalid response (missing success key)';
        } else if (result_data.success !== 'yes') {
            if (result_data.error) {
                throw `API error: ${result_data.error}`;
            } else {
                throw 'Unknown API error';
            }
        }

        return request_result.data;
    }
}

function JSON_to_URLEncoded(element, key, list) {
    var list = list || [];
    if (typeof (element) == 'object') {
        for (var idx in element)
            JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
    } else {
        list.push(key + '=' + encodeURIComponent(element));
    }
    return list.join('&');
}