# Venti ![Venti Logo](http://i.imgur.com/8NWTW1r.png "Venti")
Ultra-tiny custom event emitter for Javascript 

### NPM - https://www.npmjs.com/package/venti-js

A very simple out of the box library I first made in 2016 that allows you to bind multiple callback to an event and call it with/without data. Perfect if you just want a quick and easy way to call events in an application without worrying about prop drilling.

###Installation
To install from npm, run the following:
```
npm install --save venti-js
```

### Usage

---

#### Register Events
Register an event name with the callback you want to call:

```typescript
venti.on('eventName',functionName);
```

---

#### Unregistering Events

Unregistering events is very simple just pass the event name to unbind all callbacks

```typescript
venti.off('eventName');
```


Or you can pass the callback as the second parameter in order to unregister that specific function from the event.

```typescript
venti.off('eventName',callback);
```

---

#### Trigger Events
Triggering events is simple and done as follows:

```typescript
venti.trigger('eventName');
```

You can also pass data into your trigger that will be passed to the callback:

```typescript
venti.trigger('eventName',{Data Goes Here});
```

---

#### How to use data
Your data passed as the second argument in `.trigger`is sent as one argument
into the callback as an object.

```typescript
venti.on('myFunctionEvent',myFunction);
venti.trigger('myFunctionEvent',{names:['Tony','Gus','Fred']});
```

Your callback would look like this...

```typescript
myFunction(data){
  console.log(data.names); //Prints ['Tony','Gus','Fred']
}
```

---

#### Debugging

Venti logs all events that are triggered, to view the log simply use.

```typescript
venti.eventLog(50) //Optional limit parameter (E.G. Only show the most recent 50)
```

By default if no parameter is passed to `.eventLog()` then Venti defaults to 1000; you can change this by modifying `venti.eventLogLimit`.

### Does this work with React?
Yes, just import it like you would any modern ES6 package:
```typescript
import venti from 'venti-js'
```

Typical react usage in a useEffect

```typescript
import React, { ReactElement, useEffect, useState } from 'react';
import venti from 'venti-js';

export const MyComponent: React.FC = (): ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleSetModalTitle = (data) => {
    setModalTitle(data.title);
  };

  useEffect(() => {
    venti.on('modalOpen', handleOpenModal);
    venti.on('setModalTitle', handleSetModalTitle);

    return () => {
      venti.off('modalOpen');
      venti.off('setModalTitle');
    };
  }, []);

  if (!modalOpen) {
    return null;
  }
  
  return (
    <div className="myModal">
      <h1>{ modalTitle }</h1>
    </div>
  );
};

export default MyComponent;
```

Usage with multiple callbacks

```typescript
import React, { ReactElement, useEffect, useState } from 'react';
import venti from 'venti-js';

export const MyComponent: React.FC = (): ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({});

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  
  const handleResetFormState = () => {
    setFormState({});  
  }

  useEffect(() => {
    venti.on('modalOpen', handleOpenModal);
    venti.on('modalOpen', handleResetFormState);

    return () => {
      venti.off('modalOpen');
    };
  }, []);

  if (!modalOpen) {
    return null;
  }
  
  return (
    <div className="myModal">
      // Form Stuff goes here
    </div>
  );
};

export default MyComponent;
```


### Misc

As it is required by the logging system, Venti can also return the plaintext name of a callback, simply use `venti.nameFromFunction(callback)` to retrieve the name of the function, this might be useful if you wish to log custom messages of your own.



