/*
- 'use strict'
- Boolean, Number, String, Function, Object, Error, TypeError
- Object.create, Object.defineProperty, Object.defineProperties, Object.hasOwnProperty (full conformance)
- if, switch, throw, new, typeof, instanceof, for...in
*/

(function () {
	'use strict';

	var DEFAULT_DESCRIPTOR = Object.create(null, {
		type: {
			value: Object,
			enumerable: true
		},
		value: {
			value: null,
			enumerable: true
		},
		writable: {
			value: true,
			enumerable: true
		},
		nullable: {
			value: true,
			enumerable: true
		},
		extensible: {
			value: true,
			enumerable: true
		}
	});

	function validateType(type, value, nullable) {
		if (nullable === false && value == null) {
			throw new Error();
		} else {
			if (value == null) {
				return null;
			} else {
				switch (type) {
					case Object:
						return value;
					case Boolean:
						if (typeof value === 'boolean') {
							return value;
						}

						break;
					case Number:
						if (typeof value === 'number') {
							return value;
						}

						break;
					case String:
						if (typeof value === 'string') {
							return value;
						}

						break;
					case Function:
						if (typeof value === 'function') {
							return value;
						}

						break;
					default:
						if (value instanceof type) {
							return value;
						}

						break;
				}

				throw new TypeError();
			}
		}
	};

	function validateDescriptor(descriptor) {
		if (descriptor == null) {
			descriptor = {
				type: DEFAULT_DESCRIPTOR.type,
				value: DEFAULT_DESCRIPTOR.value,
				writable: DEFAULT_DESCRIPTOR.writable,
				nullable: DEFAULT_DESCRIPTOR.nullable,
				extensible: DEFAULT_DESCRIPTOR.extensible,
			};
		} else {
			if (descriptor.type == null) {
				if (descriptor.value == null) {
					descriptor.type = DEFAULT_DESCRIPTOR.type;
				} else {
					if (typeof descriptor.value === 'boolean') {
						descriptor.type = Boolean;
					} else {
						if (typeof descriptor.value === 'number') {
							descriptor.type = Number;
						} else {
							if (typeof descriptor.value === 'string') {
								descriptor.type = String;
							} else {
								if (typeof descriptor.value === 'function') {
									descriptor.type = Function;
								} else {
									descriptor.type = descriptor.value.constructor;
								}
							}
						}
					}
				}
			} else {
				descriptor.type = validateType(Function, descriptor.type, false);
			}

			if (descriptor.nullable == null) {
				descriptor.nullable = DEFAULT_DESCRIPTOR.nullable;
			} else {
				descriptor.nullable = validateType(Boolean, descriptor.nullable, false);
			}

			if (descriptor.value == null) {
				descriptor.value = DEFAULT_DESCRIPTOR.value;
			} else {
				descriptor.value = validateType(descriptor.type, descriptor.value, descriptor.nullable);
			}

			if (descriptor.writable == null) {
				descriptor.writable = DEFAULT_DESCRIPTOR.writable;
			} else {
				descriptor.writable = validateType(Boolean, descriptor.writable, false);
			}

			if (descriptor.extensible == null) {
				descriptor.extensible = DEFAULT_DESCRIPTOR.extensible;
			} else {
				descriptor.extensible = validateType(Boolean, descriptor.extensible, false);
			}
		}

		return descriptor;
	};

	function defineProperty(name, descriptor) {
		descriptor = validateDescriptor(descriptor);
		name = validateType(String, name, false);

		if (descriptor.writable === false) {
			Object.defineProperty(this, name, {
				value: descriptor.value,
				writable: false,
				enumerable: true,
				configurable: false
			});
		} else {
			Object.defineProperty(this, name, {
				get: function () {
					return descriptor.value;
				},
				set: function (value) {
					descriptor.value = validateType(descriptor.type, value, descriptor.nullable);
				},
				enumerable: true,
				configurable: false
			});
		}

		if (!descriptor.extensible) {
			try {
				Object.preventExtensions(this[name]);
			} catch (ex) {
				// String, Number, Boolean, dau other non-extensible type
			}
		}
	};

	function defineProperties(properties) {
		for (var key in properties) {
			this.defineProperty(key, properties[key]);
		}
	};

	Object.defineProperties(Object.prototype, {
		defineProperty: {
			value: defineProperty
		},
		defineProperties: {
			value: defineProperties
		}
	});
})();
