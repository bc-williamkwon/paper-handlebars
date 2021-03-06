const Lab = require('lab'),
      lab = exports.lab = Lab.script(),
      describe = lab.experiment,
      it = lab.it,
      testRunner = require('../spec-helpers').testRunner;

describe('getFontsCollection', function () {
    it('should return the expected font link', function (done) {
        const themeSettings = {
            'test1-font': 'Google_Open+Sans',
            'test2-font': 'Google_Open+Sans_400italic',
            'test3-font': 'Google_Open+Sans_700',
            'test4-font': 'Google_Karla_700',
            'test5-font': 'Google_Lora_400_sans',
            'test6-font': 'Google_Volkron',
            'test7-font': 'Google_Droid_400,700',
            'test8-font': 'Google_Crimson+Text_400,700_sans',
            'random-property': 'not a font'
        };

        const runTestCases = testRunner({themeSettings});
        runTestCases([
            {
                input: '{{getFontsCollection}}',
                output: '<link href="https://fonts.googleapis.com/css?family=Open+Sans:,400italic,700|Karla:700|Lora:400|Volkron:|Droid:400,700|Crimson+Text:400,700" rel="stylesheet">',
            },
        ], done);
    });

    it('should not crash if a malformed Google font is passed', function (done) {
        const themeSettings = {
            'test1-font': 'Google_Open+Sans',
            'test2-font': 'Google_',
            'test3-font': 'Google'
        };

        const runTestCases = testRunner({themeSettings});
        runTestCases([
            {
                input: '{{getFontsCollection}}',
                output: '<link href="https://fonts.googleapis.com/css?family=Open+Sans:" rel="stylesheet">',
            },
        ], done);
    });
});
