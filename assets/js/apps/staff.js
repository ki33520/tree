define(function(require, exports, module) {
	require('jquery');
	module.exports = {
		load: false,
		slider : function(){
			this.sliderObj = {
				wrap: $('.staff'),
				node: 15,
				group: 5,
				movindex: 0,
				animateLeft: 0,
				complete: function(e){
					console.log(e)
				},
				change: function(e){
					console.log(e)
				}
			};
			this.sliderConfig = function(){
				var sf = this,
					o = this.sliderObj,
					handle = $('<div class="handle"></div>'),
					tmp = $('<div class="line"></div>'),
					handle_percent = o.group/o.node*100;
					handle.css({width:handle_percent+'%'}).appendTo(tmp);
				o.wrap.html(tmp);

				var start_x,moveing_x,end_x,
					handle_p_x = 0,
					group_w = Number(o.wrap.width())/o.node,
					min = 0,
					max = group_w*(o.node-o.group);
				var handle_down = function(e){
					var pageX = e.pageX ? e.pageX : e.changedTouches[0].pageX;
					handle_p_x = handle.position().left;
					start_x = pageX;
					$(window).on('mousemove',handle_move);
					$(window).on('mouseup',handle_up);
					e.preventDefault();
				};
				var handle_move = function(e){
					var pageX = e.pageX ? e.pageX : e.changedTouches[0].pageX;
					moveing_x = pageX-start_x;
					o.animateLeft = moveing_x+handle_p_x
					if(o.animateLeft<min){
						o.animateLeft = min;
					}
					if(o.animateLeft>max){
						o.animateLeft = max;
					};
					if(o.animateLeft<min){
						o.animateLeft = min;
					}else if(Math.abs(o.animateLeft-max) < group_w*(o.node%o.group)/6 || o.animateLeft>max){
						o.animateLeft = max;
					}else{
						for(var i=0; i<o.node; i++){
							if(Math.abs(o.animateLeft-i*group_w*o.group) < group_w*o.group/6){
								o.animateLeft = i*group_w*o.group;
							}
						};
					}

					handle.animate({
						left: o.animateLeft
					},0, function() {

					});
					
					e.preventDefault();
				};
				var handle_up = function(e){
					var pageX = e.pageX ? e.pageX : e.changedTouches[0].pageX;
					window.mouse_status = handle.status = 'up';
					moveing_x = pageX-start_x;
					o.animateLeft = moveing_x+handle_p_x;
					if(o.animateLeft<min){
						o.animateLeft = min;
						o.movindex = 0;
					}else if(Math.abs(o.animateLeft-max) < group_w*(o.node%o.group)/2 || o.animateLeft>max){
						o.animateLeft = max;
						o.movindex = Math.ceil(o.node/o.group)-1;
					}else{
						for(var i=0; i<o.node; i++){
							if(Math.abs(o.animateLeft-i*group_w*o.group) <= group_w*o.group/2){
								o.animateLeft = i*group_w*o.group;
								o.movindex = i;
							}
						};
					}
					o.change(o);
					handle.animate({
						left: o.animateLeft
					},0, function() {

					});
					$(window).off('mousemove',handle_move);
					$(window).off('mouseup',handle_up);
					e.preventDefault();
				};
				handle.on('mousedown',handle_down);
				handle[0].addEventListener('touchstart',handle_down);
				handle[0].addEventListener('touchend',handle_up);
				handle[0].addEventListener('touchmove',handle_move);
				this.load = true;
				o.complete(o);
			};
			this.sliderConfig();
		},
		init: function(item){
			new this.slider();
		}
	};
})