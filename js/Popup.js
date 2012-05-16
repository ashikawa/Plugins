/**
 * Popup共通処理
 */
(function () {
	
	var global = (function () { return this; }());
	
	
	/**
	 * window.open 用のパラメータ
	 * オブジェクトを string に変更
	 */
	function objectToString(obj, prefix) {
		
		var key,
			comma	= false,
			ret		= "";
		
		if (!prefix) {
			prefix = ",";
		}
		
		for (key in obj) {
			
			if (!obj.hasOwnProperty(key)) {
				continue;
			}
			
			if (comma) {
				ret += prefix;
			}
			
			comma = true;
			
			ret += key + "=" + obj[key];
		}
		
		return ret;
	}

	
	/**
	 * Popup
	 * @constructor
	 */
	function Popup() {
	}
	
	Popup.prototype.open = function (url, option) {
		
		var self = this,
			dialog,
			si,
			interval	= 500,	// msec
			target		= "_blank",
			params = {
				width		: 1000,
				height		: 1000,
				menubar		: "no",
				toolbar		: "no",
				scrollbars	: "no"
			};
		
		params.left	= (window.screen.width - params.width) / 2;
		params.top	= (window.screen.height - params.height) / 2;
		
		if (option) {
			url = url + "?" + objectToString(option, "&");
		}
		
		
		
		dialog	= window.open(url, target, objectToString(params));
		
		// 左から FireFox&IE, Safari, Chrome(空のDomWindowオブジェクト)
		if (dialog === null || dialog === undefined || (dialog.closed === undefined)) {
			this.onBlock();
			return;
		}
		
		si	= window.setInterval(function () {
			
			if ((dialog !== null) && (dialog.closed)) {
				
				window.clearInterval(si);
				self.onClose();
			}
			
		}, interval);
	};
	
	Popup.prototype.onBlock = function () {};
	
	Popup.prototype.onClose = function () {};
	
	global.Popup = Popup;
}());