var Detect = (function() {
	var div = document.createElement('div')
		, vendors = 'Khtml Ms O Moz Webkit'.split(' ')
      	, len = vendors.length;
	
	function cssSupport(prop) {
		if (prop in div.style) return true;

		prop = prop.replace(/^[a-z]/, function(v) {
			return v.toUpperCase();
		});

		while (len--) {
			if (vendors[len] + prop in div.style) {
				return true;
			}
		}

		return false;
	}
	var transitionSupport = cssSupport('transition');
	return {
		/**
		 * browser version
		 *
		 * TODO
		 */
		browser : '',
		/**
		 * judge xhr2 support
		 */
		xhr2: !!new XMLHttpRequest().upload,
		/**
		 * transition attribute support
		 */
		transition : transitionSupport
	}
}());

(function(){
	// 图片目录
	var catalog = {};
	// 填充carousel图片
	$('.mudules-description').find('[data-type]').each(function(idx){
		catalog[idx] = [];

		var $self = $(this);
		var type = $self.data('type');
		var after = '';
		var tmpl = '<div class="carousel2">';
			tmpl +='	<div class="carousel-imgs-wrapper">';
			tmpl +=' 		<ul>';
		
		var imgs = MODULE_IMGS[type];
		for(var i = 0,l = imgs.length; i<l ; i++){
			var title = imgs[i].title || '';
			
			if(imgs[i].others && imgs[i].others.length){
				tmpl +='<li>';
				tmpl += '	<a title="'+title+'" rel="'+ imgs[i].id +'" href="'+ imgs[i].others[0] +'"><img data-src="'+imgs[i].name+'" alt=""></a>';
				tmpl += '</li>';
				for(var j = 1, l2 = imgs[i].others.length; j < l2; j++){
					after +='<a title="'+title+'" rel="'+ imgs[i].id +'" style="display:none;" href="'+imgs[i].others[j]+'"><img data-src="'+imgs[i].others[j]+'" alt=""></a>';
				}
			}else{
				tmpl +='<li>';
				tmpl += '	<a title="'+title+'"><img data-src="'+imgs[i].name+'" alt=""></a>';
				tmpl += '</li>';
			}
			catalog[idx].push(imgs[i].id);
		}

			tmpl +='		</ul>';
			tmpl +='	</div>';
			tmpl +='	<div class="carousel-toggles-wrapper">';
			tmpl +='	</div>';
			
			tmpl += after;

			tmpl +='</div>';
		
		$self.append(tmpl);
	});

	$('.carousel2').each(function(idx){
		var types = catalog[idx];
		for(var i = 0; i < types.length; i++){
			$(this).find('a[rel='+types[i]+']').fancybox();
		}
	});

	function slide(dom, position){
		var originLeft = dom.offsetLeft;
		var targetLeft = position.left;
		var direction = 1; // left
		if(targetLeft < originLeft){
			// left
			direction = 1;
		}else{
			// right
			direction = 0;
		}
		var duration = position.duration || 800;
		var unit = ((targetLeft - originLeft)/duration) * 20;
		originLeft += unit;
		dom.style.left = originLeft + 'px';
		var interval = setInterval(function(){
			originLeft += unit;
			if(direction){
				if(originLeft <= targetLeft){
					originLeft = targetLeft;
					clearInterval(interval);
				}
			}else{
				if(originLeft >= targetLeft){
					originLeft = targetLeft;
					clearInterval(interval);
				}
			}
			dom.style.left = originLeft + 'px';
		}, 20);
	}

	var carousel2 = function(option){
		var domC2 = option.elem;
		var ul = domC2.getElementsByTagName('ul')[0];
		var ol = domC2.getElementsByTagName('ol')[0];
		var togglesWrapper = domC2.children[1];
		
		var liNumber = ul.children.length;
		var unitWidth = 84;
		var ulWidth = parseInt(liNumber * unitWidth);
		ul.style.width = ulWidth + 'px';
		
		var domC2Width = 420;
		var groupNumber = Math.ceil(ulWidth/domC2Width);
		var tmpl = '';
		for(var i = 0; i < groupNumber; i++){
			tmpl += '<a href="###"></a>';
		}
		if(groupNumber > 1){
			togglesWrapper.innerHTML = tmpl;
		}

		var lastLeftMove = this.calcLastLeftMove(ulWidth, domC2Width, groupNumber);
		var toggles = togglesWrapper.children;
		var self = this;


		self.togglesWrapper = togglesWrapper;
		self.lastLeftMove = lastLeftMove;
		self.domC2Width = domC2Width;
		self.ul = ul;
		self.showGroup(0);
		for(var i = 0, l = toggles.length; i<l; i++){
			toggles[i].onclick = (function(idx){
				return function(){
					for(var j = 0; j<l; j++){
						toggles[j].className = '';
					}
					toggles[idx].className = 'active';
					self.showGroup(idx);
					return false;
				}
			}(i));
		}
	}
	carousel2.prototype = {
		showGroup : function(idx){
			if(this.currentGroup === idx){
				return;
			}
			if(idx < 0){
				return;
			}
			var toggles = this.togglesWrapper.children;
			if(idx >= toggles.length ){
				idx = 0;
			}

			// color toggle
			for(var i = 0, len = toggles.length; i < len; i++){
				if(i === idx){
					toggles[i].className = 'active';
				}else{
					toggles[i].className = '';
				}
			}

			// slide ul
			if(idx === (toggles.length - 1)){
				var leftWill = this.lastLeftMove;
			}else{
				var leftWill = parseInt(this.domC2Width * idx);
			}
			if(Detect.transition){ // support transition
				this.ul.style.left = '-' + leftWill + 'px';
			}else{
				slide(this.ul, {left : (0-leftWill), duration : 600});
			}

			this.currentGroup = idx;
			idx && this.lazyLoadImgsAt(this.currentGroup); // 第一组不做加载，第一组在index.js中控制加载
		},
		calcLastLeftMove : function(ulWidth, ctnWidth, groupNumber){
			return ctnWidth * (groupNumber-1) - (ctnWidth * groupNumber - ulWidth);
		},
		lazyLoadImgsAt : function(groupNumber){
			var end = (groupNumber + 1) * 5;
			if(end >= this.ul.children.length){
				end = this.ul.children.length;
			}
			var start = end - 5;
			var imgs = this.ul.getElementsByTagName('img');
			for(var i = start; i<end; i++){
				if(imgs[i]){
					var src = imgs[i].getAttribute('src');
					if(!src){
						imgs[i].src = imgs[i].getAttribute('data-src');
					}
				}
			}
		}
	}

	window.carousel2 = carousel2;
}());