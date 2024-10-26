function injectButton() {
  console.log('injectButton function called');
  if (document.getElementById('flowww-studio-extension-button')) {
    console.log('Button already exists');
    return;
  }

  const sidebar = document.querySelector('.left-sidebar-links');
  if (sidebar) {
    console.log('Sidebar found, injecting button');
    const button = document.createElement('div');
    button.id = 'flowww-studio-extension-button';
    button.className = 'button top';
    button.innerHTML = `
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="bem-Svg" style="display: block; position: relative; left: 1px;">
        <path d="M1.25 7.7456V5.78873H2.48218V1.875H7.71893V3.83187H4.63849V5.78873H7.10284V7.7456H4.63849V16.294H2.48218V7.7456H1.25Z" fill="white"/>
        <path d="M8.03099 12.9982H10.3927C10.4953 13.2866 10.6802 13.5544 10.9061 13.781C11.2963 14.1724 11.9123 14.5431 12.9597 14.5431C14.6026 14.5431 15.116 13.9252 15.116 13.3072C15.116 12.4215 13.4731 12.2155 11.8302 11.8447C10.1873 11.4739 8.54439 10.6912 8.54439 8.67254C8.54439 7.12764 10.0846 5.58275 12.6517 5.58275C14.7053 5.58275 15.8553 6.40669 16.4919 7.23063C16.8616 7.7044 17.1286 8.26056 17.2723 8.87852H15.0133C14.9106 8.63134 14.7669 8.40475 14.5615 8.21937C14.2124 7.88979 13.6169 7.53961 12.6517 7.53961C11.3373 7.53961 10.8034 8.09578 10.8034 8.69313C10.8034 9.57887 12.4463 9.76426 14.0892 10.135C15.7321 10.5058 17.375 11.2886 17.375 13.3072C17.375 14.9551 15.8348 16.5 12.9597 16.5C10.7828 16.5 9.59175 15.6349 8.87297 14.7491C8.46225 14.2342 8.17474 13.6574 8.03099 12.9982Z" fill="white"/>
        </svg>
    `;
    sidebar.appendChild(button);
    console.log('Button injected');

    button.addEventListener('click', toggleFlowwwStudioPanel);
  } else {
    console.log('Sidebar not found');
  }
}

function toggleFlowwwStudioPanel() {
  const button = document.getElementById('flowww-studio-extension-button');
  const existingPanel = document.querySelector('.flowww_src-modules-ui_panel');
  if (existingPanel) {
    existingPanel.remove();
    button.classList.remove('active');
  } else {
    appendFlowwwStudioPanel();
    button.classList.add('active');
  }
}

function appendFlowwwStudioPanel() {
  const panel = document.createElement('div');
  panel.className = 'flowww_src-modules-ui_panel';
  panel.innerHTML = `
    <div class="flowww_sidebar flowww_module-ui-menu">
      <div class="flowww_header">
        <h2 class="flowww_title">Flowww Studio</h2>
        <button class="flowww_close-button">
          <svg data-wf-icon="CloseDefaultIcon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70714 8.00004L12.3536 4.35359L11.6465 3.64648L8.00004 7.29293L4.35359 3.64648L3.64648 4.35359L7.29293 8.00004L3.64648 11.6465L4.35359 12.3536L8.00004 8.70714L11.6465 12.3536L12.3536 11.6465L8.70714 8.00004Z" fill="currentColor"></path>
          </svg>
        </button>
      </div>
      <button id="keyword-density" title="Keyword Density" class="flowww_module-ui-button">
        <div class="flowww_icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_243_21)">
              <path d="M1 10.5C1 13.0196 2.00089 15.4359 3.78249 17.2175C5.56408 18.9991 7.98044 20 10.5 20C13.0196 20 15.4359 18.9991 17.2175 17.2175C18.9991 15.4359 20 13.0196 20 10.5C20 7.98044 18.9991 5.56408 17.2175 3.78249C15.4359 2.00089 13.0196 1 10.5 1C7.98044 1 5.56408 2.00089 3.78249 3.78249C2.00089 5.56408 1 7.98044 1 10.5Z" stroke="white" stroke-width="2"/>
              <path d="M17.2173 17.2178L23 23" stroke="white" stroke-width="2"/>
              <path d="M6 6.5H15" stroke="white" stroke-width="2"/>
              <path d="M6 10.5H15" stroke="white" stroke-width="2"/>
              <path d="M6 14.5H11" stroke="white" stroke-width="2"/>
            </g>
            <defs>
              <clipPath id="clip0_243_21">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="flowww_label">Keyword Density</div>
      </button>
    </div>
  `;

  document.body.appendChild(panel);

  // Add event listener for close button
  panel.querySelector('.flowww_close-button').addEventListener('click', () => {
    panel.remove();
    document.getElementById('flowww-studio-extension-button').classList.remove('active');
  });

  // Add event listener for keyword density button
  panel.querySelector('#keyword-density').addEventListener('click', toggleKeywordDensityPanel);
}

