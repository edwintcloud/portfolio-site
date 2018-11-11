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
  document.querySelector(`.sidenav > a#${page}`).classList.add('active');
}