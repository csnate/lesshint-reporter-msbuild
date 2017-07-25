'use strict';

module.exports = {
    name: 'lesshint-reporter-msbuild',
    report: results => {
        (results || []).forEach((result) => {
            console.log(`${result.file}(${result.line},${result.column}): ${result.severity} ${result.linter}: ${result.message}`);
        });
    }
};