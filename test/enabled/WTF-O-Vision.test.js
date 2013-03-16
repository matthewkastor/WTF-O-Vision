"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true
*/
/*globals
    atropa,
    jasmine,
    describe,
    xdescribe,
    it,
    xit,
    expect,
    beforeEach,
    afterEach,
    runs,
    jasmine,
    waits,
    waitsFor,
    spyOn
*/
// end header
"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true
*/
/*globals
    atropa,
    describe,
    it,
    expect
*/
// end header

describe("atropa", function() {
    it("must exist", function() {
        expect(atropa).not.toEqual(undefined);
    });
});"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true
*/
/*globals
    atropa,
    describe,
    it,
    expect
*/
// end header

describe('atropa.arrays', function () {
    var aa = atropa.arrays;
    
    it('must exist', function () {
        expect(atropa.arrays).not.toEqual(undefined);
    });
    
    describe('match', function () {
        
        var obj = {"aProp" : "aValue"};
        
        it('returns true if elements in both arrays are in the same ' +
            'order and are strictly equal to one another',
            function () {
                expect(aa.match([obj], [obj])).toEqual(true);
                expect(aa.match([1,2], [1,2])).toEqual(true);
                expect(aa.match(['apple'], ['apple'])).toEqual(true);
            }
        );
        it('returns false if elements in both arrays are not in the same ' +
            'order or are not strictly equal to one another',
            function () {
                expect(aa.match(['1'], [1])).toEqual(false);
                expect(aa.match([2], [1])).toEqual(false);
                expect(aa.match([1,2], [2,1])).toEqual(false);
            }
        );
        it('returns false when comparing arrays containing object literals ' +
            'because object literals are neither strictly equal to ' +
            'one another nor to other objects',
            function () {
                expect(aa.match([{"aProp" : "aValue"}],
                        [{"aProp" : "aValue"}])).toEqual(false);
                expect(aa.match([{"aProp" : "aValue"}], [obj])).toEqual(false);
            }
        );
    });

    describe('subtract', function () {
        it('returns an array consisting of all elements of the minuend not ' +
            'found in the subtrahend',
            function () {
                expect(aa.subtract([1,2], [1,1,3,3])).toEqual([3,3]);
            }
        );
        it('will not remove corresponding object literals because they are ' +
            'distinctly different objects',
            function () {
                expect(
                    aa.subtract([{"aProp" : "aVal"}], [{"aProp" : "aVal"}])
                ).toEqual(
                    [{"aProp" : "aVal"}]
                );
            }
        );
        it('will not remove object literals corresponding to object ' +
            'references because they are distinct objects',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(
                    aa.subtract([obj], [{"aProp" : "aVal"}])
                ).toEqual(
                    [{"aProp" : "aVal"}]
                );
            }
        );
        it('will remove object references that point to the same object',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(aa.subtract([obj], [obj])).toEqual([]);
            }
        );
    });

    describe('intersect', function () {
        it('returns an array containing an element corresponding to each ' +
            'set of matching elements found in the arrays',
            function () {
                expect(aa.intersect([1,3,4], [3,1,5])).toEqual([1,3]);
            }
        );
        it('does not return an array of unique values',
            function () {
                expect(aa.intersect([1,1,3,4], [3,1,1,5])).toEqual([1,1,3]);
            }
        );
        it('considers object references pointing to the same object to be an ' +
            'intersection',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(
                    aa.intersect([1,3,obj], [3,1,obj])
                ).toEqual(
                    [1,3,{"aProp" : "aVal"}]
                );
            }
        );
        it('does not consider object literals and references with ' +
            'identical definitions to be an intersection',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(
                    aa.intersect([1,3,{"aProp" : "aVal"}], [3,1,obj])
                ).toEqual([1,3]);
            }
        );
        
        it('does not consider identical object literals to be an intersection',
            function () {
                expect(
                    aa.intersect([1,3,{"aProp" : "aVal"}],
                        [3,1,{"aProp" : "aVal"}])
                ).toEqual(
                    [1,3]
                );
            }
        );
    });

    describe('getFrequency', function () {
        it('returns an object whose keys correspond to unique values from ' +
            'the given array and whose values are a count of the number of ' +
            'occurrences of that unique value', function () {
                expect(
                    aa.getFrequency([1,1,1,1,1,3,3])
                ).toEqual(
                    {"1": 5,"3": 2}
                );
            });
        it('considers everything in terms of string values so all given ' +
            'objects are regarded as an occurrence of "[object Object]"',
            function () {
                expect(
                    aa.getFrequency(
                        [1,3,{"aProp" : "aVal"},{},{"aDoughnut" : "sprinkles"}])
                ).toEqual({"1": 1,"3": 1,"[object Object]": 3});
            }
        );
    });

    describe('getUnique', function () {
        it('returns an array of strings corresponding to the unique elements ' +
            'of the given array', function () {
                expect(
                    aa.getUnique([1,1,1,4,4,3,6])
                ).toEqual([ "1", "3", "4", "6" ]);
            }
        );
        
        it('considers everything in terms of string values so all given ' +
            'objects are regarded as an occurrence of "[object Object]"',
            function () {
                expect(
                    aa.getUnique(
                        [
                            "bill",
                            {"aProp":"aValue"},
                            {"aGuy":"fred"},
                            {"aLady":"jane"}
                        ]
                    )
                ).toEqual([ "[object Object]", "bill" ]);
            }
        );
    });

    describe('removeEmptyElements', function () {
        it('returns an array of non empty elements from the given array',
            function () {
                expect(aa.removeEmptyElements([ 10, , 5, "", '', 7])
                ).toEqual([10, 5, 7]);
            }
        );
        it('does not remove elements explicitly set to undefined or null',
            function () {
                expect(aa.removeEmptyElements([ null, undefined ])
                ).toEqual([null, undefined]);
            }
        );
        it('does remove deleted elements',
            function () {
                var x;
                x = ['a','b'];
                delete x[0];
                expect(x.length).toEqual(2);
                expect(x).toEqual([undefined,'b']);
                x = aa.removeEmptyElements(x);
                expect(x.length).toEqual(1);
                expect(x).toEqual(['b']);
                
            }
        );
    });

    describe('reindex', function () {
        var x;
        x = [ "a", "b", "c", undefined, null ];
        it('returns an array whose keys are contiguous and whose elements ' +
            'correspond to the elements of the given array which have not ' +
            'been deleted',
            function () {
                delete x[1];
                expect(x).toEqual([ "a", undefined, "c", undefined, null ]);
                x = aa.reindex(x);
                expect(x).toEqual([ "a", "c", undefined, null ]);
            }
        );
    });

    describe('sortNumerically', function () {
        it('sorts arrays composed of numeric elements numerically',
            function () {
                expect(
                    aa.sortNumerically(
                        [3, 2, 9, 26, 10, 1, 99, 15])
                ).toEqual([ 1, 2, 3, 9, 10, 15, 26, 99 ]);
            }
        );
    });

    describe('sortAlphabetically', function () {
        it('sorts arrays composed of string elements alphabetically',
            function () {
                expect(
                    aa.sortAlphabetically(
                        ['Z','a', '1', '2', '10', 'A', 'z'])
                ).toEqual(["1", "10", "2", "a", "A", "z", "Z"]);
            }
        );
    });
    
    describe('deleteElement', function () {
        it('Returns an array with the element removed, contiguous keys, and ' +
            'whose length is 1 less than the input array',
            function () {
                var x = ['a', 'b', 'c'];
                expect(x.length).toEqual(3);
                x = aa.deleteElement(x, 1);
                expect(x).toEqual(['a','c']);
                expect(x.length).toEqual(2);
            }
        );
    });
});


