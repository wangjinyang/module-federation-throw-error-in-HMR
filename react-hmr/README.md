# Module federation Throw Error In HMR When Compile A Async Chunk

- The Async Chunk entry `import('./lazyHeadIng') in react-hmr/host/src/App.js
- The Async Chunk lazyHeadIng is react-hmr/host/src/lazyHeadIng.js

## <span id="step-app">step app</span>

```shell
git clone git@github.com:wangjinyang/module-federation-throw-error-in-HMR.git
cd react-hmr
yarn install
yarn start
```

visit [http://localhost:3000](http://localhost:3000)

## current behavior

- Host runs at http://localhost:3000  (HMR supported)
- Remote runs at http://localhost:3001

remote has been compiled successfully, when add remote module code to host in react-hmr/host/src/lazyHeadIng.js as below:

```javascript
import Heading from 'remote/Heading';
console.log("-> Heading", Heading);
export default <Heading />
```
1. hmr laod main.af01145017c5a662d467.hot-update.js
    ```javascript
    "use strict";
    self["webpackHotUpdateremote1"]("main",{},
    /******/ function(__webpack_require__) { // webpackRuntimeModules
    /******/ /* webpack/runtime/getFullHash */
    /******/ (() => {
    /******/ 	__webpack_require__.h = () => ("06a8b92c17c93dee1b1d")
    /******/ })();
    /******/ 
    /******/ /* webpack/runtime/remotes loading */
    /******/ (() => {
    /******/ 	var chunkMapping = {
    /******/ 		"src_bootstrap_js": [
    /******/ 			"webpack/container/remote/libs/react",
    /******/ 			"webpack/container/remote/libs/react-router-dom",
    /******/ 			"webpack/container/remote/libs/react-dom"
    /******/ 		],
    /******/ 		"webpack_container_remote_remote_Button": [
    /******/ 			"webpack/container/remote/remote/Button"
    /******/ 		],
    /******/ 		"src_lazyHeadIng_js": [
    /******/ 			"webpack/container/remote/remote/Heading"
    /******/ 		]
    /******/ 	};
    /******/ 	var idToExternalAndNameMapping = {
    /******/ 		"webpack/container/remote/libs/react": [
    /******/ 			"default",
    /******/ 			"./react",
    /******/ 			"webpack/container/reference/libs"
    /******/ 		],
    /******/ 		"webpack/container/remote/libs/react-router-dom": [
    /******/ 			"default",
    /******/ 			"./react-router-dom",
    /******/ 			"webpack/container/reference/libs"
    /******/ 		],
    /******/ 		"webpack/container/remote/libs/react-dom": [
    /******/ 			"default",
    /******/ 			"./react-dom",
    /******/ 			"webpack/container/reference/libs"
    /******/ 		],
    /******/ 		"webpack/container/remote/remote/Button": [
    /******/ 			"default",
    /******/ 			"./Button",
    /******/ 			"webpack/container/reference/remote"
    /******/ 		],
    /******/ 		"webpack/container/remote/remote/Heading": [
    /******/ 			"default",
    /******/ 			"./Heading",
    /******/ 			"webpack/container/reference/remote"
    /******/ 		]
    /******/ 	};
    /******/ 	__webpack_require__.f.remotes = (chunkId, promises) => {
    /******/ 		if(__webpack_require__.o(chunkMapping, chunkId)) {
    /******/ 			chunkMapping[chunkId].forEach((id) => {
    /******/ 				var getScope = __webpack_require__.R;
    /******/ 				if(!getScope) getScope = [];
    /******/ 				var data = idToExternalAndNameMapping[id];
    /******/ 				if(getScope.indexOf(data) >= 0) return;
    /******/ 				getScope.push(data);
    /******/ 				if(data.p) return promises.push(data.p);
    /******/ 				var onError = (error) => {
    /******/ 					if(!error) error = new Error("Container missing");
    /******/ 					if(typeof error.message === "string")
    /******/ 						error.message += '\nwhile loading "' + data[1] + '" from ' + data[2];
    /******/ 					__webpack_modules__[id] = () => {
    /******/ 						throw error;
    /******/ 					}
    /******/ 					data.p = 0;
    /******/ 				};
    /******/ 				var handleFunction = (fn, arg1, arg2, d, next, first) => {
    /******/ 					try {
    /******/ 						var promise = fn(arg1, arg2);
    /******/ 						if(promise && promise.then) {
    /******/ 							var p = promise.then((result) => (next(result, d)), onError);
    /******/ 							if(first) promises.push(data.p = p); else return p;
    /******/ 						} else {
    /******/ 							return next(promise, d, first);
    /******/ 						}
    /******/ 					} catch(error) {
    /******/ 						onError(error);
    /******/ 					}
    /******/ 				}
    /******/ 				var onExternal = (external, _, first) => (external ? handleFunction(__webpack_require__.I, data[0], 0, external, onInitialized, first) : onError());
    /******/ 				var onInitialized = (_, external, first) => (handleFunction(external.get, data[1], getScope, 0, onFactory, first));
    /******/ 				var onFactory = (factory) => {
    /******/ 					data.p = 1;
    /******/ 					__webpack_modules__[id] = (module) => {
    /******/ 						module.exports = factory();
    /******/ 					}
    /******/ 				};
    /******/ 				handleFunction(__webpack_require__, data[2], 0, 0, onExternal, 1);
    /******/ 			});
    /******/ 		}
    /******/ 	}
    /******/ })();
    /******/ 
    /******/ }
    );
    //# sourceMappingURL=main.af01145017c5a662d467.hot-update.js.map
    ```
    the remote chunk `webpack/container/remote/remote/Heading` be been add to runtime by `__webpack_require__.f.remotes`.

1. throw error 
    
    - error in chrome console
    
    ```javascript
    remotes loading:76 Uncaught (in promise) ReferenceError: __webpack_modules__ is not defined
        at onFactory (remotes loading:76:1)
        at remotes loading:63:1
        at async Promise.all (:3000/index 0)
    ```
    - error show browser
    
    ```javascript
    ReferenceError
    __webpack_modules__ is not defined
    Call Stack
    onFactory
    main.af01145017c5a662d467.hot-update.js:86:15
    undefined
    main.af01145017c5a662d467.hot-update.js:73:51
    ```

## expected behavior

HMR work fine when dynamically add a module federation code to async chunk;  

## <span id="reproduce">steps to reproduce</span>

1. follow [step app](#step-app) start App
1. visit [http://localhost:3000](http://localhost:3000) and everything worked
1. Uncomment the code below in `react-hmr/host/src/lazyHeadIng.js`
   ```javascript
    // import Heading from 'remote/Heading';
    // console.log("-> Heading", Heading);
    // export default <Heading />
   ```
1. comment the code `export default null` in `react-hmr/host/src/lazyHeadIng.js`
1. save changes `command + s`

## quick fixbug

- react-hmr/node_modules/webpack/lib/container/RemoteRuntimeModule.js code position [line:column] 114:52, 76:30

- replace `webpack_modules[id]` to `webpack_require.m[id]`

- followed [steps to reproduce](#reproduce), no errors, hmr worked fine.