function toggleKeywordDensityPanel() {
  const keywordDensityButton = document.querySelector('#keyword-density');
  const existingPanel = document.querySelector('#keyword-density-panel');
  if (existingPanel) {
    existingPanel.remove();
    keywordDensityButton.classList.remove('active');
  } else {
    appendKeywordDensityPanel();
    keywordDensityButton.classList.add('active');
  }
}

function appendKeywordDensityPanel() {
  const uiPanel = document.querySelector('.flowww_src-modules-ui_panel');
  if (!uiPanel) {
    console.error('UI panel not found');
    return;
  }

  const panel = document.createElement('div');
  panel.id = 'keyword-density-panel';
  panel.className = 'flowww_sidebar full';
  panel.innerHTML = `
    <div class="flowww_module-ui_header">
      <h3 class="flowww_title">Webflow Keyword Density</h3>
      <button class="flowww_close-button">
        <svg data-wf-icon="CloseDefaultIcon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70714 8.00004L12.3536 4.35359L11.6465 3.64648L8.00004 7.29293L4.35359 3.64648L3.64648 4.35359L7.29293 8.00004L3.64648 11.6465L4.35359 12.3536L8.00004 8.70714L11.6465 12.3536L12.3536 11.6465L8.70714 8.00004Z" fill="currentColor"></path>
        </svg>
      </button>
    </div>
    <div class="flowww_module-ui_body">
      <div class="flowww_keyword-density-form">
        <div class="flowww_input-wrapper">
          <div class="flowww_input-icon">
            <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 5C8.5 6.933 6.933 8.5 5 8.5C3.067 8.5 1.5 6.933 1.5 5C1.5 3.067 3.067 1.5 5 1.5C6.933 1.5 8.5 3.067 8.5 5ZM7.96544 9.0261C7.13578 9.63821 6.11014 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5C10 6.11014 9.63821 7.13578 9.0261 7.96544L12.5303 11.4697L11.4697 12.5303L7.96544 9.0261Z" fill="currentColor"/>
            </svg>
          </div>
          <input class="flowww_input" type="text" id="keyword-input" placeholder="Enter keyword">
        </div>
        <button class="flowww_button" id="add-keyword">Add Keyword</button>
      </div>
      <ul id="keyword-list"></ul>
      <button class="flowww_button" id="analyze-keywords">Analyze Keywords</button>
      <table id="results-table" class="keyword-table">
        <thead class="keyword-table-header">
          <tr class="keyword-row">
            <th class="theader-keyword-name">Keyword</th>
            <th class="theader-paragraphs">Paragraphs</th>
            <th class="theader-headings">Headings</th>
            <th class="theader-meta-title">Meta Title</th>
            <th class="theader-meta-description">Meta Description</th>
            <th class="theader-links">Links</th>
          </tr>
        </thead>
        <tbody class="keyword-table-body">
        </tbody>
      </table>
    </div>
  `;

  uiPanel.appendChild(panel);

  // Add event listener for close button
  panel.querySelector('.flowww_close-button').addEventListener('click', () => {
    panel.remove();
    document.querySelector('#keyword-density').classList.remove('active');
  });

  // Add event listener for add keyword button
  panel.querySelector('#add-keyword').addEventListener('click', addKeyword);

  // Add event listener for enter key on keyword input
  const keywordInput = panel.querySelector('#keyword-input');
  keywordInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addKeyword();
    }
  });

  // Add event listener for analyze keywords button
  panel.querySelector('#analyze-keywords').addEventListener('click', analyzeKeywords);
}

