/**
 * フォーム操作用　ユーティリティプラグイン
 */
/*global $,jQuery*/
(function ($) {
	
	$.fn.extend({
		enable: function (flag) {
			if (flag === false) {
				this.attr("disabled", "disabled");
			} else {
				this.removeAttr("disabled");
			}
			return this;
		},
		setOptions: function (obj) {
			
			$(this).each(function () {
				
				var self = this,
					i = 0;
				
				// all clear
				for (i = 0; i < self.options.length; i++) {
					self.options[i] = null;
				}
				
				i = 0;
				$.each(obj, function (key, value) {
					self.options[i++] = new Option(value, key);
				});
			});
			return this;
		}
	});
}(jQuery));
