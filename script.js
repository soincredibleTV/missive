let currentConversationId = null;
let currentRecordId = null;
let currentChecklist = null;

function resetCard() {
    const title = document.getElementById('card-title');
    const status = document.getElementById('card-status');
    const stage = document.getElementById('card-stage');
    const tasks = document.getElementById('card-tasks');
    const linkButton = document.getElementById('card-link-button');
    if (title && status && tasks && stage && linkButton) {
        title.textContent = 'Loading...';
        status.className = 'status open';
        stage.className = 'stage outreach';
        tasks.innerHTML = '<li>Loading...</li>';
        linkButton.style.display = 'none';
        linkButton.href = '#';
    } else {
        console.error('resetCard: Elements not found!');
    }
}

function toggleVisibility(visible) {
    const card = document.getElementById('data-card');
    const noRecords = document.getElementById('no-records');
    if (card && noRecords) {
        card.style.display = visible ? 'block' : 'none';
        noRecords.style.display = visible ? 'none' : 'block';
    } else {
        console.error('toggleVisibility: Elements not found!');
    }
}

function updateStatusClass(newStatus) {
    const statusElement = document.getElementById('card-status');
    if (statusElement) {
        statusElement.className = 'status ' + newStatus;
    }
}

function updateStageClass(newStage) {
    const stageElement = document.getElementById('card-stage');
    if (stageElement) {
        stageElement.className = 'stage ' + newStage;
    }
}

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

async function callGoogleFunction(endpoint, method, data) {
    try {
        const response = await fetch('https://us-central1-missive-ss-integration.cloudfunctions.net/smartSuiteProxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ endpoint, method, data })
        });
        if (!response.ok) {
            throw new Error('HTTP error! Status: ' + response.status);
        }
        return await response.json();
    } catch (error) {
        console.error('Error during API call: ' + error.message);
        throw error;
    }
}

async function fetchFromGoogleCloud(conversationId) {
    try {
        const endpoint = '/api/v1/applications/64bea2c89335ca76865eedef/records/list/';
        const method = 'POST';
        const data = { limit: 2 };
        const result = await callGoogleFunction(endpoint, method, { ...data, filter: { missiveId: conversationId } });
        if (result.items.length === 0) {
            toggleVisibility(false);
        } else {
            currentRecordId = result.items[0].id;
            currentChecklist = result.items[0].s7ea226547;
            updateCard(result.items[0]);
        }
    } catch (error) {
        console.error(error.message);
        toggleVisibility(false);
    }
}

function updateCard(item) {
    const titleElement = document.getElementById('card-title');
    const statusElement = document.getElementById('card-status');
    const stageElement = document.getElementById('card-stage');
    const linkButton = document.getElementById('card-link-button');

    if (titleElement) titleElement.textContent = item.s78ba1a556 || 'No Title';
    if (statusElement) {
        statusElement.value = item.sb2ebbc694?.value || 'backlog';
        updateStatusClass(statusElement.options[statusElement.selectedIndex].className);
    }
    if (stageElement) {
        stageElement.value = item.status?.value || 'adb874ab-d993-4ea5-bcb7-6d8ef8702eac';
        updateStageClass(stageElement.options[stageElement.selectedIndex].className);
    }
    if (linkButton) {
        linkButton.style.display = 'inline-block';
        linkButton.href = item.s3e0bfef87 || '#';
    }
    const tasksElement = document.getElementById('card-tasks');
    tasksElement.innerHTML = '';
    item.s7ea226547?.items.forEach(task => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.dataset.taskId = task.id;
        checkbox.addEventListener('change', (event) => {
            updateChecklistField(task.id, event.target.checked);
        });
        const span = document.createElement('span');
        span.textContent = task.content.preview;
        li.appendChild(checkbox);
        li.appendChild(span);
        tasksElement.appendChild(li);
    });
    // Update completed_items count
    item.s7ea226547.completed_items = item.s7ea226547.items.filter(i => i.completed).length;
}

async function updateChecklistField(taskId, newCompletedStatus) {
    const now = new Date().toISOString();
    currentChecklist.items = currentChecklist.items.map(item => {
        if (item.id === taskId) {
            return { ...item, completed: newCompletedStatus, completed_at: newCompletedStatus ? now : null };
        }
        return item;
    });
    currentChecklist.completed_items = currentChecklist.items.filter(item => item.completed).length;
    const updatedChecklist = { ...currentChecklist };
    const endpoint = '/api/v1/applications/64bea2c89335ca76865eedef/records/${currentRecordId}';
    const method = 'PATCH';
    const data = { recordId: currentRecordId, fields: { s7ea226547: updatedChecklist } };
    try {
        await callGoogleFunction(endpoint, method, data);
        console.log('Checklist updated for task ' + taskId);
    } catch (error) {
        console.error('Error updating checklist: ' + error.message);
    }
}

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
