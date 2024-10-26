let projectName = '';
let keywords = [];

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getProjectName' }, (response) => {
      if (response && response.projectName) {
        projectName = response.projectName;
        document.getElementById('project-info').textContent = `Project: ${projectName}`;
      }
    });
  });

  document.getElementById('add-keyword').addEventListener('click', addKeyword);
  document.getElementById('analyze').addEventListener('click', analyzeKeywords);
});

function addKeyword() {
  const input = document.getElementById('keyword-input');
  const keyword = input.value.trim();
  if (keyword && !keywords.includes(keyword)) {
    keywords.push(keyword);
    saveKeywords(); // Save keywords after adding a new one
    updateKeywordList();
    input.value = '';
  }
}

function updateKeywordList() {
  const list = document.getElementById('keyword-list');
  list.innerHTML = '';
  keywords.forEach((keyword, index) => {
    const li = document.createElement('li');
    li.textContent = keyword;
    if (index === 0) {
      li.classList.add('primary');
    }
    list.appendChild(li);
  });
}

function analyzeKeywords() {
  if (keywords.length === 0) return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'analyzeKeywords', keywords: keywords }, (response) => {
      if (response && response.results) {
        displayResults(response.results);
        saveResults(response.results); // Save results after analysis
      }
    });
  });
}

function displayResults(results) {
  const table = document.getElementById('results-table');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  results.forEach((result, index) => {
    const row = tbody.insertRow();
    Object.values(result).forEach((value, cellIndex) => {
      const cell = row.insertCell();
      cell.textContent = typeof value === 'number' ? value.toFixed(2) + '%' : value;
      if (cellIndex > 0) {
        cell.classList.add(getDensityClass(value, cellIndex));
      }
    });
  });

  table.style.display = 'table';
}

function getDensityClass(value, type) {
  if (value === 0) return 'red';
  const ranges = [
    [1, 2],  // Paragraphs
    [0.5, 1.5],  // Headings
    [0.5, 1.5],  // Meta Title
    [1, 2],  // Meta Description
  ];
  const range = ranges[type - 1];
  if (value >= range[0] && value <= range[1]) return 'green';
  return 'orange';
}

// Save data to Chrome storage
function saveData(data) {
  chrome.storage.sync.set(data, function() {
    console.log('Data saved');
  });
}

// Load data from Chrome storage
function loadData(keys, callback) {
  chrome.storage.sync.get(keys, function(result) {
    console.log('Data loaded');
    callback(result);
  });
}

// Save keywords
function saveKeywords() {
  saveData({keywords: keywords});
}

// Load keywords
function loadKeywords() {
  loadData(['keywords'], function(result) {
    if (result.keywords) {
      keywords = result.keywords;
      updateKeywordList();
    }
  });
}

function saveResults(results) {
  saveData({results: results});
}

function loadResults() {
  loadData(['results'], function(result) {
    if (result.results) {
      displayResults(result.results);
    }
  });
}

// Call loadResults when the popup opens
document.addEventListener('DOMContentLoaded', function() {
  loadKeywords();
  loadResults();
});
