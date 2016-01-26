var vent = {
    "registeredEvents" : {},
    emit: function (str) {
        'use strict';
        var args = Array.prototype.splice.call(arguments, 1);
        var event = this.registeredEvents[str];
        event.forEach(function(e,i,a){
            e.apply(null, args);
        });
    },
    link: function (str, callback) {
        'use strict';
        if(typeof this.registeredEvents[str] === 'undefined'){ this.registeredEvents[str] = []; }
        this.registeredEvents[str].push(callback);
    }
};
