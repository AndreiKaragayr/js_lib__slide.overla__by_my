# slide Overla
***
## Вы можете скачать Слайдер Zip архивом.
[![download slide Overla](http://gifimage.net/wp-content/uploads/2017/10/download-button-gif-13.gif)](https://github.com/AndreiKaragayr/slide_Overla.git)

![preview slide](/preview.png "One slide")
***
### Про библиотеку
1. slide Overla - это библиотека на jQuery, её задача превращать картинки в слайдер и создавать функционал слайдера, если таковой требуется.
2. slide Overla всегда Responsive, библиотека считывает размеры устройства и подстраивает картинку так чтобы она заполнила все пространство окна, а также исходя из размеров окна высчитываются размеры шрифта внутри слайда.
3. slide Overla включает в себя анимацию, и специально реализованный переход между слайдерами.
4. slide Overla настраиваемая библиотека, в файле  `kai_slide.js` можно настроить:
  + `timeSlide:`  -  время переключение слайдера
  + `ttTime:`  - время продолжительности анимации
  + `ttDelay:`   - время задержки анимации слайдера
  + `fontSize:`  - общий размер шрифтов
  + `titleSize:`  - размер шрифта заголовка
  + `textSize:`  -  размер шрифта текста
  + `buttonSize:`  - размер шрифта кнопки
  + `colorText:`  - цвет текста
  + `colorTitle:`  - цвет Заголовка
  + `colorBtn:`  - цвет кнопки (шрифт)
  + `colorLine:`  - цвет линии

5. #### В slide Overla входит:
 - папка `css` - стили slide Overla и стили иконок fontawesome v5
 - папка `js` - библиотеки slide Overla и jquery v3
 - папка `img` - картинки для демо
 - `demo.html` - презентационная версия библиотеки
 - `sampel.html` - простая структура одного простого блока и одного блока с  progress-bar

***
### Технические зависимости:
  + [jquery](https://jquery.com/)
  + [fontawesome v5 icon](https://fontawesome.com/)

### Шаги по установке
1. Скачать [zip архив](https://github.com/AndreiKaragayr/slide_Overla.git) или клонировать  репозиторий себе на ПК
2. Скачиваем [jquery](https://jquery.com/) - без него балета не будет )
3. В `index.html` подключаем стили `<link rel="stylesheet" href="css/kai_slide.css">` и JavaScript:
  + библиотека jquery `<script src="js/jquery-3.2.1.min.js"></script>`
  + библиотека slide Overla `<script src="js/kai_slide.js"></script>`
4. В `sample.html` можно посмотреть простую структуру:
```
<div class="kai-slide">
  <div>
    <!-- Картинка --!>
    <!-- Текст --!>
    <!-- Заголовок --!>
    <!-- Кнопка --!>
   </div>
</div>
```
 + **Обязательно родительский блок должен иметь класс `kai-slide`**.
 + **Контент одного слайдера должны быть в одном `<div>`**.
5. Структура Вашего `index.html` должна быть следующей:

```
<link rel="stylesheet" href="css/fontawesome-all.min.css">
<link rel="stylesheet" href="css/kai_slide.css">

<div class="kai-slide">
  <div>
    <!-- Картинка1 --!>
    <!-- Текст1 --!>
    <!-- Заголовок1 --!>
    <!-- Кнопка1 --!>
    </div>
   <div>
    <!-- Картинка2 --!>
    <!-- Текст2 --!>
    <!-- Заголовок2 --!>
    <!-- Кнопка2 --!>
   </div>
</div>

<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/kai_slide.js"></script>
```
6. Сохраняем свой `index.html` и все готово. Если что то не получилось можно ознакомится с `demo.html`
