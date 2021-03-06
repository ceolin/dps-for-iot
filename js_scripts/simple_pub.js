var dps = require('dps');

var simple_pub = (function(){
    var onAck = function(pub, payload) {
        console.log("PubAck " + dps.PublicationGetUUID(pub) + "/" + dps.PublicationGetSequenceNum(pub));
        console.log("Payload " + payload);
    };
    var publish = function() {
        dps.Publish(pub, "world", 0);
        setTimeout(stop, 100);
    };
    var stop = function() {
        dps.DestroyPublication(pub);
        dps.DestroyNode(node);
    }
    /* Set to 1 to enable DPS debug output */
    dps.Debug = 1;

    var node = dps.CreateNode("/", null, 0);
    dps.StartNode(node, dps.MCAST_PUB_ENABLE_SEND, 0);
    var pub = dps.CreatePublication(node);

    dps.InitPublication(pub, ['a/b/c'], 0, 0, onAck);
    dps.Publish(pub, "hello", 0);
    setTimeout(publish, 100);
})();
