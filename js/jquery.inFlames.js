/**
 * jQuery inFlames Plugin
 *    要素が画面内に表示されているか判定するプラグイン
 * 
 * @author a.shigeru
 */
/*global $, jQuery */
(function ($) {
	
	var $window		= $(window);
	
	$.fn.extend({
		
		inFlames: function (isin, isout) {
			
			this.each(function () {
				
				var $this		= $(this);
				
				$window.bind("scroll resize", function(e){
					
					var scrollTop	= $window.scrollTop(),
						position	= $this.position(),
						height		= $this.height(),
						pTop		= position.top,
						pTail		= position.top + $this.height(),
						current		= $this.data("current");
					
					if (((scrollTop <= pTop) && (pTop <= scrollTop + height))
							|| ((scrollTop <= pTail) && (pTail <= scrollTop + height))) {
						
						if (!current) {
							$this.trigger("inflames:in");
							$this.data("current", true);
						}
						
					} else {
						
						if (current) {
							$this.trigger("inflames:out");
							$this.data("current", false);
						}
						
					}
				});
				
				if (isin) {
					$this.bind("inflames:in", function(){
						isin.apply(this, []);
					});
				}
				
				if (isout) {
					$this.bind("inflames:out", function(){
						isout.apply(this, []);
					});
				}
			});
		}
	});
	
}(jQuery));
