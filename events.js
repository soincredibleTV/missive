import { fetchFromGoogleCloud, callGoogleFunction } from './core.js';
import { updateCard, updateStatusClass, updateStageClass, resetCard, toggleVisibility } from './ui.js';

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
        updateSmartSuiteField(currentRecordId, 'sb2ebbc694', newValue);
        updateStatusClass(event.target.options[event.target.selectedIndex].className);
    });

    document.getElementById('card-stage').addEventListener('change', (event) => {
        const newValue = event.target.value;
        updateSmartSuiteField(currentRecordId, 'status', newValue);
        updateStageClass(event.target.options[event.target.selectedIndex].className);
    });
});
