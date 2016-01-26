# Venti
Ultra-tiny custom event emitter for Javascript

**Venti Supports multiple callbacks, you can link unlimited callbacks to a single event**

To use just add Venti through a script tag and start using. This is in no way a solution to the majority of situations that you are in, if you are in need of a robust event management system then there are plenty others out there. However if you only want to link a few custom events and send data then this is for you.

##Registering and Triggering Events##

Register event like so:

`venti.on('eventName',functionName);`

You can trigger events like so

`venti.trigger('eventName');`

####Passing Data####

if you want to pass data to your function you can do so in the form of an object like so

`venti.trigger('eventName',{Data Goes Here});`

the second argument gets passed as one parameter to your function so if you you trigger something like this:

```
venti.on('myFunctionEvent',myFunction);
venti.trigger('myFunctionEvent',{names:['Tony','Gus','Fred']});
```

your function would look like this...

```
myFunction(data){
  console.log(data.names); //Prints ['Tony','Gus','Fred']
}
```

##Unregistering events##

Unregistering events is very simple, you can pass the name of the event to remove everything associated with that event name.

`venti.off('eventName');`

Or you can pass the callback as the second parameter in order to unregister that specific function from the event.

`venti.off('eventName',callback);`

##Logging##

Venti logs all events that are triggered, to view the log simply use.

`venti.eventLog(50) //Optional limit parameter (E.G. Only show the most recent 50)`

By default if no parameter is passed to `.eventLog()` then Venti defaults to 1000; you can change this by modifying `venti.eventLogLimit`.

##Misc##

As it is required by the logging system, Venti can also return the plaintext name of a callback, simply use `venti.nameFromFunction(callback)` to retrieve the name of the function, this might be useful if you wish to log custom messages of your own.



