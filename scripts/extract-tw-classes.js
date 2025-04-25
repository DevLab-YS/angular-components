const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../src/lib');
const outputFile = path.resolve(__dirname, '../output/tailwind-safelist.json');
const validExtensions = ['.html', '.ts'];

function findFilesRecursively(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            results = results.concat(findFilesRecursively(fullPath));
        } else if (validExtensions.includes(path.extname(fullPath))) {
            results.push(fullPath);
        }
    }

    return results;
}

function extractTailwindClasses(content) {
    const matches = content.match(/[\"']?tw-[-\w:/\\.%]+(?=["'\s])/g) || [];

    const sanitizeClassName = className => {
        return className
            .replace(/^["']?tw-/, '') // Remove leading quote and 'tw-'
            .replace(/["']$/, '') // Remove trailing quote
            .replace(/--+/g, '-') // Replace double dashes
            .replace(/^-+|-+$/g, ''); // Trim leading/trailing dashes
    };

    return matches.map(sanitizeClassName);
}

function getAllTailwindClassesFromDir(directory) {
    const files = findFilesRecursively(directory);
    const classSet = new Set();

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const classes = extractTailwindClasses(content);
        classes.forEach(cls => classSet.add(cls));
    }

    return Array.from(classSet).sort();
}

const classes = getAllTailwindClassesFromDir(baseDir);
fs.writeFileSync(outputFile, JSON.stringify(classes, null), 'utf-8');

console.log(`✅ Safelist generated and saved to ${outputFile}`);
console.log('\nPaste this in your tailwind.config.js:\n');
console.log(`safelist: ${JSON.stringify(classes, null, 4)},`);
