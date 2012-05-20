/**
 * jQuery Scroller Plugin
 *    window scroll イベントリスナの拡張
 *    
 * 対応: jQuery 1.6 以上 (prop の挙動のため)
 * 
 * @author a.shigeru
 * 
 * @todo unbind events etc
 */
/*global $, jQuery */
(function ($) {
	
	$.fn.extend({
		scroller: function (callback) {
			
			this.each(function () {
				
				var $this	= $(this);
				
				function scrollCallback(e) {
					var p = {
						scrollTop	: $this.scrollTop(),
						scrollLeft	: $this.scrollLeft(),
						
						// コンテンツ全体のサイズ
						contentsHeight	: $this.prop("scrollHeight"),
						contentsWidth	: $this.prop("scrollWidth"),
						
						// 標示領域の幅
						windowHeight	: $this.height(),
						windowWidth		: $this.width()
					};
					
					/**
					 * @todo Nan Infinity
					 */
					// ポジション (%)	 = スクロール位置 / ( コンテンツのサイズ - 表示サイズ )
					p.positionTop	= p.scrollTop / (p.contentsHeight - p.windowHeight);
					p.positionLeft	= p.scrollLeft / (p.contentsWidth - p.windowWidth);
					
					callback.apply(this, [p, e]);
				}
			
				$(this).bind("scroll resize", scrollCallback);
			});
			
			return this;
		}
	});
	
}(jQuery));
