/**
 * Utility function to log the caller of the function
 * @returns 
 */
export function getCaller() {
    const error = new Error();
    const stack = error.stack || "";

    // Parse the stack trace
    const stackLines = stack.split("\n");

    // The caller is typically the second item in the stack trace
    if (stackLines.length > 2) {
        return stackLines[2].trim();
    }

    return "Caller not found";
}

/**
 * Get the base path of the app (the API Gateway custom domain mapping)
 * 
 * e.g. /nextstrain
 * 
 * Useful for trimming off excess slashes.
 * @returns Clean custom domain mapping
 */
export function getBasePath() {
    let results = process.env.AUSPICE_CUSTOM_DOMAIN_MAPPING ? `/${process.env.AUSPICE_CUSTOM_DOMAIN_MAPPING}` : ""
    results = results.replace("//", "/");
    return results;
}

/**
 * Get normalized path name by stripping the prefix (typically a custom domain mapping)
 * 
 * e.g. /nextstrain/path/to/data -> /path/to/data
 * 
 * @param {any} options
 * @param {string} options.prefix - Custom domain mapping to remove
 * @returns {string} Pathname without the custom domain mapping
 */
export function getNormalizedPathname({ prefix = getBasePath() } = {}) {
    const { pathname } = window.location;

    // Remove the prefix if it's at the root of the pathname
    return pathname.replace(prefix, "");
}

/**
 * This wrapper for window origin
 * 
 * Unclear if this value needs a wrapper but let's not suffer
 * the pain of hardcoding it now and needing to change it later.
 * 
 * Added to strip off trailing slashes if that's even a thing.
 * 
 * @returns {string} Windows origin
 */
export function getOrigin() {
    return window.location.origin;
}

/**
 * Return the origin + custom domain mapping (if one exists)
 * 
 * e.g. https://app.example.org/auspice
 * @returns {string} Origin + custom domain mapping
 */
export function getBaseMappedOrigin({ prefix = getBasePath() } = {}) {
    let url = getOrigin() + prefix;
    url = (url.endsWith("//")) ? url.slice(0, -1) : url;
    return url;
}
