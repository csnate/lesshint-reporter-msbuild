'use strict';

const proxyquire = require('proxyquire');
const expect = require('chai').expect;
const sinon = require('sinon');
const util = require('util');

const reporter = require('./index');

describe('reporter:msbuild', () => {
    beforeEach(() => {
        sinon.stub(process.stdout, 'write');
    });

    afterEach(() => {
        if (process.stdout.write.restore) {
            process.stdout.write.restore();
        }
    });

    it('should not print anything when not passed any errors', () => {
        let errors = [];

        sinon.spy(console, 'log');

        reporter.report(errors);

        expect(console.log.called).to.equal(false)
        console.log.restore();
    });

    it('print error for 1 file', () => {
        let errors = [{
            column: 5,
            file: 'file.less',
            fullPath: 'path/to/file.less',
            line: 1,
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            severity: 'error',
            source: '.foo{ color: red; }'
        }];
        let error = errors[0];

        sinon.spy(console, 'log');

        reporter.report(errors);

        expect(console.log.called).to.equal(true);
        expect(console.log.getCall(0).args[0]).to.equal(`${error.file}(${error.line},${error.column}): ${error.severity} ${error.linter}: ${error.message}`);

        console.log.restore();
    });
});