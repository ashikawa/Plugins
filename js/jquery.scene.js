/**
 * コンテンツ切り替え用プラグイン
 * 
 * @author a.shigeru
 */
/*global $,jQuery*/
(function ($) {
	
	$.fn.extend({
		
		scene: function (config) {
			
			this.each(function (i, e) {
				
				var $wrapper	= $(this),
					$contents	= $wrapper.children();
				
				
				function change(key) {
					
					$contents.hide();
					$(key, $wrapper).show();
				}
				
				$contents.hide();
				
				if (config.top) {
					$(config.top, $wrapper).show();
				} else {
					$contents.first().show();
				}
				
				$(config.trigger, $wrapper).click(function (e) {
				
					var $trigger	= $(this),
						target		= $trigger.attr("href");
					
					change(target);
					
					return false;
				});
				
				$wrapper.bind("scene:goto", function (e, key) {
					change(key);
				});
			});
			
						
			return this;
		}
	});
	
}(jQuery));
