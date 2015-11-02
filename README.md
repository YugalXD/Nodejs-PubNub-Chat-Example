# Nodejs-PubNub-Chat-Example
An working example of group chat in nodejs, Pubnub

PubNub for JS Docs have been moved to: http://www.pubnub.com/docs/javascript/javascript-sdk.html

Intsall Pubnub with npm:
<code>npm install pubnub</code>

Add your publish and Subscriber Key in index.js file 
<code>
var pubnub = require("pubnub")({
    publish_key   : "pub-c-####################################", // Your Publish Key
    subscribe_key : "sub-c-####################################"  // Your Subscriber Key
});
</code>

Add Subsrciber key in chat.js
