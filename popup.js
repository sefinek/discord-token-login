document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const tokenInput = document.getElementById('tokenInput');

    loginForm.addEventListener('submit', async event => {
        event.preventDefault();

        const token = tokenInput.value.trim();
        if (!token) {
            alert('Please enter a token.');
            return;
        }

        const url = `https://discord.com/?discordtoken=${encodeURIComponent(token)}`;

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const currentUrl = tab.url || '';

            if (currentUrl === 'about:blank' || currentUrl.startsWith('https://discord.com/login')) {
                await chrome.tabs.update(tab.id, { url });
            } else {
                await chrome.tabs.create({ url, active: true });
            }

            window.close();
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again.');
        }
    });
});