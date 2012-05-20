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
			isfirst	= true,
			output	= "";
		
		if (!prefix) {
			prefix = ",";
		}
		
		for (key in obj) {
			
			if (!obj.hasOwnProperty(key)) {
				continue;
			}
			
			if (!isfirst) {
				output += prefix;
			}
			
			isfirst = false;
			
			output += key + "=" + obj[key];
		}
		
		return output;
	}

	
	/**
	 * Popup
	 * @constructor
	 */
	function Popup() {
		
		this.params = {
			width		: 1000,
			height		: 1000,
			menubar		: "no",
			toolbar		: "no",
			scrollbars	: "no"
		};
		
		this.target		= "_blank";
		this.interval	= 500; // msec
	}
	
	Popup.prototype.setParam = function (key, value) {
		this.params[key] = value;
	};
	
	Popup.prototype.open = function (url, option) {
		
		var self = this,
			dialog,
			si,
			interval	= this.interval,
			target		= this.target,
			params		= this.params;
		
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
		
		// ウインドウが開いているか監視
		si	= window.setInterval(function () {
			
			if ((dialog !== null) && (dialog.closed)) {
				
				window.clearInterval(si);
				self.onClose();
			}
			
		}, interval);
	};
	
	/**
	 * 実装時に上書き
	 */
	Popup.prototype.onBlock = function () {};
	
	/**
	 * 実装時に上書き
	 */
	Popup.prototype.onClose = function () {};
	
	global.Popup = Popup;
}());