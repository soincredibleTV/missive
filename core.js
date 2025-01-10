export async function fetchFromGoogleCloud(conversationId) {
    const endpoint = `/api/v1/applications/64bea2c89335ca76865eedef/records/list/${conversationId}`;
    const method = 'POST';
    const data = { limit: 2 };
    try {
        const result = await callGoogleFunction(endpoint, method, data);
        console.log("API Call Result:", result); // Logging for debugging
        return result;
    } catch (error) {
        console.error("Error fetching from Google Cloud:", error);
    }
}

export async function callGoogleFunction(endpoint, method, data) {
    try {
        const response = await fetch('https://us-central1-missive-ss-integration.cloudfunctions.net/smartSuiteProxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ endpoint, method, data })
        });
        if (!response.ok) {
throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error during API call:', error);
        throw error;
    }
}

export async function updateSmartSuiteField(recordId, fieldName, value) {
    const endpoint = \`https://us-central1-missive-ss-integration.cloudfunctions.net/smartSuiteProxy/api/v1/updateRecord/\${recordId}\`;
    const method = 'PATCH';
    const data = { [fieldName]: value };

    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(\`HTTP error! Status: \${response.status}\);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating field:', error);
        throw error;
    }
}
