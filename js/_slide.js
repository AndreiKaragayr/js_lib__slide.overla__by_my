"use strict";

var images = document.querySelectorAll('.slides img');
var dots = document.querySelectorAll('.slide-bady .dots li');
var next = document.querySelector('.slide-bady .next');
var prev = document.querySelector('.slide-bady .prev');
var slideBady = document.querySelector('.slide-bady');
var slides = document.querySelector('.slides');
var slide = document.querySelectorAll('.slides .slide');
var oldWidth = document.documentElement.clientWidth;
var oldHeight = document.documentElement.clientHeight;

var intervalID = setInterval(autoSlide, 5000);
var transitionTime = 1;
var transitionDelay = 0.2;
var i = 0;

// Собираем DOM при загрузки окна
window.onload = function(){
	getSlide();
	creatLine();
	animatContent();
	getResponsive(slideBady);
	getResponsive(slides);
	getResize(slideBady, slides, slide);
}

// все картинки ставим на background
function getSlide(){
	for (var i = 0; i < images.length; i++) {
		images[i].style.display = 'none';
		slide[i].style.backgroundImage = 'url(' + images[i].src + ')';
		slide[i].style.width = document.documentElement.clientWidth + 'px';
		slide[i].style.height = document.documentElement.clientHeight + 'px';
		slide[i].style.transition = 'transform ' + transitionTime + 's' + ' ease-in-out';
		slide[i].style.transitionDelay = transitionDelay + 's';
		slide[i].classList.add('id-' + i);
		addStyle();
	}
}

// Слайдер по ширене и высоте при изминении размеров окна
function getResize(wrapper, card, item){
	window.onresize = function () {
		var width = document.documentElement.clientWidth + 'px';
		var height = document.documentElement.clientHeight + 'px';
		wrapper.style.width = width;
		wrapper.style.height = height;
		card.style.width = width;
		card.style.height = height;
		for (var i = 0; i < slide.length; i++) {
			slide[i].style.width = width;
			slide[i].style.height = height;
		}
	changeFontSize();
	contentHeight();
	}
}

// Слайдер по ширене и высоте при загрузке окна
function getResponsive(changeEl){
	changeEl.style.width = oldWidth + 'px';
	changeEl.style.height = oldHeight + 'px';
	changeFontSize();
	contentHeight();
}
// Активируем и анимируем перелистование
function addStyle(){
	slide[i].classList.add('active');
	slide[i].classList.add('animation');
}
// запуск автоперелистывания
function autoSlide(){
	nextSlide();
	changeFontSize();
}
// обновляет интервал
function pauseSlide(){
	clearInterval(intervalID);
	intervalID = setInterval(autoSlide, 5000);
}

//Для того чтобы под активным слайдом была картинка,
// делаем все слайды активными и убираем по одному
prev.onclick = prevSlide;
function prevSlide(){
	pauseSlide();
	changeFontSize();
	if( i > 0 ){
		i--;
		slide[i+1].classList.remove('active');
		slide[i+1].classList.remove('animation');
		slide[i+1].classList.add('no_animation');
		slide[i].classList.remove('no_animation');
		slide[i].classList.add('animation');
	}else{
		i = slide.length - 1;
		for (var j = 0; j < slide.length; j++) {
			slide[j].classList.add('active');
			slide[j].classList.remove('no_animation');
			slide[j].classList.add('animation');
		}
		if( slide[i].previousElementSibling ){
// если слайдер первый и переходим на последний, с первого уберем анимацию
// и с соседа слева от видемого слайда уберем анимацию 
			slide[i].previousElementSibling.classList.remove('animation');
			slide[i].previousElementSibling.classList.add('no_animation');
			slide[0].classList.remove('animation');
			slide[0].classList.add('no_animation');
		}
	}
}