"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true
*/
/*globals
    atropa,
    describe,
    it,
    expect,
    beforeEach,
    runs,
    jasmine,
    waitsFor,
    dummy
*/
// end header

describe("atropa.inquire", function() {
    
    it("must exist", function() {
        expect(atropa.inquire).not.toEqual(undefined);
    });
    
    describe('isNull', function () {
        it('must return true if the given value is null', function () {
            expect(
                atropa.inquire.isNull(null)
            ).toEqual(true);
        });
        it('must return false if the given value is not specified',
            function () {
                expect(
                    atropa.inquire.isNull()
                ).toEqual(false);
            }
        );
        it('must return false if the given value is an empty string',
            function () {
                expect(
                    atropa.inquire.isNull('')
                ).toEqual(false);
            }
        );
        it('must return false if the given value is undefined', function () {
            expect(
                atropa.inquire.isNull(undefined)
            ).toEqual(false);
        });
        it('must return false if the given value is an empty object',
            function () {
                expect(
                    atropa.inquire.isNull({})
                ).toEqual(false);
            }
        );
    });
    
    describe('isObject', function () {
        it('must return true if given value is an object', function () {
            [
                {},
                null,
                new Object(null)
            ].forEach(function (item) {
                expect(atropa.inquire.isObject(item)).toEqual(true);
            });
        });
        it('must return false if given value is not an object', function () {
            [
                '',
                1,
                undefined,
                true,
                false,
                function () {},
                String('wee' + 1)
            ].forEach(function (item) {
                expect(atropa.inquire.isObject(item)).toEqual(false);
            });
        });
    });
    
    describe('isObjectNotNull', function () {
        it('Must return true if given value is an object and is not null',
            function () {
                expect(atropa.inquire.isObjectNotNull({})).toEqual(true);
            }
        );
        it('Must return false if given value is null', function () {
            expect(atropa.inquire.isObjectNotNull(null)).toEqual(false);
        });
        it('must return false if given value is not an object', function () {
            expect(atropa.inquire.isObjectNotNull('')).toEqual(false);
        });
    });
    
    describe('hasProperty', function () {
        it('must return true if the property exists regardless of whether it' +
                'was inherited or not',
            function () {
                expect(
                    atropa.inquire.hasProperty({}, 'toString')
                ).toEqual(true);
            }
        );
        it('must return false if the property does not exist', function () {
            expect(atropa.inquire.hasProperty({}, 'mashPotato')).toEqual(false);
        });
        it('must return false if the given object is null', function () {
            expect(atropa.inquire.hasProperty(null, 'toString')).toEqual(false);
        });
    });
    
    describe('isEmptyString', function () {
        it('must return true when given an empty string', function () {
            expect(atropa.inquire.isEmptyString('')).toEqual(true);
            expect(atropa.inquire.isEmptyString(String())).toEqual(true);
        });
        it('must return false when given undefined', function () {
            expect(atropa.inquire.isEmptyString(undefined)).toEqual(false);
        });
        it('must return false when given null', function () {
            expect(atropa.inquire.isEmptyString(null)).toEqual(false);
        });
        it('must return false when given false', function () {
            expect(atropa.inquire.isEmptyString(false)).toEqual(false);
        });
        it('must return false when given nothing', function () {
            expect(atropa.inquire.isEmptyString()).toEqual(false);
        });
    });
    
});"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true,
    setAsOptionalArgp: true
