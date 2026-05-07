export const Header = {
    render: (title = "Dashboard") => `
    <div class="top-bar">
        <h2 id="view-title">${title}</h2>
        <div class="user-profile">
            <div class="status-dot"></div>
            <span>AoiChan • Senior</span>
        </div>
    </div>`
};
