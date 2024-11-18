console.log("HAHAHA")
const originalFetch = window.fetch;
window.fetch = async function(resource, init) {
    const response = await originalFetch(resource, init);
    const url = new URL(resource, location.href);

    // Intercept only external JavaScript files
    if (url.pathname.endsWith('.js')) {
        const jsContent = await response.text();
        // Remove 'const' declarations from JavaScript
        const modifiedJsContent = jsContent.replace(/\bconst\b/g, '');
        return new Response(modifiedJsContent, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        });
    }

    return response;
};