*/
/*globals
    atropa,
    describe,
    it,
    expect,
    beforeEach,
    runs,
    jasmine,
    waitsFor,
    dummy
*/
// end header

describe("atropa.setAsOptionalArg", function() {

    it("must exist", function() {
        expect(atropa.setAsOptionalArg).not.toEqual(undefined);
    });
    
    it('must return the default if option is undefined or null', function () {
        expect(
            atropa.setAsOptionalArg('default', undefined)
        ).toEqual('default');
        expect(
            atropa.setAsOptionalArg('default', null)
        ).toEqual('default');
        expect(
            atropa.setAsOptionalArg('default')
        ).toEqual('default');
    });
    
    it('must return the option if it is not undefined or null', function () {
        expect(
            atropa.setAsOptionalArg('default', 'option')
        ).toEqual('option');
    });
});


"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true
*/
/*globals
    atropa,
    describe,
    it,
    expect,
    beforeEach,
    runs,
    jasmine,
    waitsFor,
    spyOn
*/
// end header

describe("atropa.wtf", function() {

    it("must exist", function() {
        expect(atropa.wtf).not.toEqual(undefined);
    });
    
    describe('wtfify', function () {
        
        try {
            
            atropa.wtf.wtfify('I am the bestest poet ever.');
            
            describe('class is supported in this environment', function () {
                it('must wtfify the given text', function () {
                    var out = atropa.wtf.wtfify('I am...\r\n.');
                    
                    expect(out.wtfCount).toEqual(2);
                    expect(out.wordCount).toEqual(3);
                    expect(out.score).toEqual(2 / 3);
                    expect(out.txt).toMatch(/Kevin are \[shit taco\]/);
                });
                
                it('must output html markup if specified', function () {
                    var out = atropa.wtf.wtfify('I am...\r\n.', true);
                    
                    expect(out.wtfCount).toEqual(2);
                    expect(out.wordCount).toEqual(3);
                    expect(out.score).toEqual(2 / 3);
                    expect(out.txt).toMatch(/<p/);
                    expect(out.txt).toMatch(/<span style/);
                    expect(out.txt).toMatch(/<br/);
                    expect(out.txt).toMatch(/\[shit taco\]/);
                    expect(out.txt).toMatch(/Kevin/);
                });
            });
        } catch (e) {
            describe('class is not supported in this environment', function () {
                it('must throw "[...] is not supported in this environment"',
                    function () {
                        function x () {
                            try {
                                atropa.wtf.wtfify('I am the bestest poet ever.');
                            } catch (e) {
                                return e;
                            }
                        }
                        expect(x()).toMatch(/is not supported in this environment/);
                    }
                );
                it('must set atropa.data.wtf.support to "unsupported"',
                    function () {
                        expect(
                            atropa.data.wtf.support
                        ).toEqual(
                            'unsupported'
                        );
                    }
                );
            });
        }
        
    });
    
    describe('htmlElement', function () {
        
        try {
            
            atropa.supportCheck('wtfHtmlElement');
            
            describe('class is supported in this environment', function () {
                
                it('must return a reference to the given element', function () {
                    var el = document.createElement('div');
                    el.textContent = 'I am...\r\n.';
                    expect(atropa.wtf.htmlElement(el)).toEqual(el);
                });
                
                it('must wtfify the given DIV element', function () {
                    var el = document.createElement('div');
                    el.textContent = 'I am...\r\n.';
                    el = atropa.wtf.htmlElement(el);
                    expect(el.innerHTML).toMatch(/<p/);
                    expect(el.innerHTML).toMatch(/<span style/);
                    expect(el.innerHTML).toMatch(/<br/);
                    expect(el.innerHTML).toMatch(/\[shit taco\]/);
                    expect(el.innerHTML).toMatch(/Kevin/);
                });
                it('must wtfify the given TEXTAREA element', function () {
                    var el = document.createElement('textarea');
                    el.textContent = 'I am...\r\n.';
                    el = atropa.wtf.htmlElement(el);
                    expect(el.innerHTML).toMatch(/&lt;p/);
                    expect(el.innerHTML).toMatch(/&lt;span style/);
                    expect(el.innerHTML).toMatch(/&lt;br/);
                    expect(el.innerHTML).toMatch(/\[shit taco\]/);
                    expect(el.innerHTML).toMatch(/Kevin/);
                });
            });
        } catch (e) {
            describe('class is not supported in this environment', function () {
                it('must throw "[...] is not supported in this environment"',
                    function () {
                        function x () {
                            try {
                                atropa.wtf.htmlElement('I am the bestest poet ever.');
                            } catch (e) {
                                return e;
                            }
                        }
                        expect(x()).toMatch(/is not supported in this environment/);
                    }
                );
                it('must set atropa.data.wtfHtmlElement.support to "unsupported"',
                    function () {
                        expect(
                            atropa.data.wtfHtmlElement.support
                        ).toEqual(
                            'unsupported'
                        );
                    }
                );
            });
        }
        
    });
    
});


