
document.getElementsByTagName("div")[1].addEventListener("click", informar, true); //1
document.getElementsByTagName("div")[3].addEventListener("click", informar, true); //2
document.getElementsByTagName("button")[0].addEventListener("click",informar, true); //3
document.getElementsByTagName("div")[2].addEventListener("click", informar, false); //4
document.getElementsByTagName("div")[0].addEventListener("click", informar, false); //5

document.getElementsByTagName("body")[0].setAttribute("id","sise");
document.getElementsByTagName("body")[0].addEventListener("click", informar, false); //6

