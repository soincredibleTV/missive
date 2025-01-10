export function updateCard(item) {
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
}

export function updateStatusClass(newStatus) {
    const statusElement = document.getElementById('card-status');
    if (statusElement) {
        statusElement.className = 'status ' + newStatus;
    }
}

export function updateStageClass(newStage) {
    const stageElement = document.getElementById('card-stage');
    if (stageElement) {
        stageElement.className = 'stage ' + newStage;
    }
}
