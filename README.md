# lunanodejs-api

![Build Status](https://img.shields.io/travis/dolu89/lunanodejs-api.svg)
![Coverage](https://img.shields.io/coveralls/dolu89/lunanodejs-api.svg)
![Downloads](https://img.shields.io/npm/dm/lunanodejs-api.svg)
![Downloads](https://img.shields.io/npm/dt/lunanodejs-api.svg)
![npm version](https://img.shields.io/npm/v/lunanodejs-api.svg)
![dependencies](https://img.shields.io/david/dolu89/lunanodejs-api.svg)
![dev dependencies](https://img.shields.io/david/dev/dolu89/lunanodejs-api.svg)
![License](https://img.shields.io/npm/l/lunanodejs-api.svg)

Nodejs library to access the Luna Node Dynamic API

## Getting Started

Install it via npm:

```shell
npm install lunanodejs-api
```

And include in your project:

```javascript
import { LunanodejsApi } from 'lunanodejs-api';

const lndApi = new LunanodejsApi('api_id', 'api_key');
const vm = await lndApi.request('vm', 'create', { plan_id: 'm.1s', hostname: 'my_new_vm', image_id: 240308, scripts: '1234', region: 'roubaix' });
const images = await lndApi.request('image', 'list');
```

## License

MIT
