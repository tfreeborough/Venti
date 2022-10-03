type EventLog = {
    event: string,
    callback: string,
}

class Venti {
    eventLogLimit = 1000;
    registeredEvents: any = {};
    log: EventLog[] = [];

    private static _instance: Venti;

    private constructor() { }

    public static instance(): Venti {
        if(!Venti._instance){
            Venti._instance = new Venti();
        }
        return Venti._instance;
    }

    trigger(str: string, data: any = undefined){
        const events = this.registeredEvents[str];
        if(events){
            events.forEach((e: Function) => {
                e(data);
                this.log.push({event:str,callback: this.nameFromFunction(e)});
            });
        } else {
            console.warn('Venti - Notice: You tried to emit an event ('+str+') which is not registered.');
        }
    }

    nameFromFunction(callback: Function) {
        let ret = callback.toString();
        ret = ret.substring('function '.length);
        return ret.substring(0, ret.indexOf('('));
    }

    eventLog(limit: number = this.eventLogLimit) {
        return this.log.reverse().splice(0,limit);
    }

    /**
     * Returns all calls ordered by most recent for a given event name
     * can also take an optional limit that defaults to the
     * eventLogLimit just in case you have an event that
     * fires loads of times.
     * @param eventName
     * @param limit
     */
    getCallsForEvent(
      eventName: string,
      limit: number = this.eventLogLimit
    ) {
        return this.log.reverse()
          .filter((e) => e.event === eventName)
          .splice(0,limit)
    }

    on(str: string, callback: Function) {
        if(typeof this.registeredEvents[str] === 'undefined'){
            this.registeredEvents[str] = [];
        }
        if(this.registeredEvents[str].indexOf(callback) !== -1){
            if(typeof callback == 'undefined'){
                console.error('Venti - You have declared an undefined function inside your .on function for event '+str);
            }else{
                console.warn('Venti - Notice: You tried to re-link a function ('+this.nameFromFunction(callback)+') that was already registered to this event.');
            }
            delete this.registeredEvents[str][this.registeredEvents[str].indexOf(callback)];
        }
        this.registeredEvents[str].push(callback);
        this.registeredEvents[str] = this.registeredEvents[str].filter(function(){return true;});
    }

    off(str: string, callback: Function) {
        if(callback){
            if(typeof this.registeredEvents[str] !== 'undefined'){
                delete this.registeredEvents[str][this.registeredEvents[str].indexOf(callback)];
            }
        }else{
            if(typeof this.registeredEvents[str] !== 'undefined'){ delete this.registeredEvents[str]; }
        }

    }
}

export default Venti.instance();
