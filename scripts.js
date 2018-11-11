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
  document.querySelector(`a#${page}`).classList.add('active');
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
  document.querySelector(`.sidenav > a#${view}`).classList.add('active');
}

function hideSidebar() {
  const gridDiv = document.querySelector('.container');
  const bodyDiv = document.querySelector('.body');

  // Hide text in sidebar so it doesn't look weird animating
  document.querySelector('.sidebar').style.fontSize = "0"

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

function showSidebar() {

  // Make sure we aren't already on portfolio page
  if(document.querySelector('#portfolio').classList.contains('active')) return;

  const gridDiv = document.querySelector('.container');
  const bodyDiv = document.querySelector('.body');

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