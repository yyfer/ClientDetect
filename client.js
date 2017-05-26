// 参考《Javascript高级程序设计第三版》第9章客户端检测
var client = (function () {

	// 呈现引擎
	var engine = {
		ie: 0,
		gecko: 0,
		webkit: 0,
		khtml: 0,
		opera: 0,

		// 版本号
		ver: null
	}

	// 浏览器
	var brower = {
		ie: 0,
		safari: 0,
		chrome: 0,
		firefox: 0,
		konq: 0,
		opera: 0,

		// 版本号
		ver: null
	}

	// 平台、设备、操作系统
	var system = {
		win: false,
		max: false,
		x11: false,

		// 移动设备
		iphone: false,
		ipad: false,
		ipod: false,
		ios: false,
		android: false,
		nokiaN: false,
		winMobile: false,

		// 游戏系统
		wii: false,
		ps: false
	}

	// 检测呈现引擎和浏览器
	var ua = navigator.userAgent
	if (window.opera) {
		engine.ver = brower.ver = window.opera.version()
		engine.opera = brower.opera = parseFloat(engine.ver)
	} else if (/AppleWebKit\/(\S+)/.test(ua)) {
		engine.ver = RegExp['$1']
		engine.webkit = parseFloat(engine.ver)

		// 确认 chrome 还是 safari
		if (/Chrome\/(\S+)/.test(ua)) {
			brower.ver = RegExp['$1']
			brower.chrome = parseFloat(brower.ver)
		} else if (/Version\/(\S+)/.test(ua)) {
			// safari 3.0 之后都是 Version **
			brower.ver = RegExp['$1']
			brower.safari = parseFloat(brower.ver)
		} else {
			// 近似确认版本号
			var safariVersion = 1
			if (engine.webkit < 100) {
				safariVersion = 1
			} else if (engine.webkit < 312) {
				safariVersion = 1.2
			} else if (engine.webkit < 412) {
				safariVersion = 1.3
			} else {
				safariVersion = 2
			}
			brower.safari = brower.ver = safariVersion
		}
	} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
		engine.ver = brower.ver = RegExp['$1']
		engine.khtml = brower.khtml = parseFloat(engine.ver)
	} else if (/rv:([^\)]+)\)/.test(ua)) {
		engine.ver = RegExp['$1']
		engine.gecko = parseFloat(engine.ver)

		// 确认 firefox
		if (/Firefox\/(\S+)/.test(ua)) {
			brower.ver = RegExp['$1']
			brower.firefox = parseFloat(brower.ver)
		}
	} else if (/MSIE\/(\S+)/.test(ua)) {
		engine.ver = brower.ver = RegExp['$1']
		engine.ie = brower.ie = parseFloat(engine.ver)
	}

	brower.ie = engine.ie
	brower.opera = engine.opera

	// 检测平台
	var p = navigator.platform
	system.win = p.indexOf('Win') == 0
	system.max = p.indexOf('Mac') == 0
	system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0)

	// 检测windows系统
	if (system.win) {
		if (/Win(?:dows )?\s?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
			if (RegExp['$1'] == 'NT') {
				switch (RegExp['$2']) {
					case '5.0':
						system.win = '2000'
						break
					case '5.1':
						system.win = 'XP'
						break
					case '6.0':
						system.win = 'Vista'
						break
					case '6.1':
						system.win = '7'
						break
					default:
						system.win = 'NT'
						break
				}
			} else if (RegExp['$1'] == '9x') {
				system.win = 'ME'
			} else {
				system.win = RegExp['$1']
			}
		}
	}

	// 移动设备
	system.iphone = ua.indexOf('iPhone') > -1
	system.ipod = ua.indexOf('iPod') > -1
	system.ipad = ua.indexOf('iPad') > -1
	system.nokiaN = ua.indexOf('NokiaN') > -1

	// windows phone
	if (system.win == 'CE') {
		system.winMobile = system.win
	} else if (system.win == 'Ph') {
		if (/Windows Phone OS (\d+\.\d+)/.test(ua)) {
			system.win = 'Phone'
			system.winMobile = parseFloat(RegExp['$1'])
		}
	}

	// iOS 版本
	if (system.mac && ua.indexOf('Mobile') > -1) {
		if (/CPU (?:iPhone )?OS (\d+\.\d+)/.test(ua)) {
			system.ios = parseFloat(RegExp.$1.replace('_','.'))
		} else {
			system.ios = 2 // 不能真正检测出来，猜测
		}
	}

	//检测 android 版本
	if (/Android (\d+\.\d+)/.test(ua)) {
		system.android = parseFloat(RegExp['$1'])
	}

	// 游戏系统
	system.wii = ua.indexOf('Wii') > -1
	system.ps = /playstation/i.test(ua)

	//返回对象
	return {
		engine: engine,
		brower: brower,
		system: system
	}

})()