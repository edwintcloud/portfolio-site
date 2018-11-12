// Handle swipes left and right to change pages
const bodySection = document.querySelector('.body');
let touchX = null;
let touchY = null;
bodySection.addEventListener('touchstart', function (e) {
  touchX = e.touches[0].screenX;
  touchY = e.touches[0].screenY;
});
bodySection.addEventListener('touchend', function(e) {
  const portfolioLink = document.getElementById('portfolio');
  if(touchX - e.changedTouches[0].screenX >= 50) {
    const pages = document.querySelectorAll('.navbar > a');
    for(var i = 0, l = pages.length;i < l-1; i++) {
      if(pages[i].classList.contains('active')) {
        window.location ='#' + pages[i+1].id;
      }
    }
  } else if(e.changedTouches[0].screenX -  touchX >= 50) {
    const pages = document.querySelectorAll('.navbar > a');
    for(var i = pages.length-1;i >= 1; i--) {
      if(pages[i].classList.contains('active')) {
        window.location = '#' + pages[i-1].id;
      }
    }
  } else if(touchY - e.changedTouches[0].screenY >= 50 && portfolioLink.classList.contains('active')) {
    const views = document.querySelectorAll('.sidenav > a');
    for(var i = 0, l = views.length;i < l-1; i++) {
      if(views[i].classList.contains('active')) {
        window.location ='#portfolio#' + views[i+1].id;
      }
    }
  } else if(e.changedTouches[0].screenY - touchY >= 50 && portfolioLink.classList.contains('active')) {
    const views = document.querySelectorAll('.sidenav > a');
    for(var i = views.length-1;i >= 1; i--) {
      if(views[i].classList.contains('active')) {
        window.location = '#portfolio#' + views[i-1].id;
      }
    }
  }
  touchX = null;
  touchY = null;
});

// Detect hash change
window.onhashchange = function(e) {
  const hashes = e.newURL.split('#');
  if(hashes[1] == 'portfolio') {
    loadPage(hashes[1]);
    showSidebar();
    if(hashes[2]) {
      loadSubview(hashes[2]);
    } else {
      loadSubview('project-1');
    }
  } else if(hashes[1] == 'about' || hashes[1] == 'contact') {
    loadPage(hashes[1]);
    hideSidebar();
  }
}

// if we end up on blank page, redirect to about
setInterval(function() {
  if(document.querySelector('.content').innerHTML.indexOf('Please wait...') !== -1) {
    window.location = '';
  }
}, 500);


/**
 * @param  {String} url - url for context to be fetched from
 * @return  {String} - the resulting HTML string fragment
 */
async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

/**
 * @param  {String} page - page name to be loaded into content div
 */
async function loadPage(page) {
  const contentDiv = document.querySelector('.content');
  contentDiv.innerHTML = await fetchHtmlAsText(`${page}.html`);
  document.querySelectorAll('a').forEach(el => {
    el.classList.remove('active');
  });
  document.querySelectorAll('.header .dot').forEach(el => {
    el.classList.remove('filled');
  });
  document.querySelector(`a#${page}`).classList.add('active');
  document.querySelector(`#dot-${page}`).classList.add('filled');
}

/**
 * @param  {String} view - view name to be loaded into content div
 */
async function loadSubview(view) {
  const contentDiv = document.querySelector('.content');
  contentDiv.innerHTML = await fetchHtmlAsText(`views/${view}.html`);
  document.querySelectorAll('.sidenav > a').forEach(el => {
    el.classList.remove('active');
  });
  document.querySelectorAll('.sidebar .dot').forEach(el => {
    el.classList.remove('filled');
  });
  document.querySelector(`.sidenav > a#${view}`).classList.add('active');
  document.querySelector(`#dot-${view}`).classList.add('filled');
}


// Hides sidebar with slide right animation
function hideSidebar() {
  const gridDiv = document.querySelector('.container');
  const bodyDiv = document.querySelector('.body');

  // Hide text in sidebar so it doesn't look weird animating
  document.querySelector('.sidebar').style.fontSize = "0"

  // hide body content until the animation finishes
  document.querySelector('.content').style.display = 'none';

  // Get client width of sidebar
  let sidebarWidth = document.querySelector('.sidebar').clientWidth;
  const interval = sidebarWidth / 15;

  // Animate last column of grid (sidebar) width down to 0 for slide right effect
  const animation = setInterval(slideRight, 15);
  function slideRight() {
    if (sidebarWidth <= 0) {
      if (window.matchMedia('(max-device-width: 700px)').matches) {
        gridDiv.style.gridTemplateColumns = `1fr 1fr 1fr 0 0`;
      } else {
        gridDiv.style.gridTemplateColumns = `1fr 1fr 1fr 1fr 0`;
      }
      document.querySelector('.content').style.display = 'block';
      clearInterval(animation);
    } else {
      sidebarWidth -= interval;
      if (window.matchMedia('(max-device-width: 700px)').matches) {
        gridDiv.style.gridTemplateColumns = `1fr 1fr 1fr ${sidebarWidth/2}px ${sidebarWidth/2}px`;
      } else {
        gridDiv.style.gridTemplateColumns = `1fr 1fr 1fr 1fr ${sidebarWidth}px`;
      }
    }
  }
}

// Shows sidebar with slide left animation
function showSidebar() {

  // Make sure we aren't already on portfolio page
  if(document.querySelector('#portfolio').classList.contains('active')) return;

  const gridDiv = document.querySelector('.container');

  // hide body content until the animation finishes
  document.querySelector('.content').style.display = 'none';

  // Set counter and interval
  let counter = 0;
  const interval = 1 / 15;

  // Animate last column of grid (sidebar) width up to 1fr for slide left effect
  const animation = setInterval(slideLeft, 15);
  function slideLeft() {
    if (counter >= 1) {
      gridDiv.style.gridTemplateColumns = `repeat(5, 1fr)`;
      // Show text in sidebar
      document.querySelector('.sidebar').style.fontSize = "1em"
      document.querySelector('.content').style.display = 'block';
      clearInterval(animation);
    } else {
      counter += interval;
      if (window.matchMedia('(max-device-width: 700px)').matches) {
        gridDiv.style.gridTemplateColumns = `1fr 1fr 1fr ${counter}fr ${counter}fr`;
      } else {
        gridDiv.style.gridTemplateColumns = `1fr 1fr 1fr 1fr ${counter}fr`;
      }
    }
  }
}
