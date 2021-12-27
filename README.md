#### Death probability table by age
| age | probability |  
| -- | --|
| 1 | 0% | 
| 5 | 1% | 
| 10 | 3% | 
| 15 | 7% |  
| 20 | 12% | 
| 25 | 17% | 
| 30 | 22% | 
| 35 | 27% | 
| 40 | 32% | 
| 45 | 37% | 
| 50 | 42% | 
| 55 | 47% | 
| 60 | 52% | 
| 65 | 57% | 
| 70 | 62% | 
| 75 | 67% | 
| 80 | 72% | 
| 85 | 77% |
| 90 | 82% |


analyzing the data what percentage of chance I die today? and what could be the cause of my death?

## Firestore

### REST API

#### Type

[https://cloud.google.com/firestore/docs/reference/rest/Shared.Types/ArrayValue#Value](https://cloud.google.com/firestore/docs/reference/rest/Shared.Types/ArrayValue#Value)

```json
{

  // Union field value_type can be only one of the following:
  "nullValue": null,
  "booleanValue": boolean,
  "integerValue": string,
  "doubleValue": number,
  "timestampValue": string,
  "stringValue": string,
  "bytesValue": string,
  "referenceValue": string,
  "geoPointValue": {
    object (LatLng)
  },
  "arrayValue": {
    object (ArrayValue)
  },
  "mapValue": {
    object (MapValue)
  }
  // End of list of possible types for union field value_type.
}
```

#### URL

[https://cloud.google.com/firestore/docs/reference/rest/v1/projects.databases.documents#Document](https://cloud.google.com/firestore/docs/reference/rest/v1/projects.databases.documents#Document)

##### GET

```bash
curl --location --request GET 'https://firestore.googleapis.com/v1/projects/mydeathapp/databases/(default)/documents/ip-api'
```

##### POST

```bash
curl --location --request POST 'https://firestore.googleapis.com/v1/projects/mydeathapp/databases/(default)/documents/ip-api' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fields": {
        "title": {
            "stringValue": "123"
        }
    }
}'
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
