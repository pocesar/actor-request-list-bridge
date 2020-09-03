# RequestList Bridge

A workaround to provide `requestsFromUrl` to existing actors that doesn't support it natively.

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

## License

Apache 2.0