var main = {	
	opt: {
		img: $('img'),
		linc: $('a'),
		searchButton: $('.search-button'),
		fixedMenu: $('.fixed_menu'),	
		header: $('header.inner'),			
		kino : $('.kino'),
		popup: $('.btn.pop'),
		togBut: $('.toggle_but'),
		lampWrap: $('.lamp_wrap'),		
		rotateBlock: $('.img_wrap'),	
		scrolIdItem: $('header .hidden-block ul li'),
		svgCircl: $('.circle-path'),
		rotateBlock: $('.title_block'),
		changeBg: $('.front_side'),
		deviceBut: $('.port_wrap span'),
		ajaxButton: $('.ajax-btn'),
		polyLength: $('#skill').find('polygon, path'),
		flag: 1,			
		documentM: $('body'),			
		elements: $('section'),
		packeryOptions: {
			itemSelector: '.blog-grid',
			gutter: 10
		},
		elementsPort: $('.wrap_prew'),
		dataCount: $('.procent'),
		height: [],
		position: [],
		startAnim: [],		
		stopAnim: [],
		portfolio: [],
		startAnimPort: []
	},
	//document height
	documentHeight: function(){
		return this.opt.documentM.height();	
	},
	//Window height
	windowHeight: function(){
		return window.innerHeight;
	},
	windowWidth: function(){
		return window.innerWidth;
	},
	//Random function
	randPos: function(min,max){
		return Math.floor(Math.random()*(max - min + 1)) + min;
	},
	//reset link and img drag
	dragstart: function(el){
		$(el).on('dragstart',function(event){
			event.preventDefault();
		});
	},
	//Smoof scroll 
	scrEl: function(el,distance,dur){		
		$(el).animate({scrollTop: distance}, dur);		
	},
	smoofScr: function(){
		$('.button_down').on('click',function(){
			main.scrEl('body',main.windowHeight(),1200);
		});			

		$('.mouse').on('click',function(){
			var imgH = $('.site-screen img').height();
			$('.site-screen').animate({scrollTop: imgH}, {				
				duration: 3000,
					complete: function() { 
						if(main.windowWidth() < 480){
							main.scrEl('body',main.windowHeight(),1200);
						}
					}
			});			
		});
	},
	popup: function(el){
		el.on('click',function(event){
			event.preventDefault();		
			var show = $(this).data('show'),
					pop  = $('#'+ show);

			pop.fadeIn(600)
			.css('height', $(window).height() + 'px')
			.find('.popup-content')
			.removeClass('anim')
			.append('<span class="fade_out">&#9587;</span>')

			$('.fade_out').click(function(){
				pop.fadeOut(600)
				.find('.popup-content')
				.addClass('anim');
				$(this).detach();
			});
		});
	},
	devicePrew: function(){
		this.opt.deviceBut.on('click', function(){
			var prew      = $(this).parents('.wrap_prew').find('.prew'),
				imgPath   = $(this).attr('data-src'),
				dataClass = $(this).attr('data-show'),
				className =	prew.attr('id');
			main.opt.deviceBut.removeClass('active');
			$(this).addClass('active');
			prew.attr('class', 'prew '+ dataClass +'');
			prew.find('img').attr('src',imgPath);			
		});
	},
	ajaxPortfolio: function(){
			var offsetCount = this.opt.ajaxButton.data('start');			

			this.opt.ajaxButton.on('click', function() {
				$(this).addClass('load');
		
				var url     = $(this).data('ajax'),
					  limit   = $(this).data('count'),
					  parrent = $(this).data('parent'),
					  tpl     = $(this).data('tpl'),
					  offset  = $(this).data('offset');

				//Local ajax emulation
				// $.getJSON('portfolio-list.json', function(data) {
				// 	var res = [];
				// 	for(var i = 0; i<data.pinlist.length; i++){
				// 		res.push(data.pinlist[i].html);
				// 	};					
				// 		$('.ajax-wrap').append( res );
				// 		//reinit dom element
				// 		main.opt.elementsPort = $('.wrap_prew');
				// 		//generate section position
				// 		main.createPosition(main.opt.elements);
				// 		//generate portfolio item position
				// 		main.createPositionPort(main.opt.elementsPort);
				// });
				//Local ajax emulation end
				
				$.get(url+'?offset='+offsetCount+'&parent='+parrent+'&limit='+offset+'&tpl='+tpl,  function(data) {
					$('.ajax-wrap').append( data )	
						main.opt.elementsPort = $('.wrap_prew');
						main.opt.deviceBut = $('.port_wrap span');
						main.devicePrew();
						main.createPosition(main.opt.elements);							
						main.createPositionPort(main.opt.elementsPort);
				});
				offsetCount +=offset;
				if(offsetCount > limit){
					$(this).detach();
				}else{
					$(this).removeClass('load');
				};
		});
	},
	calculator: function(){
		var levelOne = $('.type-title'),
			levelTwo = $('.level-two');
		main.toggleC(levelTwo);		
		main.toggleC(levelOne);
	},
	toggleC: function(el){
		el.on('click',function(){
			el.not(this).removeClass('active').next().slideUp('slow');
			$(this).toggleClass('active').next().slideToggle('slow');					
		});
	},
	logoAnim: function(){
		var clearAnim,					
				logo = main.opt.fixedMenu.find('.logo'),
				butonMenu = logo.next().find('span');

		function logoAnim(){
			clearAnim = setInterval(function(){
				logo.toggleClass('logo-anim');
			},4000);	
		};
		logoAnim.call();

		butonMenu.click(function(){
			var el = $(this).attr('data-menu'),
					t  = $("." + el);
			logo.toggleClass('logo-anim');
			if(logo.hasClass('logo-anim')){
				clearInterval(clearAnim);
			}else{
				logoAnim();
			}
			t.toggleClass("open_fixed").css("z-index", "150");;		
			if(1 == t.index()){
				t.next().addClass("open_fixed").css("z-index", "-1"); 
			}else{
				t.prev().addClass("open_fixed").css("z-index", "-1");
			}           
				});
	},
	rotatePort: function(){
		var width  = $('#contacts').width(),
		height = $('#contacts').outerHeight(),
		koef = height / 69;		
		$('#contacts').mousemove(function(e){
			var thisPos = $(this).offset(),
						 xPos = e.pageX,
						 yPos = e.pageY,
						 xPos = xPos - (Math.floor(width/2)),
						 yPos = yPos - thisPos.top;
			
			$(this).find('.lamp_left .img_block').css({
				'-webkit-transform': 'rotate('+ yPos/koef +'deg)'	
			});	
			$(this).find('.lamp_right .img_block').css({
				'-webkit-transform': 'rotate('+ -yPos/koef +'deg)'	
			});	
		});
	},
	toggleMnu: function(){
		this.opt.togBut.on('click',function(){
			var menu = $('.hidden-block');
			if($(this).hasClass('tog_mnu')){
				menu.removeClass('z_menu');
			}else{
			setTimeout(function(){
					menu.addClass('z_menu');
			},1000);
		};
			main.opt.lampWrap.toggleClass('lamp_wrap_active');
			main.opt.togBut.toggleClass('tog_mnu');					
			$(this).parents('header').toggleClass('open_mnu');	
			main.opt.lampWrap.find('svg ellipse').fadeToggle(100);

			main.opt.header.find('nav li').slideToggle('fast');			
			if($('.search-button').hasClass('active')){
				$('.search-button').click();				
			};
		});	
	},	
	//procent count in slider second slide
	numCounter: function(){
		var mainEl    = this.opt.dataCount,
				count     = 0;
				
		var	dataCount = setInterval(function(){	
			for(var i = 0; i < mainEl.length; i++){
				var dataAtr = mainEl.eq(i).data('procent');
				if (count < dataAtr+2) {				
					main.opt.dataCount.eq(i).text(count + '%');
					count+=2;
				}else{
					main.opt.dataCount.eq(i).text(dataAtr + '%');					
				}}}, 100);
	},
	//sircle in slider second slide
	svgCircle: function(){
		if(main.opt.svgCircl.parents('.sli-item').hasClass('sli-active')){
			this.numCounter();
			main.opt.svgCircl.parents('.leng_wrap').attr('id','circl');
		}else{
			main.opt.svgCircl.parents('.leng_wrap').attr('id','');
		};
	},
	//scroll for section in menu
	smoofScroll: function(){
		this.opt.scrolIdItem.on('click',function(event){
			event.preventDefault();
			main.opt.smooffScroll = $(this).index();			
			var pos = main.opt.position[main.opt.smooffScroll - 1];
			main.opt.documentM.animate({scrollTop: pos}, 1200);
		});
	},
	//Create position for all section
	createPosition: function(element){
		if(this.opt.position.length){
			this.opt.position.length = 0;
			this.opt.startAnim.length = 0;
			this.opt.stopAnim.length = 0;
			this.opt.height.length = 0;
		};

		for(var i = 0; i< element.length; i++){
			var elementItem = element.eq(i),
			offsetTop = elementItem.offset().top,
			elHeight  = elementItem.height(),
			stopPos   = offsetTop,
			startPos  = offsetTop - this.windowHeight()/2;
			
			this.opt.startAnim.push(startPos);
			this.opt.stopAnim.push(stopPos);
			this.opt.height.push(element.height());
			this.opt.position.push(offsetTop);	
		};
		//add smoof scroll bi id in main poage
		//this.smoofScroll();
	},
	//Create position for section portfolio item
	createPositionPort: function(element){
		if(this.opt.startAnimPort.length){
			this.opt.startAnimPort.length = 0;
		};
		
		for(var i = 0; i< element.length; i++){
			var elementItem = element.eq(i),
			offsetTop = elementItem.offset().top - this.windowHeight();			
			this.opt.startAnimPort.push(offsetTop);	
		};			
	},
	//SVG photo add random position
	randPosition: function(){		
		for(var i = 0; i< this.opt.polyLength.length; i++){
			this.opt.polyLength.eq(i).css({
				transition: 'all 0.8s',
				transform: 'translate('+ this.randPos(-200,400)+'px,'+ this.randPos(0,400) + 'px)'
			});
		}
	},
	//SVG photo remove random position
	defaulPos: function(){
		this.opt.polyLength.css({				
			transform: 'translate(0px,0px)'
		});	
	},
	//section title rotate
	scrollBlock: function(scrollPosit,item){
		var rotHeight = main.opt.startAnim[item] - main.opt.stopAnim[item],
		koefic    = rotHeight/90,
		koeficBg  = rotHeight/121;

		if(scrollPosit > main.opt.startAnim[item] && scrollPosit < main.opt.stopAnim[item]){
			var posScroll = scrollPosit - main.opt.startAnim[item],
					rotateDeg = Math.floor(posScroll / koefic),
					color     = 255 + Math.floor(posScroll / koeficBg);		      
			this.opt.elements.eq(item).find(this.opt.rotateBlock).css({
				transform: 'rotateX('+ -rotateDeg +'deg)',				
			});
			this.opt.elements.eq(item).find(this.opt.changeBg).css({
				backgroundColor: 'rgb('+ color +','+ color+','+ color +')'
			});					
		}else if(scrollPosit < main.opt.startAnim[item]){
			this.opt.elements.eq(item).find(this.opt.rotateBlock).css({
				transform: 'rotateX(0deg)'
			});
		};
	},
	//Moove background 
	// kino: function(scrollPosit, item){
	// 	var posScroll = scrollPosit - main.opt.startAnim[1];
	// 	if(scrollPosit > main.opt.startAnim[1] && scrollPosit < main.opt.stopAnim[2]){
	// 		main.opt.kino.css({
	// 			backgroundPosition: -posScroll + 'px'
	// 		});
	// 	};
	// },	
	//inner page search form anim
	formSearch: function(){	
		this.opt.searchButton.on('click', function(){
			$(this).toggleClass('active');
			$(this).prev().toggleClass('active');			
		});
	},
	init: function(){	
		// default functions
		this.dragstart(this.opt.img);
		this.dragstart(this.opt.linc);

		//menu
		this.toggleMnu();
		this.formSearch();
		//slider
		mySlider.init(600,1);
		//generate section position
		main.createPosition(main.opt.elements);
		//generate portfolio item position
		main.createPositionPort(main.opt.elementsPort);
		//rotate footer lamp
		main.rotatePort();
		//fixed menu
		main.logoAnim();
		//Popup
		main.popup(main.opt.popup);
		//Home page device preview
		main.devicePrew();
		//main sceern smoof scroll
		main.smoofScr();
		//ajaxPortfolio
		main.ajaxPortfolio();
		window.onload = function(){
			main.calculator();			
		};		
		
		// $(window).resize(function(){
		// 	mySlider.init(600);
		// });

		$(document).scroll(function(){	
			var scrl = $(document).scrollTop();

			if(main.opt.togBut.hasClass('tog_mnu')) {
				main.opt.togBut.click();
			};

			// if($('.up').length){				
			// 	if (scrl > 600) {
			// 		$('.up').fadeIn('slow');
			// 	}else{
			// 		$('.up').fadeOut('slow');
			// 	};
			// 	$('.up').on('touchstart', function() {
			// 		$('body').animate({scrollTop:0},{				
			// 			duration: 1000,
			// 			complete: function() { 
			// 				console.log('khjhf');
			// 				$('body').stop();
			// 			}
			// 		});			
			// 	});								
			// };


			// portfolio item animated
			if(!$('#portfolio, .last-portfolio ').hasClass('no-animation')){
				for(var i = 0; i < main.opt.startAnimPort.length; i++){
					if(scrl+30 > main.opt.startAnimPort[i]){
						main.opt.elementsPort.eq(i).addClass('animated fadeInLeft');
					}else{
						main.opt.elementsPort.eq(i).removeClass('animated fadeInLeft');
					};
				};				
			};
			// section add class 			
			for(var i = 0; i < main.opt.position.length; i++){
				//Film tape move
				//main.kino(scrl, i);

				//Section title rotate
				main.scrollBlock(scrl, i);
				//Section add class activ on scroll
				if(scrl > main.opt.position[i]){
					main.opt.elements.eq(i).addClass('activeSection');				
				}else{
					main.opt.elements.eq(i).removeClass('activeSection');
				};
			};
			//fixed menu
			var headH = $('header').height();
			if (scrl > headH) {						
					main.opt.fixedMenu.css('left','10px');
			}else{
					main.opt.fixedMenu.css('left','-100px');
			};						
		});	
	}
}


