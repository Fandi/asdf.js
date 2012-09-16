# asdf.js #
### Javascript as defined ###

A simple extension to implement strongly-typed javascript code.

#### Syntax ####

```html
obj.defineProperty(name, descriptor);
```

#### Parameters ####

*__name__*

The property name. Note: Property redefinition is disabled, i.e. if property name is already defined and property descriptor's configurable is set to false, error will be thrown.

*__descriptor__*

A descriptor object consisting:

*__type:Function?__* default is Object.

*__value:any?__* default is null. Note: will throw error if value type is not the same as the type configured on descriptor.

*__writable:Boolean?__* default is true.

*__nullable:Boolean?__* default is true. Note: will throw error if configured value on descriptor is set to false.

*__extensible:Boolean?__* default is false. Note: ignored if type configuration is any non-extensible type (e.g. String, Number, Boolean, etc.) Reference: [ECMA-262, Edition 5 - section 8.6.2 - Object Internal Properties and Methods](http://www.ecmascript.org/docs.php)

Default configuration will be used if not provided.

#### Example ####

```html
function Person(id, name) {
	this.defineProperty('id', {
		type: String,
		value: id,
		writable: false
	});
	this.defineProperty('name', {
		type: String,
		value: name
	});
	this.defineProperty('clone', {
		type: Function,
		value: function clone() {
			return new Person(this.id, this.name);
		},
		writable: false,
		extensible: false
	});
	this.defineProperty('equals', {
		type: Function,
		value: function equals(person) {
			return this.id === person.id;
		},
		writable: false,
		extensible: false
	});
};

var person1 = new Person('123', 'John Doe');

var person2 = person1.clone();
person2.id = 'abc';
person2.name = 'Jane Doe';

console.assert(!person1.equals(person2), 'Semprul!')

```