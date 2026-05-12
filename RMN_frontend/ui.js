export const elements = {
    fileInput: document.getElementById('fileInput'),
    buton_predict: document.getElementById('buton_predict'),
    statusBtn: document.getElementById('buton_status'),
    statusBox: document.getElementById('statusContainer'),
    errorBox: document.getElementById('errorContainer'),
    loadingBox: document.getElementById('loadingContainer'),
    resultBox: document.getElementById('resultContainer'),
    json_res: document.getElementById('json_res'),
    imagesGrid: document.getElementById('imagesGrid'),
    body: document.getElementById('body'),
    mainCard: document.getElementById('mainCard'),
    mainTitle: document.getElementById('mainTitle'),
    uploadTitle: document.getElementById('uploadTitle'),
    resultsTitle: document.getElementById('resultsTitle'),
    themeBtn: document.getElementById('themeToggle'),
    themeIcon: document.getElementById('themeIcon'),
    spinner: document.getElementById('spinner'),
    json_sum: document.getElementById('json_sum')
};

export function toggleTheme() {
  const isDark = elements.body.classList.toggle('bg-slate-900');
  
    if (isDark) 
    {
        elements.body.classList.remove('from-blue-50', 'to-indigo-100');
        elements.mainCard.classList.replace('bg-white', 'bg-gray-800');
        elements.mainCard.classList.add('text-white', 'border-gray-700');
    
        elements.mainTitle.classList.replace('text-black', 'text-white');
        elements.uploadTitle.classList.replace('text-black', 'text-white');
        elements.resultsTitle.classList.replace('text-black', 'text-white');
    
        elements.themeIcon.setAttribute('data-lucide', 'sun');
        elements.json_res.className = "mt-2 p-4 rounded-lg text-xs overflow-auto max-h-96 transition-all bg-gray-900 text-gray-300";
    } 

    else 
    {
        elements.body.classList.add('from-blue-50', 'to-indigo-100');
        elements.mainCard.classList.replace('bg-gray-800', 'bg-white');
        elements.mainCard.classList.remove('text-white', 'border-gray-700');
    
        elements.mainTitle.classList.replace('text-white', 'text-black');
        elements.uploadTitle.classList.replace('text-white', 'text-black');
        elements.resultsTitle.classList.replace('text-white', 'text-black');
    
        elements.themeIcon.setAttribute('data-lucide', 'moon');
        elements.json_res.className = "mt-2 p-4 rounded-lg text-xs overflow-auto max-h-96 transition-all bg-gray-100 text-gray-700";
    }

  const gridTexts = elements.imagesGrid.querySelectorAll('h3, p');
  gridTexts.forEach(el => {
    if (isDark) 
    {
      el.classList.replace('text-black', 'text-white');
    } 

    else 
    {
      el.classList.replace('text-white', 'text-black');
    }
  });

  lucide.createIcons();
}

function createImageCard(title, imageData, description = '') {
    const isDark = elements.body.classList.contains('bg-slate-900');
    const textColor = isDark ? 'text-white' : 'text-black';

    const card = document.createElement('div');
    card.className = 'bg-transparent rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex flex-col transition-all';
  
    const titleEl = document.createElement('h3');
    titleEl.className = `font-bold ${textColor} mb-2 text-center transition-all`;
    titleEl.textContent = title;
  
    const img = document.createElement('img');
    img.className = 'w-full rounded-lg shadow-inner object-contain aspect-square bg-black';
    img.src = imageData.startsWith('data:') ? imageData : `data:image/png;base64,${imageData}`;
  
    card.appendChild(titleEl);
    card.appendChild(img);

    if (description) 
    {
        const descEl = document.createElement('p');
        descEl.className = `text-xs font-medium ${textColor} mt-2 text-center italic opacity-80 transition-all`;
        descEl.textContent = description;
        card.appendChild(descEl);
    }

    return card;
}

export function displayResults(data) {
    hideAllMessages();
    elements.resultBox.classList.remove('hidden');
    elements.imagesGrid.innerHTML = '';
    elements.json_res.textContent = JSON.stringify(data, null, 2);

    const viewConfigs = [
        { key: 'original_image', title: 'Scan RMN'},
        { key: 'predicted_mask', title: 'Masca tumorii', desc: 'zona unde modelul a prezis ca se afla tumoarea' },
        { key: 'overlay', title: 'Overlay', desc: 'masca prezisa, aplicata scanului original' }
    ];

    viewConfigs.forEach(config => {
        if (data[config.key]) {
        const card = createImageCard(config.title, data[config.key], config.desc);
        elements.imagesGrid.appendChild(card);
    }
  });
}

export function hideAllMessages() {
    elements.statusBox.classList.add('hidden');
    elements.errorBox.classList.add('hidden');
    elements.loadingBox.classList.add('hidden');
}

export function toggleStatusPanel(show, text = "", isOnline = true) {
    if (show === undefined) 
    {
        elements.statusBox.classList.toggle('hidden');
    } 

    else if (show) 
    {
        elements.statusBox.classList.remove('hidden');
        const statusTextEl = document.getElementById('statusText');
        statusTextEl.innerText = text;
        statusTextEl.classList.remove('text-green-600', 'text-red-600', 'dark:text-green-400', 'dark:text-red-400');

        if (isOnline) {
            statusTextEl.classList.add('text-green-600', 'dark:text-green-400');
        }    
        
        else 
        {
            statusTextEl.classList.add('text-red-600', 'dark:text-red-400');
        }
    } 

    else 
    {
        elements.statusBox.classList.add('hidden');
    }
}

export function updateFileUI(file) {
    elements.buton_predict.disabled = !file;
    elements.buton_predict.className = file
    ? "flex-1 py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
    : "flex-1 py-3 rounded-lg font-semibold text-white bg-gray-400 cursor-not-allowed transition-all";
}

export function showError(message) {
    hideAllMessages();
    elements.errorBox.classList.remove('hidden');
    document.getElementById('errorText').innerText = message;
}

export function showLoading() {
    hideAllMessages();
    elements.loadingBox.classList.remove('hidden');
}