var mySlider = {
	main: $('body'),
	Mblock: $('#sli-block'),
	itemWrap: $('#sli-block #sli-wrap'),
	item: $('#sli-block .sli-item'),
	count: 0,
	pagination: [],
	navNext: '<span class="sli-next">&#8250</span>',
	navPrev: '<span class="sli-prew">&#8249</span>',
	winWidth: function(){
		return this.Mblock.parent().width();
	},
	itemWidth: function(itemV){
		if(itemV){
			this.item.width(Math.floor(this.winWidth()/itemV));
		}else{
			this.item.width(this.winWidth());
		}		
	},
	sliderWidth: function(){
		var fullWidth = this.item.length * this.winWidth();
		this.itemWrap.width(fullWidth);			
	},
	addClass: function(){
		this.item.removeClass('sli-active');
		this.item.eq(this.count).addClass('sli-active');

		$('.sli-pagination span').removeClass('sli-active')
		$('.sli-pagination span').eq(this.count).addClass('sli-active');
	},
	next: function(){
		if(this.count>this.item.length-2){
			this.count = 0;
		}else{
			++this.count;
		};
		this.itemWrap.css({
			marginLeft: '-'+ this.item.width() * this.count +'px'
		});	
		this.addClass();
		main.svgCircle();
		main.defaulPos();	
	},
	prew: function(){
		if(this.count < 1 ){
			this.count = 0;
		}else{
			--this.count;
		};
		this.itemWrap.css({
			marginLeft: '-'+ this.item.width() * this.count +'px'
		});	
		this.addClass();
		main.svgCircle();
		main.defaulPos();
	},
	paginActiv: function(el){
		var thisIndex = el.index();
		this.itemWrap.css({
			marginLeft: '-'+ this.item.width() * thisIndex +'px'
		});	
		this.count = thisIndex;				
	},
	display: function(deley){			
		for(var i = 0; i<this.item.length; i++ ){
			this.pagination.push('<span></span>');
		};
		if(this.item.length > 1){
			this.Mblock.append(this.navNext, this.navPrev, '<div class="sli-pagination">'+this.pagination.join('')+'</div>');
		};

		this.main.on('click','.sli-next', function(){	
			main.randPosition();					
			setTimeout(function(){ mySlider.next()}, deley);			
		});
		this.main.on('click','.sli-prew', function(){
			main.randPosition();
			setTimeout(function(){ mySlider.prew()}, deley);					
		});
		this.main.on('click', '.sli-pagination span', function(){
			mySlider.paginActiv($(this));
			mySlider.addClass();
			main.svgCircle();
		});	
		this.addClass();	
	},
	init: function(deley,items){					
		var INIT = function(){
			this.sliderW = mySlider.sliderWidth();			
			this.itemW = mySlider.itemWidth(items);
			this.mainInit = mySlider.display(deley);
		};
		return new INIT;		
	}
};

