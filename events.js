import { fetchFromGoogleCloud } from './core.js';
import { resetCard, toggleVisibility } from './utilities.js';

let currentConversationId = null;  // Properly scoped within the module

document.addEventListener('DOMContentLoaded', function() {
    Missive.on('change:conversations', (ids) => {
        Missive.fetchConversations(ids).then((conversations) => {
            if (conversations.length !== 1) {
                resetCard();
                toggleVisibility(false);
                return;
            }
            const conversationId = conversations[0].id;
            if (currentConversationId === conversationId) return;
            currentConversationId = conversationId;
            resetCard();
            toggleVisibility(true);
            fetchFromGoogleCloud(conversationId);
        });
    });

    document.getElementById('card-status').addEventListener('change', (event) => {
        const newValue = event.target.value;
        // Assuming updateSmartSuiteField is defined elsewhere and relevant
        updateSmartSuiteField(currentRecordId, 'sb2ebbc694', newValue);
        // Assuming updateStatusClass is defined elsewhere and relevant
        updateStatusClass(event.target.options[event.target.selectedIndex].className);
    });

    document.getElementById('card-stage').addEventListener('change', (event) => {
        const newValue = event.target.value;
        // Assuming updateSmartSuiteField is defined elsewhere and relevant
        updateSmartSuiteField(currentRecordId, 'status', newValue);
        // Assuming updateStageClass is defined elsewhere and relevant
        updateStageClass(event.target.options[event.target.selectedIndex].className);
    });
});
