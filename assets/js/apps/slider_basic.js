define(function(require, exports, module) {
	require('jquery');
	var basic = require('basic');
	module.exports = {
		load: false,
		sliderConfig: function(){
			var sf = this,
				o = this.sliderObj,
				handle_percent = o.group/o.node*100;
			o.handle.css({width:handle_percent+'%'}).appendTo(o.tmp);
			o.wrap.html(o.tmp);
			function movestart(e){
				o.handle.overBL = true;
				$(window).on('mousemove',moving);
				//console.log(e);
			};
			function moving(e){
				if(o.handle.overBL){
					console.log(o.handle);
				}
				//console.log(e);
			};
			function movend(e){
				o.handle.overBL = false;
				//console.log(e);
			};
			o.handle.on('mousedown',movestart);
			
			$(window).on('mouseup',movend);
		},
		slider: function(ext_obj){
			defaultObj = {
				wrap: $('body'),
				handle: $('<div class="handle"></div>'),
				tmp: $('<div class="line"></div>'),
				node: 10,
				group: 1,
				startIndex: 0,
				activeIndex: 0,
				animateLeft: 0,
				start: function(e){
					//cosole.log(e)
				},
				complete: function(e){
					//console.log(e)
				},
				end: function(e){
					//console.log(e)
				}
			};
			this.sliderObj = $.extend(defaultObj, ext_obj);
			this.sliderConfig();
		},
		init: function(){
			this.slider({
				wrap: $('.slider_1')
			});
			this.slider({
				wrap: $('.slider_2'),
				node: 20,
				group: 3
			});
			this.slider({
				wrap: $('.slider_3'),
				node: 10,
				group: 2
			});
		}
	};
})