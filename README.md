# RequestList Bridge

Allows you to filter (thus cleaning up your list) and append new data to those requests before
sending to your target task.

Also enables a workaround to provide `requestsFromUrl` to existing actors that dont't support it natively.

## Example

Target task accepts a `startUrls` but as a plain string array:

```jsonc
{
    "taskId": "x02LumCy0WXdGP7nt",
    "requestListSources": [
        {
            "requestsFromUrl": "https://apify-uploads-prod.s3.amazonaws.com/Hhewqx4YNnyWz2qGk-data.csv"
        }
    ],
    "plainArray": true,
    "targetStartUrlsProperty": "startUrls"
}
```

Target task accepts `RequestQueue` only:

```jsonc
{
    "taskId": "x02LumCy0WXdGP7nt",
    "requestListSources": [
        {
            "requestsFromUrl": "https://apify-uploads-prod.s3.amazonaws.com/Hhewqx4YNnyWz2qGk-data.csv"
        }
    ],
    "targetStartUrlsProperty": "startUrls"
}
```

Filter out and transform the requests:

```js
{
    filter: (req) => /apify/i.test(req.url),
    map: (req) => {
        req.userData.isMapped = true;
        return req;
    },
}
```

## License

Apache 2.0