const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
    {
        serverUrl: 'http://localhost:9000',
        options: {
            'sonar.projectName': 'Entertainment Tracker',
            'sonar.sources': '',
            'sonar.tests': 'tests',
            'sonar.inclusions': '**',
            'sonar.exclusions': '**/auth, **/tests, **/node_modules, jest-mongodb-config.js, jest.config.js, **/.json, **/.spec.js, **/.yml',
            'sonar.coverage.exlusions': '**/auth,jest-mongodb-config.js, jest.config.js ',
            'sonar.test.inclusions': '*.spec.js, ',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
            'sonar.projectDescription': 'A web app for tracking the entertainment consumption of the user.',
        }
    }, () => process.exit())