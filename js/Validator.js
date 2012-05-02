(function () {
	
	function isFunction(x) {
		return Object.prototype.toString.call(x) === "[object Function]";
	}
	
	function isString(obj) {
		return (typeof (obj) === "string" || obj instanceof String);
	}
	
	function regex(reg) {
		return function (val) {
			return reg.test(val);
		};
	}
	
	
	var global = (function () { return this; }()),
		methods = {
			"notEmpty": function (val) {
				return (val) ? true : false;
			},
			"mail": regex(/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/),
			"phone": regex(/^[\d\.\+\#\*\-]*$/)
		};
	
	
	function Validator(rules) {
		this.rules = rules;
	}
	
	Validator.prototype.addRule = function (rule) {
		this.rules.push(rule);
	};
	
	Validator.prototype.isValid = function (val) {
		
		var len = this.rules.length,
			rule,
			i;
		
		for (i = 0; i < len; i++) {
			
			rule = this.rules[i];
			if (isString(rule)) {
				rule = methods[rule];
			}
			
			if (rule instanceof RegExp) {
				rule = regex(rule);
			}
			
			if (!rule.apply(this, [val])) {
				return false;
			}
		}
		return true;
	};
	
	global.Validator = Validator;
}());