function addKeyword() {
  const input = document.querySelector('#keyword-input');
  const keyword = input.value.trim();
  
  if (keyword) {
    // Add to keyword list
    const keywordList = document.querySelector('#keyword-list');
    const listItem = document.createElement('li');
    listItem.textContent = keyword;
    listItem.addEventListener('click', () => removeKeyword(keyword));
    keywordList.appendChild(listItem);

    // Add to table
    const tableBody = document.querySelector('.keyword-table-body');
    const newRow = document.createElement('tr');
    newRow.className = 'keyword-row';
    newRow.dataset.keyword = keyword;
    newRow.innerHTML = `
      <td class="keyword-name"><div class="density-ratio">${keyword}</div></td>
      <td class="paragraphs"><div class="density-ratio"></div></td>
      <td class="headings"><div class="density-ratio"></div></td>
      <td class="meta-title"><div class="density-ratio"></div></td>
      <td class="meta-description"><div class="density-ratio"></div></td>
      <td class="links"><div class="density-ratio"></div></td>
    `;
    tableBody.appendChild(newRow);
    
    // Clear the input field
    input.value = '';
  }
}

function analyzeKeywords() {
  const keywords = Array.from(document.querySelectorAll('.keyword-name .density-ratio'))
    .map(el => el.textContent);

  if (keywords.length > 0) {
    const results = analyzeKeywordDensity(keywords);
    displayResults(results);
  }
}

