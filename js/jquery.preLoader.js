/**
 * jQuery preLoader Plugin
 *     画像等コンテンツのローディングが完了したか判定するプラグイン
 * 
 * @author a.shigeru
 */
/*global $, jQuery */
(function ($) {
	
	var $window = $(window);
	
	$.fn.extend({
		preLoader: function (callback) {
			
			var loaded	= [],
				called	= false,	// 一度しか呼ばないためのフラグ
				self	= this;
			
			$window.trigger("preLoader:start");
			
			/**
			 * 全ての要素が読み込み完了したか判定、
			 *    完了していれば callback 関数の呼び出し
			 */
			function sync() {
				
				var i, l;
				for (i = 0, l = loaded.length; i < l; i++) {
					if (!loaded[i]) {
						return;
					}
				}
				
				if (!called) {
					callback.apply(self);
					called = true;
					
					$window.trigger("preLoader:complete");
				}
			}
			
			this.each(function (i, el) {
				
				var self		= this,
					$this		= $(this),
					preLoader	= new Image(),
					attr		= null,
					current;
				
				loaded[i] = false;
				
				preLoader.onload = function (e) {
					
					loaded[i] = true;
					
					if (callback) {
						sync();
					}
				};
				
				current = $this.get(0);
				
				if (current.tagName.toLowerCase() === "img") {
					attr = $(current).attr("src");
				} else {
					// url( ... ) スキームへの対応
					attr = $(current).css("backgroundImage")
						.replace(/^url\(['"]?([\w\/\.\-\:]*?)['"]?\)$/, "$1");
				}
				
				if (!attr || attr === "none") {
					return true;
				}
				
				preLoader.src = attr;
			});
			
			return this;
		}
	});
	
}(jQuery));

