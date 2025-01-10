
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
