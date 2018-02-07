$(document).ready(function($) {
	
	var kaiSlide = document.querySelector('.kai-slide'),
		slides,
		slide,
		line,
		next,
		prev,
		i=0,
		w = $(window).width(),
		h = $(window).height();

	// Опции которые можно менять
	opts = {
		timeSlide: 5000, // время переключение слайдера
		ttTime: 1, // время продолжительности анимации
		ttDelay: 0.2, // время задержки анимации слайдера
		fontSize: 16, // общий размер шрифтов
		titleSize: 16*4.5, // размер шрифта заголовка
		textSize: 16*3, // размер шрифта текста
		buttonSize: 12, // размер шрифта кнопки
		colorText: '#8accff',
		colorTitle: '#ffffff',
		colorBtn: '#ffffff',
		colorLine: '#8accff'
	}

	var intervalID = setInterval(autoSlide, opts.timeSlide);

	createSlides(); // line 53
	createSlide(); // line 64
	createContent(); // line 81
	createArrows();  // line 112
	animateContent();  // line 185

	getResponsive('.kai-slide');  // line 209
	getResponsive('.slides');  // line 209
	getResize('.kai-slide', '.slides', '.slide');  // line 216

	// Активируем и анимируем перелистывание
	function addStyle(){
		$('.slide').eq(i).addClass('active');
		$('.slide').eq(i).addClass('animation');
	}

	// запуск авто-перелистывание
	function autoSlide(){
		nextSlide();  // line 153
		changeFontSize();  // line 195
	}

	// обновляет интервал
	function pauseSlide(){
		clearInterval(intervalID);
		intervalID = setInterval(autoSlide, opts.timeSlide);
	}

	// создает обертку для каждого слайда
	function createSlides(){
		slides = createEl('div');
		$(slides).addClass('slides');
		$(kaiSlide).append($(slides));
	}

	// Удаляет все картинки и создает блоки с bg  из картинок
	function createSlide(){
		$('.kai-slide img').each(function(i,el){
			$(el).remove();
			slide = createEl('div');
			$(slide).addClass('slide');
			$(slides).append($(slide));
			$(slide).css({
				'background-image': 'url(' + $(el).attr('src') + ')',
				});
			$('.slide').css({
				'transition': 'transform ' + opts.ttTime + 's' + ' ease-in-out',
				'transition-delay': opts.ttDelay + 's'
			});
		addStyle();  // line 45
		});
	}
	// Создает контент
	function createContent(){
		for (var i = 0; i < $('.slide').length; i++) {
			line = createEl('div'); // Линия во всех сладерах
			$(line).addClass('line');
			$('.slide').eq(i).append($(line));
			$('.slide').eq(i).find('.line').css('background-color', opts.colorLine);
		}
	// создаем класс kai-content для контента в слайдере
		$(kaiSlide).children().not('.slides').each(function(i,el){	
			$(el).addClass('kai-content');
		});
	// Перебирает  все kai-content и добавляет  их в слайдеры 
		$('.kai-content').each(function(i,el){
			$('.slide').eq(i).append( el );
	// Присваивает общий класс для текста слайдера
			$(el).children().addClass('kai-text');
	// Второй ребенок в kai-content - это всегда Заголовок, добавляет нужный класс в заголовок
			$(el).children().eq(1).not('.btn-kai').removeClass('kai-text');
			$(el).children().eq(1).not('.btn-kai').wrapAll('<div class="wr"></div>');
			if( $(el).find('button') || $(el).find('a')){
				$('.kai-content button').addClass('btn-kai');
				$('.kai-content a').addClass('btn-kai');
			}
	// добавляет обертку на заголовок для анимации
			$('.kai-content .wr').children().addClass('kai-title animation');
			$(el).find('.kai-text').css('color', opts.colorText);
			$(el).find('.kai-title').css('color', opts.colorTitle);
			$(el).find('.btn-kai').css('color', opts.colorBtn);
		});
	}
	// Создает кнопки навигации
	function createArrows(){
		var next = createEl('div'),
			prev = createEl('div');
			$(next).addClass('next');
			$(prev).addClass('prev');
			$(kaiSlide).append($(next));
			$(kaiSlide).append($(prev));
			$('.next').wrapInner('<i class="icon-arrow-right"></i>');
			$('.prev').wrapInner('<i class="icon-arrow-left"></i>');
	}

	//Для того чтобы под активным слайдом была картинка,
	// делаем все слайды активными и убираем по одному
	$('.prev').on('click',prevSlide);
	function prevSlide(){
		pauseSlide();  // line 51
		changeFontSize();  // line 195
		if( i > 0 ){
			i--;
			$('.slide').eq(i+1).removeClass('active');
			$('.slide').eq(i+1).removeClass('animation');
			$('.slide').eq(i+1).addClass('no_animation');
			$('.slide').eq(i).removeClass('no_animation');
			$('.slide').eq(i).addClass('animation');
		}else{
			i = $('.slide').length - 1;
			for (var j = 0; j < $('.slide').length; j++) {
				$('.slide').eq(j).addClass('active');
				$('.slide').eq(j).removeClass('no_animation');
				$('.slide').eq(j).addClass('animation');
			}
			if( $('.slide').eq(i).prev() ){
	// если слайдер первый и переходим на последний, с первого уберем анимацию
	// и с соседа слева от видимого слайда уберем анимацию 
				$('.slide').eq(i).prev().removeClass('animation');
				$('.slide').eq(i).prev().addClass('no_animation');
				$('.slide').eq(0).removeClass('animation');
				$('.slide').eq(0).addClass('no_animation');
			}
		}
	}

	$('.next').on('click',nextSlide);
	function nextSlide(){
		pauseSlide();  // line 51
		if( i < $('.slide').length - 1 ){
			i++;
			$('.slide').eq(i).addClass('active');
			$('.slide').eq(i).removeClass('no_animation');
			$('.slide').eq(i).addClass('animation');
	// Если нет соседа слева слайд первый
			if( $('.slide').eq(i).prev() ){
				$('.slide').eq(i).prev().removeClass('animation');
				$('.slide').eq(i).prev().addClass('no_animation');
			}
		}else{
// тогда слайд начинается с первого (0)
			i = 0;
			for (var j = $('.slide').length-1; j > 0; j--) {
				$('.slide').eq(j).removeClass('active');
				$('.slide').eq(i).removeClass('no_animation');
				$('.slide').eq(j).removeClass('animation');
			}
	// когда первый слайдер добавим анимацию.
			$('.slide').eq(i).addClass('animation');
			$('.slide').eq($('.slide').length-1).addClass('no_animation');
		}
	// Если нет соседа справа слайд последний
	// убираем анимацию с первого слайдера, чтоб анимация запустилась снова на первом когда пройдет все слайдеры
		if( !$('.slide').eq(i).next() ){
			$('.slide').eq(0).removeClass('animation');
			$('.slide').eq(0).addClass('no_animation');
		}
	}

	// Аминирует контент
	function animateContent(){
		$('.kai-content').each(function(i,el){
			$(el).children().addClass('animation');
			if( $(el).find('.wr') ){
				$('.wr').removeClass('animation');
			}
		});
	}

	// Размер шрифта подстраивается под размер окна
	function changeFontSize(){
		$('.kai-content').each(function(i,el){
			$(el).find('.kai-text').css('font-size', responsiveFont(opts.textSize, $(window).width())  );
			$(el).find('.kai-title').css('font-size', responsiveFont(opts.titleSize, $(window).width()) );
			$(el).find('.btn-kai').css('font-size', responsiveFont(opts.buttonSize, $(window).width()) );
			$(el).find('.btn-kai').removeClass('kai-text');
		// Минимальный размер кнопки. Чтоб кнопка не были мелкого шрифта
			if( $(window).width() < 1024 ){
				$(el).find('.btn-kai').css('font-size', responsiveFont(opts.buttonSize, 767) );
			}
		});
	}

	// Вспомогательная функция - по ширине и высоте при загрузке окна = размер слайда
	function getResponsive(changeEl){
		$(changeEl).css('width', w);
		$(changeEl).css('height', h);
		changeFontSize();
	}

	// Вспомогательная функция - динамическое изминении размеров окна = размер слайда
	function getResize(wrapper, card, item){
		$( window ).resize(function () {
			var w = $(window).width(),
				h = $(window).height();
			$(wrapper).css('width', w);
			$(wrapper).css('height', h);
			$(card).css('width', w);
			$(card).css('height', h);
			for (var i = 0; i < $(item).length; i++) {
				$(item).eq(i).css({
					'width': w,
					'height': h
				});
			}
		changeFontSize();  // line 195
		});
	}

	// Вспомогательная функция  - расчет шрифта который подстраивается под ширину окна
	function responsiveFont(fontSize, fromWt){
		var coeff = fromWt/1000,
			newFontSize = Math.floor(fontSize * coeff) + 'px';
		return newFontSize;
	}
	// Вспомогательная функция - создает елементы
	function createEl(el){
		return document.createElement(el);
	}
	
});