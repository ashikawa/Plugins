/**
 * 汎用バリデータ
 */
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
	
	function valid(val) {
		return function (v) {
			return val.isValid(v);
		};
	}
	
	var global = (function () { return this; }()),
		methods = {
			"notEmpty": function (val) {
				return (val) ? true : false;
			},
			"notZero": function (val) {
				return (val !== 0 && val !== "0");
			},
			"mail": regex(/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/),
			"phone": regex(/^[\d\.\+\#\*\-]*$/)
		};
	
	
	function Validator(rules) {
		this.rules = rules || {};
	}
	
	Validator.prototype.addRule = function (key, rule) {
		this.rules[key] = rule;
	};
	
	Validator.prototype.isValid = function (val) {
		
		var rules = this.rules,
			rule,
			method,
			failer = {},
			result = true,
			k;
		
		if (val === undefined) {
			val = this.getValue();
		}
		
		for (k in rules) {
			
			if (!rules.hasOwnProperty(k)) {
				continue;
			}
			
			rule	= this.rules[k];
			method	= null;
			
			if (isString(rule)) {
				method = methods[rule];
			}
			
			if (rule instanceof RegExp) {
				method = regex(rule);
			}
			
			if (rule instanceof Validator) {
				method = valid(rule);
			}
			
			if (isFunction(rule)) {
				method = rule;
			}
			
			if (!method) {
				throw "wrong rule type";
			}
			
			if (!method.apply(this, [val])) {
				failer[k] = rule;
				result = false;
			}
		}
		
		if (result) {
			this.onSuccess();
		} else {
			this.onError(failer);
		}
		
		return result;
	};
	
	Validator.prototype.getValue	= function () {};
	Validator.prototype.onError		= function () {};
	Validator.prototype.onSuccess	= function () {};
	
	
	global.Validator = Validator;
}());
