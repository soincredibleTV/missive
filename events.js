import { fetchFromGoogleCloud } from './core.js';
import { resetCard, toggleVisibility, updateSmartSuiteField, updateStatusClass, updateStageClass } from './utilities.js'; // Including additional functions

let currentConversationId = null;  // Properly scoped within the module

document.addEventListener('DOMContentLoaded', () => {
    Missive.on('change:conversations', (ids) => {
        Missive.fetchConversations(ids).then((conversations) => {
            if (conversations.length !== 1) {
                resetCard();
                toggleVisibility(false);
                return;
            }
            const conversationId = conversations[0].id;
            console.log("Conversation ID:", conversationId);
            if (currentConversationId === conversationId) return;
            currentConversationId = conversationId;
            resetCard();
            toggleVisibility(true);
            fetchFromGoogleCloud(conversationId);
        });
    });

    document.getElementById('card-status').addEventListener('change', (event) => {
        const newValue = event.target.value;
        updateSmartSuiteField(currentConversationId, 'sb2ebbc694', newValue);
        updateStatusClass(event.target.options[event.target.selectedIndex].className);
    });

    document.getElementById('card-stage').addEventListener('change', (event) => {
        const newValue = event.target.value;
        updateSmartSuiteField(currentConversationId, 'status', newValue);
        updateStageClass(event.target.options[event.target.selectedIndex].className);
    });
});