"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true,
    stringp: true
*/
/*globals
    atropa,
    describe,
    it,
    expect,
    beforeEach,
    runs,
    jasmine,
    waitsFor,
    dummy
*/
// end header

describe("atropa.string", function() {

    it("must exist", function() {
        expect(atropa.string).not.toEqual(undefined);
    });
    
    describe('ucFirst', function () {
        it('must capitalize the first letter of the given string', function () {
            expect(atropa.string.ucFirst('wee')).toEqual('Wee');
        });
    });
    
    describe('countWords', function () {
        it('must count the words in the given string', function () {
            expect(atropa.string.countWords('wee wee')).toEqual(2);
        });
        it('must return 0 if the given text is undefined, null, or empty ' +
                'string',
            function () {
                expect(atropa.string.countWords('')).toEqual(0);
                expect(atropa.string.countWords(undefined)).toEqual(0);
                expect(atropa.string.countWords(null)).toEqual(0);
            }
        )
    });
    
    describe('convertEol', function () {
        it('must convert \\r\\n, \\n or \\r', function () {
            expect(atropa.string.convertEol('wee\r\n', 'e')).toEqual('weee');
            expect(atropa.string.convertEol('wee\n', 'e')).toEqual('weee');
            expect(atropa.string.convertEol('wee\r', 'e')).toEqual('weee');
        });
    });
    
    describe('offsetWhiteSpace', function () {
        it('must remove the specified quantity of leading spaces', function () {
            expect(
                atropa.string.offsetWhiteSpace('    wee', 4)
            ).toEqual('wee');
        });
    });
    
    describe('normalizeWhiteSpacePrefix', function () {
        it('must convert tabs in leading whitespace into 4 spaces',
            function () {
                expect(
                    atropa.string.normalizeWhiteSpacePrefix(' \t \twee\t')
                ).toEqual('          wee\t');
            }
        );
    });
    
    describe('normalizeWhiteSpace', function () {
        it('must convert all tabs to 4 spaces', function () {
            expect(
                atropa.string.normalizeWhiteSpace(' \t \twee\t')
            ).toEqual('          wee    ');
        });
    });
    
    describe('getOffset', function () {
        it('must count the number of leading spaces or tabs', function () {
            expect(
                atropa.string.getOffset('    wee')
            ).toEqual(4);
            expect(
                atropa.string.getOffset('\twee')
            ).toEqual(1);
            expect(
                atropa.string.getOffset('\t \twee')
            ).toEqual(1);
            expect(
                atropa.string.getOffset(' \t wee')
            ).toEqual(1);
        });
    });
    
    describe('getWords', function () {
        it('must return an array of words from the given text', function () {
            expect(
                atropa.string.getWords('wee wee wee')
            ).toEqual(['wee', 'wee', 'wee']);
        });
    });
    
    describe('escapeCdata', function () {
        it('must escape cdata tags', function () {
            expect(
                atropa.string.escapeCdata('<![CDATA[wee wee wee]]>')
            ).toEqual('<![CDATA[wee wee wee]]]]><![CDATA[>');
        });
    });

});


"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true,
    regexp: true
*/
/*globals
    atropa,
    describe,
    it,
    expect,
    beforeEach,
    runs,
    jasmine,
    waitsFor,
    dummy
*/
// end header

describe("atropa.regex", function() {

    it("must exist", function() {
        expect(atropa.regex).not.toEqual(undefined);
    });
    
    describe('appendPrefixesAndSuffixes', function () {
        it('must append common prefix, suffix and word boundary to given word',
            function () {
                expect(
                    atropa.regex.appendPrefixesAndSuffixes('aaaaa').length
                ).toBeGreaterThan(20);
            }
        );
        
        it('must not append prefixes and suffixes if given word is ' +
                'shorter than the given threshold',
            function () {
                expect(
                    atropa.regex.appendPrefixesAndSuffixes('aaaaa', 5)
                ).toEqual('\\b()aaaaa()\\b');
            }
        );
    });
});


