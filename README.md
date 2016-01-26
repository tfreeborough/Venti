# Venti
Ultra-tiny custom event emitter for Javascript

**Venti Supports multiple callbacks, you can link unlimited callbacks to a single event**

To use just add Venti through a script tag and start using. This is in no way a solution to the majority of situations that you are in, if you are in need of a robust event management system then there are plenty others out there. However if you only want to link a few custom events and send data then this is for you.

##Linking and Emitting Events##

Link event like so:

`venti.link('eventName',functionName);`

You can emit events like so

`venti.emit('eventName');`

####Passing Data####

if you want to pass data to your function you can do so in the form of an object like so

`venti.emit('eventName',{Data Goes Here});`

the second argument gets passed as one parameter to your function so if you you emit something like this:

```
venti.link('myFunctionEvent',myFunction);
venti.emit('myFunctionEvent',{names:['Tony','Gus','Fred']});
```

your function would look like this...

```
myFunction(data){
  console.log(data.names); //Prints ['Tony','Gus','Fred']
}
```

##Unlinking##

Unlinking events is very simple, you can pass the name of the event to remove everything associated with that event name.

`venti.unlink('eventName');`

Or you can pass the callback as the second parameter in order to unlink that specific function from the events.

`venti.unlink('eventName',callback);`

##Logging##

Venti logs all events that are emitted, to view the log simply use.

`venti.log(50) //Optional limit parameter (E.G. Only show the most recent 50)`

By default if no parameter is passed to `.log()` then Venti defaults to 1000; you can change this by modifying `venti.eventLogLimit`.

##Misc##

As it is required by the logging system, Venti can also return the plaintext name of a callback, simply use `venti.nameFromFunction(callback)` to retrieve the name of the function, this might be useful if you wish to log custom messages of your own.



