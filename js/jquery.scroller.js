/**
 * jQuery Scroller Plugin
 *     window scroll イベントリスナの拡張
 * 
 * @author a.shigeru
 * @todo unbind events etc
 */
/*global $, jQuery */
(function ($) {
	
	$.fn.extend({
		scroller: function (callback) {
			
			// @todo body 以外のやつ
			var $base	= $(this),
				$body	= $("body");
			
			
			function scrollCallback(e) {
				var p = {
					scrollTop	: $base.scrollTop(),
					scrollLeft	: $base.scrollLeft(),
					
					// コンテンツ全体のサイズ
					contentsHeight	: $body.height(),
					contentsWidth	: $body.width(),
					
					// 標示領域の幅
					windowHeight	: $base.height(),
					windowWidth		: $base.width()
				};
				
				/**
				 * @todo Nan Infinity
				 */
				// ポジション (%)	 = スクロール位置 / ( コンテンツのサイズ - 表示サイズ )
				p.positionTop	= p.scrollTop / (p.contentsHeight - p.windowHeight);
				p.positionLeft	= p.scrollLeft / (p.contentsWidth - p.windowWidth);
				
				callback(p, e);
			}
			
			this.each(function () {
				$(this).bind("scroll resize", scrollCallback);
			});
			
			return this;
		}
	});
	
}(jQuery));
