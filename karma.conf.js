process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = config => {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            jasmine: {},
            clearContext: false
        },
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
            },
            ChromeDebugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9333']
            },
            ChromeNoSandbox: {
                base: 'Chrome',
                flags: ['--no-sandbox', '--disable-web-security']
            }
        },
        browsers: ['ChromeHeadlessNoSandbox'],
        autoWatch: false,
        singleRun: true,
        restartOnFileChange: true,
        coverageReporter: {
            dir: require('path').join(__dirname, '../coverage'),
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcovonly' }]
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO
    });
};
