$(document).ready(function() {

	$('.header_wrap').height(main.windowHeight());

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

		//Chrome Smooth Scroll
		try {
			$.browserSelector();
			if($("html").hasClass("chrome")) {
				$.smoothScroll();
			}
		} catch(err){
		};
 
		$('.button_down').on('click',function(){
			$('body').animate({scrollTop: $(window).height()}, 1200);
		});


		$('.port_wrap span').click(function(){
			var prew = $(this).parents('.wrap_prew').find('.prew');			
			var imgPath = $(this).attr('data-src');
			var dataClass = $(this).attr('data-show');
			var className =	prew.attr('id');			
			prew.attr('class', 'prew '+ dataClass +'');
			prew.find('img').attr('src',imgPath);			
		});


		$('#send input, #send textarea').on('focusin',function(){
			$(this).prev().css('marginTop','-35px');

		}).on('focusout',function(){
			if ($(this).val()) {				
				return false;
			}else{
				$(this).prev().css('marginTop','0px');					
			};		
		});

		$('#contacts').hover(function(){
			$(this).find('.img_block').toggleClass('img_block_hover');
		});

		$('#hhh').click(function(event) {
			$('.first-sirkl').circleProgress({
				value: 0.96
			}).on('circle-animation-progress', function(event, progress) {
				$(this).find('strong').html(parseInt(96 * progress) + '<i>%</i>');
			});
		});

		main.init();

});
window.onload = function(){
	preloader();		
};

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
	},3000);	
};

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

		var main = {	
			variables: {
				fixedMenu: $('.fixed_menu'),				
				kino : $('.kino'),
				togBut: $('.toggle_but'),
				lampWrap: $('.lamp_wrap'),		
				rotateBlock: $('.img_wrap'),	
				scrolIdItem: $('nav ul li,nav ul li,.foot_menu li'),
				svgCircl: $('.circle-path'),
				rotateBlock: $('.title_block'),
				changeBg: $('.front_side'),
				polyLength: $('#skill').find('polygon, path'),
				flag: 1,			
				documentM: $('body'),			
				elements: $('section'),
				elementsPort: $('.wrap_prew'),
				dataCount: $('.procent'),
				height: [],
				position: [],
				startAnim: [],		
				stopAnim: [],
				portfolio: [],
				startAnimPort: []
			},
			logoAnim: function(){
				var clearAnim,					
						logo = main.variables.fixedMenu.find('.logo'),
						butonMenu = logo.next().find('span');

				function logoAnim(){
					clearAnim = setInterval(function(){
						logo.toggleClass('logo-anim');
					},4000);	
				};
				logoAnim.call();

				butonMenu.click(function(){
					var el = $(this).attr('data-menu');
					logo.toggleClass('logo-anim');
					if(logo.hasClass('logo-anim')){
						clearInterval(clearAnim);
					}else{
						logoAnim();
					}
					$('.'+ el).toggleClass('open_fixed');
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
				this.variables.togBut.on('click',function(){	
					var menu = $('nav');
					if($(this).hasClass('tog_mnu')){
						menu.removeClass('z_menu');
					}else{
					setTimeout(function(){
							menu.addClass('z_menu');
					},1000);
				};
					main.variables.lampWrap.toggleClass('lamp_wrap_active');
					main.variables.togBut.toggleClass('tog_mnu');					
					$(this).parents('header').toggleClass('open_mnu');	
					main.variables.lampWrap.find('svg ellipse').fadeToggle(100);
				});	
			},
	slider: {//slider start
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
			this.item.eq(main.slider.count).addClass('sli-active');

			$('.sli-pagination span').removeClass('sli-active')
			$('.sli-pagination span').eq(main.slider.count).addClass('sli-active');
		},
		next: function(){
			if(this.count>this.item.length-2){
				this.count = 0;
			}else{
				++this.count;
			};
			this.itemWrap.css({
				marginLeft: '-'+ main.slider.item.width() * main.slider.count +'px'
			});	
			main.slider.addClass();
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
				marginLeft: '-'+ main.slider.item.width() * main.slider.count +'px'
			});	
			main.slider.addClass();
			main.svgCircle();
			main.defaulPos();
		},
		paginActiv: function(el){
			var thisIndex = el.index();
			this.itemWrap.css({
				marginLeft: '-'+ main.slider.item.width() * thisIndex +'px'
			});	
			this.count = thisIndex;				
		},
		display: function(){
			for(var i = 0; i<this.item.length; i++ ){
				this.pagination.push('<span></span>');
			};
			this.Mblock.append(this.navNext, this.navPrev, '<div class="sli-pagination">'+this.pagination.join('')+'</div>');

			this.main.on('click','.sli-next', function(){	
				main.randPosition();					
				setTimeout(function(){ main.slider.next()}, 600);			
			});
			this.main.on('click','.sli-prew', function(){
				main.randPosition();
				setTimeout(function(){ main.slider.prew()}, 600);					
			});
			this.main.on('click', '.sli-pagination span', function(){
				main.slider.paginActiv($(this));
				main.slider.addClass();
				main.svgCircle();
			});	
			this.addClass();	
		},
		init: function(){			
			this.sliderWidth();			
			this.itemWidth();
			$(window).resize(function(){
				main.slider.sliderWidth();
				main.slider.itemWidth();
			});
			this.display();
		} //slider end
	},
	//document height
	documentHeight: function(){
		return this.variables.documentM.height();	
	},
	//Window height
	windowHeight: function(){
		return window.innerHeight;
	},
	//Random function
	randPos: function(min,max){
		return Math.floor(Math.random()*(max - min + 1)) + min;
	},
	//procent count in slider second slide
	numCounter: function(){
		var mainEl    = this.variables.dataCount,
				count     = 0;
				
		var	dataCount = setInterval(function(){	
			for(var i = 0; i < mainEl.length; i++){
				var dataAtr = mainEl.eq(i).data('procent');
				if (count < dataAtr+2) {				
					main.variables.dataCount.eq(i).text(count + '%');
					count+=2;
				}else{
					main.variables.dataCount.eq(i).text(dataAtr + '%');					
				}}}, 100);
	},
	//sircle in slider second slide
	svgCircle: function(){
		if(main.variables.svgCircl.parents('.sli-item').hasClass('sli-active')){
			this.numCounter();
			main.variables.svgCircl.parents('.leng_wrap').attr('id','circl');
		}else{
			main.variables.svgCircl.parents('.leng_wrap').attr('id','');
		};
	},
	//scroll for section in menu
	smoofScroll: function(){
		this.variables.scrolIdItem.on('click',function(){			
			main.variables.smooffScroll = $(this).index();			
			var pos = main.variables.position[main.variables.smooffScroll - 1];
			main.variables.documentM.animate({scrollTop: pos}, 1200);
		});
	},
	//Create position for all section
	createPosition: function(element){
		for(var i = 0; i< element.length; i++){
			var elementItem = element.eq(i),
			offsetTop = elementItem.offset().top,
			elHeight  = elementItem.height(),
			stopPos   = offsetTop,
			startPos  = offsetTop - this.windowHeight()/2;
			
			this.variables.startAnim.push(startPos);
			this.variables.stopAnim.push(stopPos);
			this.variables.height.push(element.height());
			this.variables.position.push(offsetTop);	
		};
		this.smoofScroll();
	},
	//Create position for section portfolio item
	createPositionPort: function(element){
		for(var i = 0; i< element.length; i++){
			var elementItem = element.eq(i),
			offsetTop = elementItem.offset().top - this.windowHeight();			
			this.variables.startAnimPort.push(offsetTop);		
		};	
	},
	//SVG photo add random position
	randPosition: function(){		
		for(var i = 0; i< this.variables.polyLength.length; i++){
			this.variables.polyLength.eq(i).css({
				transition: 'all 0.8s',
				transform: 'translate('+ this.randPos(-200,400)+'px,'+ this.randPos(0,400) + 'px)'
			});
		}
	},
	//SVG photo remove random position
	defaulPos: function(){
		this.variables.polyLength.css({				
			transform: 'translate(0px,0px)'
		});	
	},
	//section title rotate
	scrollBlock: function(scrollPosit,item){
		var rotHeight = main.variables.startAnim[item] - main.variables.stopAnim[item],
		koefic    = rotHeight/90,
		koeficBg  = rotHeight/121;

		if(scrollPosit > main.variables.startAnim[item] && scrollPosit < main.variables.stopAnim[item]){
			var posScroll = scrollPosit - main.variables.startAnim[item],
			    rotateDeg = 1 + Math.floor(posScroll / koefic),
		      color     = 255 + Math.floor(posScroll / koeficBg);
			this.variables.elements.eq(item).find(this.variables.rotateBlock).css({
				transform: 'rotateX('+ -rotateDeg +'deg)'
			});
			this.variables.elements.eq(item).find(this.variables.changeBg).css({
				backgroundColor: 'rgb('+ color +','+ color+','+ color +')'
			});					
		}else if(scrollPosit < main.variables.startAnim[item]){
			this.variables.elements.eq(item).find(this.variables.rotateBlock).css({
				transform: 'rotateX(0deg)'
			});
		};
	},
	//Moove background 
	kino: function(scrollPosit, item){
		var posScroll = scrollPosit - main.variables.startAnim[1];
		if(scrollPosit > main.variables.startAnim[1] && scrollPosit < main.variables.stopAnim[2]){
				 main.variables.kino.css({
				 		backgroundPosition: -posScroll + 'px'
				 });
		};
	},
	init: function(){	
		//menu
		this.toggleMnu();
		//slider
		main.slider.init();
		//generate section position
		this.createPosition(main.variables.elements);	
		//generate portfolio item position
		main.createPositionPort(main.variables.elementsPort)
		//rotate footer lamp
		main.rotatePort();
		//fixed menu
		main.logoAnim();
	

		$(document).scroll(function(){	
			var scrl = $(document).scrollTop();

			if (main.variables.togBut.hasClass('tog_mnu')) {
				main.variables.togBut.click();
			};
			// portfolio item animated
			for(var i = 0; i < main.variables.startAnimPort.length; i++){
				if(scrl > main.variables.startAnimPort[i]){
					main.variables.elementsPort.eq(i).addClass('animated fadeInLeft');
				}else{
					main.variables.elementsPort.eq(i).removeClass('animated fadeInLeft');
				};
			};
			//end portfolio animated

			// section add class 			
			for(var i = 0; i < main.variables.position.length; i++){
				//Film tape move
				main.kino(scrl, i);
				//Section title rotate
				main.scrollBlock(scrl, i);

				if(scrl > main.variables.position[i]){					
					main.variables.elements.eq(i).addClass('activeSection');				
				}else{
					main.variables.elements.eq(i).removeClass('activeSection');
				};
			};
			//end section add class

			//fixed menu
			if (scrl > main.windowHeight()) {						
					main.variables.fixedMenu.css('left','10px');
			}else{
					main.variables.fixedMenu.css('left','-100px');
			};
			//fixed menu end			

			//footer lamp start
			if(scrl > main.variables.startAnim[4]){
				var blockHeight = scrl - main.variables.startAnim[4];
				$('.footLamp .footLamp_wrap').height(blockHeight);	
			};
			//footer lamp end
		});	
	}
}







function advantages(){
	var el = $('.advantages ul li');
	var elLehgth = el.length;
	for(var i = 0; i<elLehgth; i++){
		el.eq(i).attr('data-num', i+1);
	};
};
function scrollPage(){
	var activeBut = $('menu ul li a, .but_down');
	activeBut.on('click',function(){
		var secPos = $($(this).attr('data-id')).offset().top;
		$('body').animate({scrollTop: secPos}, 1000);
	});
}
var contact = function(){
	var el = $('.telephone');
	$(window).scroll(function(){
		var scrollPos = $(this).scrollTop();
		if (scrollPos > popup.windowH()) {
			el.css('left','-103px');
		}else{
			el.css('left','0px');
		};
	});
};

var popup = {
	windowH: function(){
		return $(window).height();
	},
	blockPos: function(el){
		$(el).css({
			paddingTop: $(el).height() - (popup.windowH() /2) +'px'
		});	
	},
	init: function(but,block){
		$('header').height(popup.windowH());
		$(but).on('click',function(){	
			$(this).next().append('<span class="fade_out">&#9587;</span>').fadeIn('slow');

			// popup.blockPos(block);

			$('.fade_out').click(function(){
				$(block).fadeOut('slow');
				$(this).detach();
			});
		});
	}
}
