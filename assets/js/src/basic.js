define(function(require, exports, module) {
	require('jquery');
	$.extend({
		queryString: function(str){
			var sValue=location.search.match(new RegExp("[\?\&]"+str+"=([^\&]*)(\&?)","i"));
			return sValue?sValue[1]:sValue;
		},
		loadContent: function(_data){
			function rp(d){
				if(!d.area.load){
					d.area.loadAjax = $.ajax({
						type: "GET",
						url: d.url,
						dataType: "html",
						success: function(msg){
							d.area.tmp = msg;
							$(d.wrap).html(msg);
						}
					});
				}else{
					$(d.wrap).html(d.area.tmp);
				};
			};
			if(_data instanceof Array){
				for(var i=0; i<_data.length; i++){
					rp(_data[i]);
				}
			}else{
				rp(_data);
			}
			
		}
	});
})