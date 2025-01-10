
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