function displayResults(results) {
  const rows = document.querySelectorAll('.keyword-table-body .keyword-row');
  
  results.forEach((result, index) => {
    if (rows[index]) {
      const cells = rows[index].querySelectorAll('.density-ratio');
      cells[1].textContent = result.paragraphs.toFixed(2) + '%';
      cells[2].textContent = result.headings.toFixed(2) + '%';
      cells[3].textContent = result.metaTitle;
      cells[4].textContent = result.metaDescription.toFixed(2) + '%';
      cells[5].textContent = result.links;
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkWebflowDesigner') {
    injectButton();
  }
});

// Extract project name from URL
function getProjectName() {
  const match = window.location.hostname.match(/^(.+)\.design\.webflow\.com$/);
  return match ? match[1] : null;
}

// Analyze keyword density
function analyzeKeywordDensity(keywords) {
  try {
    const mainContent = document.querySelector('.main-wrapper') || document.querySelector('main');
    if (!mainContent) {
      throw new Error('Main content area not found');
    }

    const paragraphElements = mainContent.querySelectorAll('p, div');
    const headingElements = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const linkElements = mainContent.querySelectorAll('a');
    
    if (paragraphElements.length === 0) {
      console.warn('No paragraph elements found');
    }
    if (headingElements.length === 0) {
      console.warn('No heading elements found');
    }

    let totalWords = 0;
    let totalHeadingWords = 0;
    const keywordCounts = {};
    const headingKeywordCounts = {};
    const linkKeywordCounts = {};

    keywords.forEach(keyword => {
      if (typeof keyword !== 'string' || keyword.trim() === '') {
        throw new Error('Invalid keyword: ' + keyword);
      }
      keywordCounts[keyword] = 0;
      headingKeywordCounts[keyword] = 0;
      linkKeywordCounts[keyword] = 0;
    });

    function countKeywordOccurrences(text, keyword) {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\w{0,4}\\b`, 'g');
      return (text.match(regex) || []).length;
    }

    // Analyze paragraphs
    paragraphElements.forEach(element => {
      const text = element.textContent.toLowerCase();
      const words = text.match(/\b\w+\b/g) || [];
      totalWords += words.length;

      keywords.forEach(keyword => {
        const count = countKeywordOccurrences(text, keyword);
        keywordCounts[keyword] += count;
      });
    });

    // Analyze headings
    headingElements.forEach(element => {
      const text = element.textContent.toLowerCase();
      const words = text.match(/\b\w+\b/g) || [];
      totalHeadingWords += words.length;

      keywords.forEach(keyword => {
        const count = countKeywordOccurrences(text, keyword);
        headingKeywordCounts[keyword] += count;
      });
    });

    // Analyze links
    linkElements.forEach(element => {
      const text = element.textContent.toLowerCase();
      keywords.forEach(keyword => {
        const count = countKeywordOccurrences(text, keyword);
        linkKeywordCounts[keyword] += count;
      });
    });

    // Get current page name
    const pageNameElement = document.querySelector('[data-automation-id="top-bar-page-name"] [data-text="true"]');
    const pageName = pageNameElement ? pageNameElement.textContent : '';
    if (!pageName) {
      console.warn('Page name not found');
    }

    // Get meta title
    const metaTitleElement = document.querySelector(`[data-automation-id="PageSettingsForm-${pageName}-page-seo-title-field-input"]`);
    const metaTitle = metaTitleElement ? metaTitleElement.value : '';
    if (!metaTitle) {
      console.warn('Meta title not found');
    }

    // Get meta description
    const metaDescElement = document.querySelector(`[data-automation-id="PageSettingsForm-${pageName}-seo-desc-field-input"]`);
    const metaDescription = metaDescElement ? metaDescElement.value : '';
    if (!metaDescription) {
      console.warn('Meta description not found');
    }

    return keywords.map(keyword => {
      const keywordCount = keywordCounts[keyword];
      const headingKeywordCount = headingKeywordCounts[keyword];
      const density = totalWords > 0 ? (keywordCount / totalWords) * 100 : 0;
      const headingDensity = totalHeadingWords > 0 ? (headingKeywordCount / totalHeadingWords) * 100 : 0;

      const metaTitlePresent = metaTitle.toLowerCase().includes(keyword.toLowerCase());
      const metaDescCount = countKeywordOccurrences(metaDescription.toLowerCase(), keyword);
      const metaDescWords = metaDescription.match(/\b\w+\b/g) || [];
      const metaDescDensity = metaDescWords.length > 0 ? (metaDescCount / metaDescWords.length) * 100 : 0;

      return {
        keyword: keyword,
        paragraphs: isNaN(density) ? 0 : density,
        headings: isNaN(headingDensity) ? 0 : headingDensity,
        metaTitle: metaTitlePresent ? 'Present' : 'Absent',
        metaDescription: isNaN(metaDescDensity) ? 0 : metaDescDensity,
        links: linkKeywordCounts[keyword]
      };
    });
  } catch (error) {
    console.error('Error analyzing keyword density:', error);
    return [];
  }
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getProjectName') {
    sendResponse({ projectName: getProjectName() });
  } else if (request.action === 'analyzeKeywords') {
    const results = analyzeKeywordDensity(request.keywords);
    sendResponse({ results: results });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkWebflowDesigner') {
    const isWebflowDesigner = window.location.hostname.endsWith('.webflow.com') && window.location.pathname.includes('/design/');
    if (isWebflowDesigner) {
      injectButton();
    }
  }
});

let projectName = '';
let keywords = [];

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getProjectName' }, (response) => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
          return;
        }
        if (response && response.projectName) {
          projectName = response.projectName;
          const projectInfoElement = document.getElementById('project-info');
          if (projectInfoElement) {
            projectInfoElement.textContent = `Project: ${projectName}`;
          }
        }
      });
    }
  });

  const addKeywordButton = document.getElementById('add-keyword');
  if (addKeywordButton) {
    addKeywordButton.addEventListener('click', addKeyword);
  }

  const analyzeButton = document.getElementById('analyze');
  if (analyzeButton) {
    analyzeButton.addEventListener('click', analyzeKeywords);
  }
  console.log('DOMContentLoaded event fired');
  injectButton();
});

function removeKeyword(keyword) {
  // Remove from keyword list
  const keywordList = document.querySelector('#keyword-list');
  const listItem = Array.from(keywordList.children).find(li => li.textContent === keyword);
  if (listItem) {
    listItem.remove();
  }

  // Remove from table
  const tableBody = document.querySelector('.keyword-table-body');
  const row = tableBody.querySelector(`tr[data-keyword="${keyword}"]`);
  if (row) {
    row.remove();
  }

  // Remove from keywords array
  const index = keywords.indexOf(keyword);
  if (index > -1) {
    keywords.splice(index, 1);
  }

  // Update analysis if needed
  if (keywords.length > 0) {
    analyzeKeywords();
  }
}