$(document).ready(function() {
	var winW = $(window).width();
	$('.header_wrap').height(main.windowHeight());	

		//Chrome Smooth Scroll
		try {
			$.browserSelector();
				if($("html").hasClass("chrome")) {
					$.smoothScroll();
				}
			} catch(err){
		};

	//Resume progres bar start
	var progres = $('#about .skill-block .progres span');
	for(var i = 0; i<progres.length; i++){
		var reslt = progres.eq(i).data('progres');
		progres.eq(i).css('width', reslt+'%');
	};
	//Resume progres bar end


		if(localStorage.getItem("User")){			
			$('#hellopreloader_preload').detach();
			//localStorage.clear()
		}else{
			// Сохранение значения
			localStorage.setItem("User", true)
		};
			// Сохранение значения
			//localStorage.setItem("User", true)
			// Получение значения
			//localStorage.getItem("User")
			// Удаление значения
			//localStorage.removeItem("Ключ")
			// Очистка всего хранилища
			//localStorage.clear()		


		$('#send input, #send textarea').on('focusin',function(){
			$(this).prev().css('marginTop','-35px');
		}).on('focusout',function(){
			if ($(this).val()) {				
				return false;
			}else{
				$(this).prev().css('marginTop','0px');					
			};		
		});
		
		$('#about .aside').css('min-height', $('#about .body-about').outerHeight()+'px');

		//E-mail Ajax Send
		$("form.send").submit(function() { 
			var th = $(this);
			$.ajax({
				type: "POST",
				url: this.action,
				data: th.serialize()
			}).done(function() {
				alert("Сообщение отправлено");
				setTimeout(function() {		
					th.trigger("reset");
				}, 1000);
			});
			return false;
		});

		if(winW < 480){
			$('.fixed_menu').detach();
			//$('<button type="button" class="up"><i class="fa fa-chevron-up"></i></button>').appendTo('body');
		};

		main.init();	
});

	function preloader(){
		var hellopreloader = document.getElementById("hellopreloader_preload");
		
		function fadeOutnojquery(el){			
			el.style.opacity = 1;
			var interhellopreloader = setInterval(function(){	
				el.style.opacity = el.style.opacity - 0.05;
				if (el.style.opacity <=0.05){
					clearInterval(interhellopreloader);
					hellopreloader.style.display = "none";}
				},30);
		};
		setTimeout(function(){
				fadeOutnojquery(hellopreloader);
				animTitle('.header_wrap h1','fadeInLeft',50);
		},2000);	
	};

	$(window).on('load', function(){
		if($('#hellopreloader_preload').length){
			preloader();	
		}		
	});

