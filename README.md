# Vent
Ultra-tiny custom event emitter for Javascript

**Vent Supports multiple callbacks, you can link unlimited callbacks to a single event**

To use just add vent through a script tag and start using. This is in no way a solution to the majority of situations that you are in, if you are in need of a robust event management system then there are plenty others out there. However if you only want to link a few custom events and send data then this is for you.

##Linking and Emitting Events##

Link event like so:

`vent.link('eventName',functionName);`

You can emit events like so

`vent.emit('eventName');`


###Passing Data###

if you want to pass data to your function you can do so in the form of an object like so

`vent.emit('eventName',{Data Goes Here});`

the second argument gets passed as one parameter to your function so if you you emit something like this:

```
vent.link('myFunctionEvent',myFunction);
vent.emit('myFunctionEvent',{names:['Tony','Gus','Fred']});
```

your function would look like this...

```
myFunction(data){
  console.log(data.names); //Prints ['Tony','Gus','Fred']
}
```
