const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '../src/lib'); // Source directory
const targetDir = path.resolve(__dirname, '../src/lib/assets/i18n'); // Target directory

const languages = ['en', 'es'];

function findFilesRecursively(dir, extension) {
    let results = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            results = results.concat(findFilesRecursively(filePath, extension));
        } else if (file.endsWith(extension)) {
            results.push(filePath);
        }
    }
    return results;
}

function mergeTranslations() {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    languages.forEach(lang => {
        const extension = `.${lang}.json`;
        const files = findFilesRecursively(sourceDir, extension);

        const mergedTranslations = files.reduce((acc, filePath) => {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            return { ...acc, ...content };
        }, {});

        // Save the merged translations to the target directory
        const targetFilePath = path.join(targetDir, `angular-components.${lang}.json`);
        fs.writeFileSync(targetFilePath, JSON.stringify(mergedTranslations, null, 4), 'utf-8');
        console.log(`Merged translations for ${lang} saved to ${targetFilePath}`);
    });
}

mergeTranslations();
