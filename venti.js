var venti = {
    "eventLogLimit": 1000,
    "registeredEvents" : {},
    "log": [],
    trigger: function (str) {
        'use strict';
        var args = Array.prototype.splice.call(arguments, 1);
        var event = this.registeredEvents[str];
        if(typeof event !== 'undefined'){
            var that = this;
            event.forEach(function(e,i,a){
                e.apply(null, args);
                that.log.push({event:str,callback: that.nameFromFunction(e)});
            });
        }else{
            console.warn('Venti - Notice: You tried to emit an event ('+str+') which is not registered.');
        }
    },
    nameFromFunction: function(callback){
        var ret = callback.toString();
        ret = ret.substr('function '.length);
        return ret.substr(0, ret.indexOf('('));
    },
    eventLog: function(limit){
        var l = this.eventLogLimit;
        if(typeof limit !== 'undefined'){ l = limit }
        return this.log.reverse().splice(0,limit);
    },
    on: function (str, callback) {
        'use strict';
        if(typeof this.registeredEvents[str] === 'undefined'){ this.registeredEvents[str] = []; }
        if(this.registeredEvents[str].indexOf(callback) !== -1){
            console.warn('Venti - Notice: You tried to re-link a function ('+this.nameFromFunction(callback)+') that was already registered to this event.');
            delete this.registeredEvents[str][this.registeredEvents[str].indexOf(callback)];
        }
        this.registeredEvents[str].push(callback);
        this.registeredEvents[str] = this.registeredEvents[str].filter(function(){return true;});
    },
    off: function (str, callback) {
        'use strict';
        if(typeof callback !== 'undefined'){
            if(typeof this.registeredEvents[str] !== 'undefined'){
                delete this.registeredEvents[str][this.registeredEvents[str].indexOf(callback)];
            }
        }else{
            if(typeof this.registeredEvents[str] !== 'undefined'){ delete this.registeredEvents[str]; }
        }

    }
};
