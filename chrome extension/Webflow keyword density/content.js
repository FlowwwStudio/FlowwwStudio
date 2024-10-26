function injectButton() {
  const sidebar = document.querySelector('.left-sidebar-links');
  if (sidebar) {
    const button = document.createElement('div');
    button.id = 'keyword-density-button';
    button.className = 'button top';
    button.innerHTML = `
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.25 7.7456V5.78873H2.48218V1.875H7.71893V3.83187H4.63849V5.78873H7.10284V7.7456H4.63849V16.294H2.48218V7.7456H1.25Z" fill="white"/>
        <path d="M8.03099 12.9982H10.3927C10.4953 13.2866 10.6802 13.5544 10.9061 13.781C11.2963 14.1724 11.9123 14.5431 12.9597 14.5431C14.6026 14.5431 15.116 13.9252 15.116 13.3072C15.116 12.4215 13.4731 12.2155 11.8302 11.8447C10.1873 11.4739 8.54439 10.6912 8.54439 8.67254C8.54439 7.12764 10.0846 5.58275 12.6517 5.58275C14.7053 5.58275 15.8553 6.40669 16.4919 7.23063C16.8616 7.7044 17.1286 8.26056 17.2723 8.87852H15.0133C14.9106 8.63134 14.7669 8.40475 14.5615 8.21937C14.2124 7.88979 13.6169 7.53961 12.6517 7.53961C11.3373 7.53961 10.8034 8.09578 10.8034 8.69313C10.8034 9.57887 12.4463 9.76426 14.0892 10.135C15.7321 10.5058 17.375 11.2886 17.375 13.3072C17.375 14.9551 15.8348 16.5 12.9597 16.5C10.7828 16.5 9.59175 15.6349 8.87297 14.7491C8.46225 14.2342 8.17474 13.6574 8.03099 12.9982Z" fill="white"/>
        </svg>
    `;
    sidebar.appendChild(button);

    button.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'openPopup' });
    });
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkWebflowDesigner') {
    const isWebflowDesigner = window.location.hostname.endsWith('.webflow.com') && window.location.pathname.includes('/design/');
    if (isWebflowDesigner) {
      injectButton();
    }
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
