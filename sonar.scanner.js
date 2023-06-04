import scanner from 'sonarqube-scanner';
import * as options from "./sonar-project.json"

scanner({
    serverUrl: process.env.SONAR_HOST,
    token: process.env.SONAR_TOKEN,
    options: options['default'],
}, () => { });
