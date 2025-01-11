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
    const endpoint = `/api/v1/applications/64bea2c89335ca76865eedef/records/${currentRecordId}`;
    const method = 'PATCH';
    const data = { recordId: currentRecordId, fields: { s7ea226547: currentChecklist } };

    const response = await fetch('https://us-central1-missive-ss-integration.cloudfunctions.net/smartSuiteProxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ endpoint, method, data })
    });

    if (!response.ok) {
        throw new Error('Failed to update checklist, HTTP status: ' + response.status);
    }
    return response.json(); // Возвращаем ответ сервера для возможной дальнейшей обработки
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
