var kaiSlide = document.querySelector('.kai-slide'),
	slides,
	slide,
	line,
	next,
	prev,
	i=0,
	w = document.body.offsetWidth,
	h = document.body.offsetHeight,

// Опции которые можно менять
opts = {
	timeSlide: 5000,
	transitionTime: 1,
	transitionDelay: 0.2,
	fontSize: 16,
	titleSize: 16*4.5,
	textSize: 16*3,
	buttonSize: 12
}

var intervalID = setInterval(autoSlide, opts.timeSlide);

createSlides();
createSlide();
createContent();
createArrows();
animateContent();

getResponsive('.kai-slide');
getResponsive('.slides');
getResize('.kai-slide', '.slides', '.slide');

// Активируем и анимируем перелистование
function addStyle(){
	$('.slide').eq(i).addClass('active');
	$('.slide').eq(i).addClass('animation');
}

// запуск автоперелистывания
function autoSlide(){
	nextSlide();
	// changeFontSize();
}

// обновляет интервал
function pauseSlide(){
	clearInterval(intervalID);
	intervalID = setInterval(autoSlide, opts.timeSlide);
}

// создает Wrapp для всего списка слайдеров
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
			'transition': 'transform ' + opts.transitionTime + 's' + ' ease-in-out',
			'transition-delay': opts.transitionDelay + 's'
		});
	addStyle();
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
}

//Для того чтобы под активным слайдом была картинка,
// делаем все слайды активными и убираем по одному
$('.prev').on('click',prevSlide);
function prevSlide(){
	pauseSlide();
	// changeFontSize();
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
// и с соседа слева от видемого слайда уберем анимацию 
			$('.slide').eq(i).prev().removeClass('animation');
			$('.slide').eq(i).prev().addClass('no_animation');
			$('.slide').eq(0).removeClass('animation');
			$('.slide').eq(0).addClass('no_animation');
		}
	}
}


$('.next').on('click',nextSlide);
function nextSlide(){
	pauseSlide();
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

// Создаем контент
function createContent(){
// Линия во всех сладерах
	for (var i = 0; i < $('.slide').length; i++) {
		line = createEl('div');
		$(line).addClass('line');
		$('.slide').eq(i).append($(line));
	}
// Добавляет класс kai-content к div внутри  kai-slide
	$(kaiSlide).children().not('.slides').each(function(i,el){	
		$(el).addClass('kai-content');
	});
// Переберает все kai-content и добавлет их в слайдеры 
	$('.kai-content').each(function(i,el){
		$('.slide').eq(i).append( el );
// Присваевает общий клас для описания слайдера кроме кнопок
		$(el).children().not('button').addClass('kai-text');
// Второй ребенок в kai-content - это Заголовок, добавляет нужный класс в зоголовок
		$(el).children().eq(1).not('button').removeClass('kai-text');
		$(el).children().eq(1).not('button').wrapAll('<div class="wr"></div>');
		if( $(el).find('button') ){
			$('.kai-content button').addClass('btn-kai');
		}
// Обертка для заголовка - эффект выезжания из кармашка
		$('.kai-content .wr').children().addClass('kai-title animation');
		$('.kai-content .wr').css('height', responsiveFont(opts.fontSize*4.5, w));
	});
}

// выравнивание контента по центу с учетом Большого текста
function contentHeight(){
	$('.kai-content ').css('height', 'calc(50%+'+ responsiveFont(opts.fontSize*4.5, w) +')')
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
		$(el).find('.kai-text').css('font-size', responsiveFont(opts.textSize, document.body.offsetWidth) );
		$(el).find('.kai-title').css('font-size', responsiveFont(opts.textTitle, document.body.offsetWidth) );
		$(el).find('.btn-kai').css('font-size', responsiveFont(opts.buttonSize, document.body.offsetWidth) );
	// Минимальный размер кнопки. Чтоб кнопка не были мелкого шрифта
		if( document.body.offsetWidth < 1024 ){
			$(el).find('.btn-kai').css('font-size', responsiveFont(opts.buttonSize, 767) );
		}
	});
}

// Слайдер по ширене и высоте при загрузке окна
function getResponsive(changeEl){
	$(changeEl).css('width', w + 'px');
	$(changeEl).css('height', h + 'px');
	changeFontSize();
	contentHeight();
}

// Слайдер по ширене и высоте при изминении размеров окна
function getResize(wrapper, card, item){
	$( window ).resize(function () {
		
		var w = document.body.offsetWidth,
			h = document.body.offsetHeight;
		$(wrapper).css('width', w + 'px');
		$(wrapper).css('height', h + 'px');
		$(card).css('width', w + 'px');
		$(card).css('height', h + 'px');
		for (var i = 0; i < $(item).length; i++) {
			$(item).eq(i).css({
				'width': w + 'px',
				'height': h + 'px'
			});
		}
	changeFontSize();
	contentHeight();
	});
}

// Расчет шрифта который подстраивается под ширину окна
function responsiveFont(fontSize, fromWt){
	var coeff = fromWt/1000,
		newFontSize = Math.floor(fontSize * coeff) + 'px';
	return newFontSize;
}

function createEl(el){
	return document.createElement(el);
}