next.onclick = nextSlide;
function nextSlide(){
	pauseSlide();

	if( i < slide.length - 1){
		i++;
		slide[i].classList.add('active');
		slide[i].classList.remove('no_animation');
		slide[i].classList.add('animation');
		if( slide[i].previousElementSibling ){
			slide[i].previousElementSibling.classList.remove('animation');
			slide[i].previousElementSibling.classList.add('no_animation');
		}

	}else{
		i = 0;
		for (var j = slide.length-1; j > 0; j--) {
			slide[j].classList.remove('active');
			slide[i].classList.remove('no_animation');
			slide[j].classList.remove('animation');
		}
// когда первый слайдер добавим анимацию.
		slide[i].classList.add('animation');
		slide[slide.length-1].classList.add('no_animation')
	}
// убираем анимацию с первого слайдера, чтоб анимация запустилась снова на первом
	if( !slide[i].nextElementSibling ){
		slide[0].classList.remove('animation');
		slide[0].classList.add('no_animation');
	}
}

// Создаем анимированую линию
function creatLine(){
	var slide = getAllSelection('.slides .slide');
	
	for (var j = 0; j < slide.length; j++) {
		var line = creatEl('div');
		line.classList.add('line');
		slide[j].insertBefore( line, slide[j].firstChild );
	}
}
// Применяем шрифт который подстраивается к размеру окна
function changeFontSize(){
	var titleSl = getAllSelection('.slide .content .text');
	var bigText = getAllSelection('.slide .content .title');
	var button = getAllSelection('.slide .content .btn-slide');
	var wr = getAllSelection('.slide .content .wr');
	for (var j = 0; j < titleSl.length; j++) {
		titleSl[j].style.fontSize = fontSize(16*3, document.documentElement.clientWidth);
	}
	for (var j = 0; j < bigText.length; j++) {
		bigText[j].style.fontSize = fontSize(16*4.5, document.documentElement.clientWidth);
	}
	for (var j = 0; j < wr.length; j++) {
		wr[j].style.fontSize = fontSize(16*4.5, document.documentElement.clientWidth);
	}
	for (var j = 0; j < button.length; j++) {
		button[j].style.fontSize = fontSize(12, document.documentElement.clientWidth);
	}
	if(document.documentElement.clientWidth < 1024){
		for (var j = 0; j < button.length; j++) {
			button[j].style.fontSize = fontSize(12, 767);
		}
	}
}

// аминируем контент
function animatContent(){
	var contentAll = getAllSelection('.slide .content');
	var button = getAllSelection('.slide .content button');
	for (var j = 0; j < contentAll.length; j++) { 
// получим все блоки из content и добавим класс анимации и стили
		for (var i = 0; i < contentAll[j].childNodes.length; i++) {
			contentAll[j].childNodes[i].className = 'text';
			contentAll[j].childNodes[i].className += ' animation';
// второй блок всегда Заголовок слайдера добавим ему отдельный класс
			var titleSl = contentAll[j].childNodes[3];
			titleSl.classList.replace('text', 'title');
// найдем кнопку в слайдере и ей зададим класс
			button[j].classList.replace('text', 'btn-slide');
		}
	}
// для эффекта появления Заголовка, создаем обертку на каждом блоке с классом title
	var titleSl = getAllSelection('.slide .content .title');
	for (var i = 0; i < contentAll.length; i++) {
		var wr = creatEl('div');
		wr.className = 'wr';
		// wr.style.height = fontSize(16*4.5, oldWidth);
		contentAll[i].insertBefore( wr, contentAll[i].childNodes[3] );
		for (var j = 0; j < titleSl.length; j++) {
			wr.appendChild(titleSl[i]);
		}
	}
}
// выравнивание контента по центу с учетом Большого текста
function contentHeight(){
	var contentAll = getAllSelection('.slide .content');
	var wr = getAllSelection('.slide .content .wr');
	for (var j = 0; j < contentAll.length; j++) {
		contentAll[j].style.height = 'calc(50% + ' + fontSize(16*4.5, document.body.clientWidth) +')';
	} 
}

// вспомогательные функции
function creatEl(el){
	return document.createElement(el);
}
function getSelection(el){
	return document.querySelector(el);
}
function getAllSelection(el){
	return document.querySelectorAll(el);
}
// Расчет шрифта который подстраивается под ширину окна
function fontSize(fontSize, fromWt){
	// fontSize = 16;
	var coeff = fromWt/1000;
	var newFontSize = Math.floor(fontSize * coeff) + 'px';
	return newFontSize;
}