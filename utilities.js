export function resetCard() {
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

export function toggleVisibility(visible) {
    const card = document.getElementById('data-card');
    const noRecords = document.getElementById('no-records');
    if (card && noRecords) {
        card.style.display = visible ? 'block' : 'none';
        noRecords.style.display = visible ? 'none' : 'block';
    } else {
        console.error('toggleVisibility: Elements not found!');
    }
}
