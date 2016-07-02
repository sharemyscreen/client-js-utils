# client-js-utils

Streaming services has been writed to comunicate with sharemyscreen-media-server. Messages and parameters are defined [here](https://github.com/sharemyscreen/media-service/blob/master/README.md)

To handle a message, you just need to add a method to StreamingServices as shown below:

- For a method
```javascript
StreamingServices.prototype.MessageName = function (params) {
 // Do something here
};
```

- For a static method
```javascript
StreamingServices.MessageName = function (params) {
 // Do something here
};
```
