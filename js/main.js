import heroSlider from "./banner";
import "../index.css";
import "../activities.css";
import "./../node_modules/@glidejs/glide/dist/css/glide.core.min.css";



addEventListener("DOMContentLoaded", (event) => {
  init();
});

function init() {
  heroSlider()
  const icon = document.getElementById("nav-icon1");
  icon.addEventListener("click", openNav);
  const header = document.getElementById("header-container");

  window.addEventListener("scroll", debounce(hideNav));
  const read = document.querySelectorAll(".readmore");

  read.forEach((element) => {
    element.addEventListener("mouseover", () => readMore(element));
    element.addEventListener("mouseleave", () => readMoreLeave(element));
  });

  const image = document.querySelectorAll(".image-container");
  console.log(image);
  image.forEach((element) => {
    element.addEventListener("mouseover", () => featureEffect(element));
    element.addEventListener("mouseleave", () => featureEffectRemove(element));

    // element.addEventListener('mouseleave',()=>readMoreLeave(element))
  });

  //

  loadEvents();

 
}

// icon.addEventListener('click', openNav);
// var url = window.location.pathname;
// if (url == "/index.html" || "/") {
//     setTimeout(function () {
//         document.getElementById('lead1').classList.remove('none');
//         document.getElementById('lead2').classList.remove('none');
//         displayText();
//        }, 500)

//     bannerLoop();
// }

// https://www.educative.io/answers/how-to-use-the-debounce-function-in-javascript

// debounce to stop scroll event firing too often
function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function hideNav() {
  var currentScrollPos = window.pageYOffset;
  // const commonlinks = document.getElementById("commonlinkscontainer");
  // const logo = document.getElementById("logoimage");
  // const logonav = document.getElementById("logonav");
  const common = document.getElementById("commonlinks-cont");

  const mainheader = document.getElementById("header-container");
  const logo = document.getElementById("logo");

  if (currentScrollPos > 200) {
    mainheader.classList.add("small");
    logo.classList.add("small");
    common.classList.add("vanish");
    common.style.display = "none";
    mainheader.style.opacity = ".95";
  } else {
    mainheader.classList.remove("small");
    logo.classList.remove("small");
    common.classList.remove("vanish");
    common.style.display = "block";
    mainheader.style.opacity = "1";
  }
}

const formatDate = (date) => {
  const splitDate = date.split("-");

  const month = getMonth(parseInt(splitDate[1]) - 1);
  return `${splitDate[2]} ${month} ${splitDate[0]}`;
};

const getMonth = (month) =>
  [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][month];

async function loadEvents() {
  try {
    const endpoint = await fetch(`./.netlify/functions/callFetch`);
    const data = await endpoint.json();

    const list = document.getElementById("calender-list");
    if (data.items.length >= 3) {
      data.items.slice(0, 3).map((item) => {
        const newLi = document.createElement("li");
        const newP3 = document.createElement("h3");
        const createAnchor = document.createElement("a");
        createAnchor.setAttribute("href", item.htmlLink);
        const newContent = document.createTextNode(item.summary);
        newP3.append(newContent);
        createAnchor.append(newP3);
        const newP = document.createElement("p");
        const newDesc = document.createTextNode(item.description);
        newP.append(newDesc);

        const newP2 = document.createElement("p");
        const date = document.createTextNode(formatDate(item.start.date));
        newP2.append(date);

        newLi.append(createAnchor, newP2, newP);
        list.append(newLi);
      });
    }
  } catch (e) {
    console.log(e);
  }
}

const readMore = (element) => {
  const chevron = document.getElementById(element.childNodes[1].id);
  chevron.classList.add("move");
};

const readMoreLeave = (element) => {
  const chevron = document.getElementById(element.childNodes[1].id);
  chevron.classList.remove("move");
};

function openNav() {
  const mobileNav = document.getElementById("mobile-nav");
  const icon = document.getElementById("nav-icon1");
  mobileNav.classList.toggle("open");
  icon.classList.toggle("open");
}

const featureEffect = (element) => {
  const imageContainer = document.getElementById(element.childNodes[3].id);
  imageContainer.classList.add("line");
};

const featureEffectRemove = (element) => {
  const imageContainer = document.getElementById(element.childNodes[3].id);
  imageContainer.classList.remove("line");
};

// new Glide('.glide').mount()




