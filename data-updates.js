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

async function updateChecklistField(currentChecklist, currentRecordId, taskId, newCompletedStatus) {
    const now = new Date().toISOString();
    let updatedChecklist = { ...currentChecklist };
    updatedChecklist.items = updatedChecklist.items.map(item => {
        if (item.id === taskId) {
            return { ...item, completed: newCompletedStatus, completed_at: newCompletedStatus ? now : null };
        }
        return item;
    });
    updatedChecklist.completed_items = updatedChecklist.items.filter(item => item.completed).length;

    const endpoint = `/api/v1/applications/64bea2c89335ca76865eedef/records/${currentRecordId}`;
    const method = 'PATCH';
    const data = { recordId: currentRecordId, fields: { s7ea226547: updatedChecklist } };
    try {
        await callGoogleFunction(endpoint, method, data);
        console.log('Checklist updated for task ' + taskId);
    } catch (error) {
        console.error('Error updating checklist: ' + error.message);
    }
}

async function updateSmartSuiteField(recordId, fieldId, newValue) {
    const endpoint = `/api/v1/applications/64bea2c89335ca76865eedef/records/${recordId}`;
    const method = 'PATCH';
    const data = { recordId, fields: { [fieldId]: newValue } };
    try {
        await callGoogleFunction(endpoint, method, data);
        console.log(`Field ${fieldId} updated to ${newValue}`);
    } catch (error) {
        console.error(`Error updating field ${fieldId}: ` + error.message);
    }
}

export { callGoogleFunction, updateChecklistField, updateSmartSuiteField };
