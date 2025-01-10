import { fetchFromGoogleCloud, callGoogleFunction } from './core.js';
import { updateCard, updateStatusClass, updateStageClass } from './ui.js';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('card-status').addEventListener('change', (event) => {
        const newValue = event.target.value;
        updateSmartSuiteField(currentRecordId, 'sb2ebbc694', newValue);
        updateStatusClass(event.target.options[event.target.selectedIndex].className);
    });

    document.getElementById('card-stage').addEventListener('change', (event) => {
        const newValue = event.target.value;
        updateSmartSuiteField(currentRecordId, 'status', newValue);
        updateStageClass(event.target.options[event.target.selectedIndex].className);
    });
});
