# asdf.js #
### Javascript as defined ###
A simple extension to implement strongly-typed Javascript language.

#### Syntax ####
```html
obj.defineProperty(name, descriptor);
```

#### Parameters ####
*__name : String__*  
The property name. Will throw error if property name is already defined and its descriptor is set as non-configurable.

*__descriptor? : Object__*  
The property descriptor. Default configuration will be used if descriptor or any of its configuration is not provided.  
Descriptor is an object consisting the following properties:

*type? : Function*  
Default is Object. Property configured as Object will accept any value if nullable is set to true.

*value? : any*  
Initial value of the property. Default is null. Will throw error if value type is not the same as the type configured on descriptor.

*writable? : Boolean*  
Default is false if value is a function, else true.

*nullable? : Boolean*  
Default is true. Will throw error if set to false and the initial value configured on descriptor is set to null.

*extensible? : Boolean*  
Default is false if value is a function, else true. Will be ignored if configured type is set to any non-extensible type (e.g. String, Number, Boolean.) [More about extensible (section 8.6.2, Object Internal Properties and Methods)](http://www.ecmascript.org/docs.php)

#### Example Usage ####
```html
function Person(id, name) {
	this.defineProperties({
		id: {
			type: String,
			value: id,
			writable: false,
			nullable: false
		},
		name: {
			type: String,
			value: name
		},
		equals: {
			value: function equals(person) {
				return this.id === person.id;
			}
		},
		clone: {
			value: function clone() {
				return new Person(this.id, this.name);
			}
		}
	});
};

var person1 = new Person('123', 'John Doe');
var person2 = person1.clone();

person2.defineProperty('semprul', {
	value: function semprul(person) {
		return this.name === person.name;
	},
	writable: false,
	extensible: false
});
person2.id = 'abc';						/* unchanged */
person2.name = 'Jane Doe';				/* changed */

console.log(person2.semprul(person1));	/* output is false */
console.log(person1.equals(person2));	/* output is true */
```

#### Reference ####
[ECMA-262, Edition 5](http://www.ecmascript.org/docs.php)

#### Disclaimer ####
Provided as is. Currently tested (only) on Mozilla Firefox 15.0.1