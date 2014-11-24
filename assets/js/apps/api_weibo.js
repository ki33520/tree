define(function(require, exports, module) {
	require('jquery');
	var basic = require('basic');
	module.exports = {
		load: false,
		slider: function(slider_obj){
			this.sliderObj = {
				wrap: $('.staff'),
				node: 10,
				group: 3,
				movindex: 0,
				animateLeft: 0,
				complete: function(e){
					console.log(e)
				},
				end: function(e){
					console.log(e)
				}
			};
			$.extend(this.sliderObj, slider_obj);
			console.log(this.sliderObj)
		},
		init: function(item){
			new this.slider({
				wrap: $('.staffs')
			});
		}
	};
})