function animTitle(el,effect,speed){
	var $this    = $(el),
			text     = $this.html(),
			textTrim = $.trim(text).split(''),
			spLength = textTrim.length,
			count    = 0;
			$this.text('');		  
		var animSpan = setInterval(function(){		
			if(count < spLength){
				var result = '<span class="animated '+effect+'">' + textTrim[count] + '</span>';
				$this.append(result);
				count++;
			}else{
				count = spLength;
				clearInterval(animSpan);
			}
		}, speed);
	};






// function advantages(){
// 	var el = $('.advantages ul li');
// 	var elLehgth = el.length;
// 	for(var i = 0; i<elLehgth; i++){
// 		el.eq(i).attr('data-num', i+1);
// 	};
// };
// function scrollPage(){
// 	var activeBut = $('menu ul li a, .but_down');
// 	activeBut.on('click',function(){
// 		var secPos = $($(this).attr('data-id')).offset().top;
// 		$('body').animate({scrollTop: secPos}, 1000);
// 	});
// }
// var contact = function(){
// 	var el = $('.telephone');
// 	$(window).scroll(function(){
// 		var scrollPos = $(this).scrollTop();
// 		if (scrollPos > popup.windowH()) {
// 			el.css('left','-103px');
// 		}else{
// 			el.css('left','0px');
// 		};
// 	});
// };

// var popup = {
// 	windowH: function(){
// 		return $(window).height();
// 	},
// 	blockPos: function(el){
// 		$(el).css({
// 			paddingTop: $(el).height() - (popup.windowH() /2) +'px'
// 		});	
// 	},
// 	init: function(but,block){
// 		$('header').height(popup.windowH());
// 		$(but).on('click',function(){	
// 			$(this).next().append('<span class="fade_out">&#9587;</span>').fadeIn('slow');

// 			// popup.blockPos(block);

// 			$('.fade_out').click(function(){
// 				$(block).fadeOut('slow');
// 				$(this).detach();
// 			});
// 		});
// 	}
// }
