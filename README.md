# client-js-utils

To handle a new message juste write the following:

- For a classic method
```javascript
StreamingServices.prototype.MessageName = function (params) {
 // Do something here
};

- For a static method
```javascript
StreamingServices.MessageName = function (params) {
 // Do something here
};