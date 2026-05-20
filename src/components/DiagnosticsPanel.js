export function DiagnosticsPanel() {
    const panel =
        document.createElement('section');

    panel.className =
        'diagnostics-panel';

    panel.innerHTML = `
        <div class="diagnostics-item">
            <span>Network</span>
            <strong id="network-status">
                Online
            </strong>
        </div>

        <div class="diagnostics-item">
            <span>Visibility</span>
            <strong id="visibility-status">
                Visible
            </strong>
        </div>
    `;

    return panel;
} 
