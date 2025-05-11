/**
 * Tailwind safelist generator + HTML builder
 *
 * - Scans ../src/lib for classes that start with "tw-".
 * - Saves the list in ../output/tailwind-safelist.json
 * - Creates (or overwrites) ../dist/src/css/demo-safelist.html containing:
 *      <p class="class1 class2 class3 …"></p>
 */

const fs   = require('fs');
const path = require('path');

/* ==========  Settings  ========== */
const baseDir        = path.resolve(__dirname, '../src/lib');
const jsonOutputFile = path.resolve(__dirname, '../output/tailwind-safelist.json');
const htmlOutputFile = path.resolve(__dirname, '../dist/src/lib/assets/css/demo-safelist.html');
const validExt       = ['.html', '.ts'];   // file extensions to inspect
/* ================================= */

/* Recursively collect files with valid extensions */
function findFilesRecursively(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).flatMap(entry => {
        const full = path.join(dir, entry);
        return fs.statSync(full).isDirectory()
            ? findFilesRecursively(full)
            : validExt.includes(path.extname(full)) ? [full] : [];
    });
}

/* Extract Tailwind classes that begin with "tw-" */
function extractTailwindClasses(content) {
    const matches = content.match(/[\"']?tw-[-\w:/\\.%]+(?=["'\s])/g) || [];
    return matches.map(cls =>
        cls
            .replace(/^["']?tw-/, '')   // strip leading quote and "tw-"
            .replace(/["']$/, '')       // strip trailing quote
            .replace(/--+/g, '-')       // collapse double dashes
            .replace(/^-+|-+$/g, '')    // trim dashes at both ends
    );
}

/* Build a sorted unique list of all Tailwind classes in baseDir */
function getAllTailwindClasses() {
    const files = findFilesRecursively(baseDir);
    const set   = new Set();
    files.forEach(file =>
        extractTailwindClasses(fs.readFileSync(file, 'utf8')).forEach(c => set.add(c))
    );
    return [...set].sort();
}

/* ----------  RUN  ---------- */
const classes = getAllTailwindClasses();

/* 1) Write JSON safelist */
fs.mkdirSync(path.dirname(jsonOutputFile), { recursive: true });
fs.writeFileSync(jsonOutputFile, JSON.stringify(classes, null, 2), 'utf8');

/* 2) Write HTML demo with <p class="…"> */
const htmlContent = `<p class="${classes.join(' ')}"></p>`;
fs.mkdirSync(path.dirname(htmlOutputFile), { recursive: true });
fs.writeFileSync(htmlOutputFile, htmlContent, 'utf8');

/* 3) Console logs */
console.log(`Safelist JSON generated at:  ${jsonOutputFile}`);
console.log(`Demo HTML generated at:      ${htmlOutputFile}\n`);
