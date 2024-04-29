// API URL
const API_URLS = {
  REDS: 'https://api.sampleapis.com/wines/reds',
  WHITES: 'https://api.sampleapis.com/wines/whites',
  SPARKLING: 'https://api.sampleapis.com/wines/sparkling',
  ROSE: 'https://api.sampleapis.com/wines/rose',
  DESSERT: 'https://api.sampleapis.com/wines/dessert',
};

// HTML elements
const body = document.querySelector('body');
const section = document.createElement('section');
section.classList.add('wine-info');
body.appendChild(section);

// Event listener for buttons
document.getElementById('reds').addEventListener('click', () => {
  getData(API_URLS.REDS);
});

document.getElementById('whites').addEventListener('click', () => {
  getData(API_URLS.WHITES);
});

document.getElementById('sparkling').addEventListener('click', () => {
  getData(API_URLS.SPARKLING);
});

document.getElementById('rose').addEventListener('click', () => {
  getData(API_URLS.ROSE);
});

document.getElementById('dessert').addEventListener('click', () => {
  getData(API_URLS.DESSERT);
});

async function getData(url) {
  try {
    const response = await fetch(url);
    const wines = await response.json();
    displayWines(wines.slice(0, 36));
  } catch (error) {
    console.error('Error fetching wine data:', error);
  }
}

function displayWines(wines) {
  section.innerHTML = ''; // 변경된 부분

  wines.forEach((wineData) => {
    const wineCard = document.createElement('div');
    wineCard.classList.add('wine-card');

    const img = document.createElement('img');
    img.src = wineData.image;
    img.alt = 'wine image';
    wineCard.appendChild(img);

    const wineName = createSpan('wine-name', wineData.wine);
    const winery = createSpan('winery', wineData.winery);
    const location = createSpan('location', wineData.location);
    const averageRating = createSpan('average', wineData.rating.average);

    [wineName, winery, location, averageRating].forEach((span) => {
      wineCard.appendChild(span);
    });

    section.appendChild(wineCard); // 변경된 부분
  });
}

function createSpan(className, textContent) {
  const span = document.createElement('span');
  span.classList.add(className);
  span.textContent = textContent;
  return span;
}

// Initially load white wines
getData(API_URLS.WHITES);
