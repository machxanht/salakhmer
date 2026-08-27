//#region node_modules/.nitro/vite/services/ssr/assets/tester-access-DrwpAQaY.js
/**
* Local/internal tester access. This only removes learning-path locks for
* explicitly configured accounts; it does not grant CMS or server privileges.
*/
function hasFullLessonTestAccess(email) {
	if (!email) return false;
	return `oliverkhang@gmail.com,oliverkhang@gmail.com,admin@admin.com`.split(",").map((value) => value.trim().toLowerCase()).filter(Boolean).includes(email.trim().toLowerCase());
}
//#endregion
export { hasFullLessonTestAccess as t };
