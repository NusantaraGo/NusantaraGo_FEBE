/**
 * Extracts resource and id from the given path.
 * @param {string} path - Pathname of the URL.
 * @returns {Object} Object containing resource and id.
 * @property {string} resource - Resource type (e.g. home, search, detail).
 * @property {string} id - ID of the resource (e.g. movie ID, user ID).
 */
function extractPathnameSegments(path) {
  const splitUrl = path.split("/");

  return {
    resource: splitUrl[1] || null,
    id: splitUrl[2] || null,
  };
}

/**
 * Construct a route string from a given resource and id.
 * @param {object} pathSegments - Object containing resource and id.
 * @returns {string} Route string (e.g. "/home", "/search/:id", "/detail/:id").
 */
function constructRouteFromSegments(pathSegments) {
  let pathname = "";

  console.log("Path Segments:", pathSegments);

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
    console.log("Resource added to pathname:", pathname);
  }

  if (pathSegments.id) {
    pathname = pathname.concat("/:id");
    console.log("ID added to pathname:", pathname);
  }

  console.log("Constructed pathname:", pathname || "/");
  return pathname || "/";
}

/**
 * Mendapatkan path dari url yang aktif
 * @returns {string} path yang aktif
 */
export function getActivePathname() {
  return location.hash.replace("#", "") || "/";
}

/**
 * Mendapatkan route dari url yang aktif.
 * @returns {string} Route yang aktif.
 */
export function getActiveRoute() {
  const pathname = getActivePathname();
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

/**
 * Parses the active pathname from the current URL.
 * @returns {Object} An object containing the parsed segments of the pathname.
 * @property {string} resource - The resource type (e.g. home, search, detail).
 * @property {string} id - The ID of the resource (e.g. movie ID, user ID).
 */
export function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

/**
 * Mendapatkan route dari pathname yang diberikan.
 * @param {string} pathname - Pathname yang ingin di parse (e.g. "/home", "/search/:id", "/detail/:id").
 * @returns {string} Route yang diparse dari pathname.
 */
export function getRoute(pathname) {
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

/**
 * Parses the given pathname into segments.
 * @param {string} pathname - The pathname to parse (e.g. "/home", "/search/:id").
 * @returns {Object} An object containing the parsed segments of the pathname.
 * @property {string} resource - The resource type (e.g. home, search, detail).
 * @property {string} id - The ID of the resource (e.g. movie ID, user ID).
 */

export function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}
