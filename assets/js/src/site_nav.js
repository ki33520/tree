define(function(require, exports, module) {
	require('jquery');
	require('basic');

	module.exports = {
		pageLoaded: false,
		setSiteNav: function(obj){
			var sf = this,
				wrap = $(obj.wrap);
			sf.data = {};
			function addListenLi(li,data){
				var listenli = function(e){
					var item = this;
					item.d = data;
					item.wrap = $('.main_content .content_server')[0];
					item.tpl = seajs.data.tplRoute+$(item).data('tpl');
					item.loadInfo = {
						area: item,
						wrap: item.wrap,
						url: item.tpl
					};
					if(data['req']){
						$.loadContent(item.loadInfo);
						seajs.use(seajs.data.jsRoute+'apps/'+data['req'],function(api){
							if(api && api.init){
								api.init();
							};
						});
					};
					//return false;
				};
				li.find('a').off('click').on('click',listenli);
				if($.queryString('lt') && $.queryString('lt') == li.find('a').data('tpl')){
					li.find('a').click();
				};
				if(!$.queryString('lt') && li.find('a').data('tpl')=='index'){
					li.find('a').click();
				};
			};
			function loadNav(msg){
				var data = sf.data.type = msg.data;
				function rp(_wrap,_data,_index,_rt){
					var rt = _rt ? _rt : '';
					_index++;
					for(var i=0;i<_data.length;i++){
						var item_text = '',
							data_href = '';
						var txt = ''
						var it = 'u';
						for(var o=0;o<_index;o++){
							txt+=it;
						};
						item_text = txt+(i+1); //rt+'_'+it+(i+1);
						data_href = rt ? rt+'_'+item_text : item_text;
						if(_data[i]['name']){
							item_text = _data[i]['name'];
						}
						
						var li = $('<li title="'+(_data[i]['title']||item_text)+'" class="l_'+i+'"><a class="'+(_data[i]['req']? "link" : "space")+'" '+(_data[i]['req']?'href="?lt='+(_data[i]['req']||"")+'"':'')+' data-href="'+data_href+'" data-tpl="'+(_data[i]['req']||"")+'" data-require="'+(_data[i]['req']||"")+'">'+item_text+'</a></li>');
						addListenLi(li,_data[i]);
						if(_data[i]['sub']){
							var ul = $('<ul class="sub sub'+_index+'"></ul>');
							ul.appendTo(li);
							rp(ul,_data[i]['sub'],_index,data_href);
						};
						li.appendTo(_wrap);
					};
				};
				wrap.html('');
				rp(wrap,data,0);
			};
			this.siteNavAjax = $.ajax({
				url: seajs.data.jsonRoute+'main_nav.json',
				dataType: 'json',
				success: loadNav
			});
		}
	};
});