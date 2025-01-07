This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## To Reproduce

After installing the dependenpies, generate the production build:

```bash
yarn build
```

Then start the server with source map enabled:
```bash
NODE_OPTIONS=--enable-source-maps yarn start
```

Without modifying the `node_modules/next/dist/server/patch-error-inspect.js`, you should see a log like this which is not very useful to find the call site of `Where am I`:
```bash
Where am I: Error: 
    at i (.../nextjs-source-map/.next/server/app/page.js:1:31591)
    at ek (.../nextjs-source-map/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:84:13368)
    at e (.../nextjs-source-map/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:84:17266)
    at e$ (.../nextjs-source-map/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:84:17728)
    at Array.toJSON (.../nextjs-source-map/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:84:14874)
    at stringify (<anonymous>)
    at eU (.../nextjs-source-map/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:84:26231)
    at eB (.../nextjs-source-map/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:84:26461)
    at eq (.../nextjs-source-map/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:84:27015)
    at AsyncLocalStorage.run (node:async_hooks:346:14)
```

After commenting out `errorConstructor.prepareStackTrace = prepareUnsourcemappedStackTrace;` line in `patch-error-inspect.js`, and **restart the  server**, you will see the call site of `Error().stack` location as expected(ie: `/nextjs-source-map/src/app/page.tsx:4:30`).
```bash
Where am I: Error
    at i (webpack://nextjs-source-map/src/app/page.tsx:4:30)
    at renderFunctionComponent (webpack://next/dist/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.edge.production.js:1006:15)
    at renderElement (webpack://next/dist/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.edge.production.js:1082:12)
    at renderModelDestructive (webpack://next/dist/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.edge.production.js:1121:1)
    at Array.toJSON (webpack://next/dist/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.edge.production.js:1156:40)
    at stringify (<anonymous>)
    at emitChunk (webpack://next/dist/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.edge.production.js:1734:43)
    at retryTask (webpack://next/dist/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.edge.production.js:1755:11)
    at eq (webpack://next/dist/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.edge.production.js:1803:7)
    at AsyncLocalStorage.run (node:async_hooks:346:14)
```