// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==
let keywords = ["Гобой", "Как звучит флейта", "Кларнет", 'Теория музыки', 'Саксофон', 'Тромбон', 'Валторна'];
let keyword = keywords[getRandom(0, keywords.length)];
let text = document.getElementsByClassName("input__control input__input mini-suggest__input")[0]; //обращение к поисковой строке
let i = 0;
let links = document.links;

if (text != undefined) {
  //document.getElementsByClassName("input__control input__input mini-suggest__input")[0].value = keyword; (было, когда набирали слово сразу целиком)
    let timerId = setInterval(()=>{
        text.value +=keyword[i]; //пишем слово в поисковой строке по буквам с задержкой в 1000
        i++;
        if (i==keyword.length) {
            clearInterval(timerId); //если слово в поисковой строке набрано - stop и кликаем по кнопке Поиск
            document.getElementsByTagName("button")[0].click();
        }
    },1000);
//а если мы уже на стрице сайта - кликаем по разным ссылкам(80%) с рандомной паузой и в 20% случаев возвращаемся на Яндекс
}else if(location.hostname=="xn----7sbab5aqcbiddtdj1e1g.xn--p1ai"){
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if (getRandom(0, 101)>=80){
            location.href='https://www.yandex.com/';
        }
        else if (links[index].href.indexOf ("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") !=-1){
            links[index].click();
        }

    },getRandom(3000, 7000))

} else {
    let nextYandexPage = true;

//удаляем target - чтобы сайт открывался в той же вкладке
    Array.from(document.querySelectorAll('a[target="_blank"]')).forEach((link) =>
            link.removeAttribute("target"));

//если нужная ссылка на старнице найдена, кликаем по ней с рандомной задержкой
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1) {
            let link = links[i];
            nextYandexPage = false;
            setTimeout(()=>{link.click();},getRandom(1000,4000));
            break;
        }

    }
    //если ссылка на старнице не найдена,то переходим на другие страницы (до 10 страницы включительно)
    let page = document.getElementsByClassName("pager__item pager__item_current_yes pager__item_kind_page")[0];
    if(page.innerText=="10") {
        nextYandexPage = false;
        location.href = 'https://www.yandex.com/';
    }
    if (nextYandexPage){
        setTimeout(()=>{
            document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem")[0].click();
        },getRandom(1000,4000));
    }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
