const EXCLUDED_PATHS = [
    "/account/sign-in",
    "/account/sign-up",
    "/no-access",
    "/404",
    "/_not-found",
]
const normalizePath = (path: string) =>
    path.endsWith("/") && path !== '/' ? path.slice(0, -1) : path;
export const shouldHideComponent = (pathname: string) => {
    const normalizedPath = normalizePath(pathname);
    return EXCLUDED_PATHS.some(path => normalizedPath === path) ||
        normalizedPath.startsWith("/admin");
}
