import * as api from './api.js';
import * as ui from './ui.js';

let selectedFile = null;
lucide.createIcons();

ui.elements.themeBtn.addEventListener('click', () => {
    ui.toggleTheme();
});

ui.elements.fileInput.addEventListener('change', e => {
    selectedFile = e.target.files[0];
    ui.updateFileUI(selectedFile);
    ui.elements.resultBox.classList.add('hidden');
    ui.hideAllMessages();
});

ui.elements.statusBtn.addEventListener('click', async () => {
    if (!ui.elements.statusBox.classList.contains('hidden')) 
    {
        ui.toggleStatusPanel(false);
        return;
    }

    try {
        const data = await api.fetchStatus();
        const isOnline = data.status?.toLowerCase() === 'online';
        ui.toggleStatusPanel(true, `Status API: ${data.status || 'Offline'}`, isOnline);
    } 
    catch (err) {
        ui.toggleStatusPanel(true, `Status API: Offline`, false);
    }
});

ui.elements.buton_predict.addEventListener('click', async () => {
    if (!selectedFile) return;
    try {
        ui.showLoading();
        const data = await api.postPrediction(selectedFile);
        ui.displayResults(data);
    }
    catch (err) {
        ui.showError(err.message);
    }
});