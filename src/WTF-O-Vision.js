/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true,
    vars: true
*/
/*global XPathResult, module */
// end header
/**
 * WTF-O-Vision
 * @fileOverview WTF-O-Vision <br />
 * The Glorious WTF-O-Vision (js)
 * @author <a href="mailto:matthewkastor@gmail.com">
 * Matthew Christopher Kastor-Inare III </a><br />
 * ☭ Hial Atropa!! ☭
 */



/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa;
atropa = {};
/**
 * Checks whether this class has been marked as unsupported and throws an 
 *  error if it has.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {String} errorMessage Optional. A custom error message. Defaults to
 *  atropa.data[className].error
 */
atropa.supportCheck = function (className, errorMessage) {
    "use strict";
    className = String(className);
    errorMessage = errorMessage || atropa.data[className].error;
    errorMessage = String(errorMessage);
    
    if(atropa.data[className].support === 'unsupported') {
        throw new Error(errorMessage);
    }
};
/**
 * Pushes a requirement check into atropa.data.requirements. The test
 *  tests whether the class is supported in this environment. Sets
 *  atropa.data[className]'s support to unsupported and error to errorMessage
 *  if the requirementFn returns false. The requirement checks will all be run
 *  after the library has loaded.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {Function} requirementFn A function to test whether or not the class
 *  is supported in this environment. If supported, returns true otherwise
 *  return false.
 * @param {String} errorMessage The error message to use when this class or its
 *  methods are called in unsupported environments. Defaults to:
 *  'The atropa.' + className + ' class is unsupported in this environment.';
 */
atropa.requires = function (className, requirementFn, errorMessage) {
    "use strict";
    var check = function () {
        var test = false;
        if(typeof className !== 'string') {
            throw new Error('atropa.requires requires the class name to be ' +
                'specified');
        }
        
        if(atropa.data[className] === undefined) {
            atropa.data[className] = {};
            
            if(typeof requirementFn !== 'function') {
                requirementFn = false;
            }
            errorMessage = errorMessage || 'The atropa.' + className +
                    ' class is unsupported in this environment.';
            try {
                test = requirementFn();
            } catch (e) {
                test = false;
            }
            
            atropa.data[className].error = errorMessage;
            
            if(test === false) {
                atropa.data[className].support = 'unsupported';
            }
        }
    };
    
    atropa.data.requirements.push(check);
};
/**
 * Container for gobal data related to the classes and functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for gobal data related to the classes and functions.
 */
atropa.data = {};

atropa.data.requirements = [];

atropa.nop = function nop () {
    "use strict";
    return null;
};

/**
 * Set default values for optional function parameters.
 * @example
 * <pre>
 *   // To set a default value for an optional parameter
 *   function(optionalArg) {
 *       var defaultVal = 'hello there!';
 *       optionalArg = atropa.setAsOptionalArg(defaultVal, optionalArg);
 *       return optionalArg;
 *   }
 * </pre>
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} defaultVal The default value to set.
 * @param {Mixed} optionalArg A reference to the optional argument.
 * @returns {Mixed} Returns the default value supplied when the optional
 * argument is undefined or null. Otherwise, the supplied optional argument
 * is returned.
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.setAsOptionalArg">tests</a>
 */
atropa.setAsOptionalArg = function (defaultVal, optionalArg) {
    "use strict";
    if (optionalArg === undefined || optionalArg === null) {
        optionalArg = defaultVal;
    }
    return optionalArg;
};



/**
 * Utilities for handling arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @namespace Utilities for handling arrays.
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.arrays">tests</a>
 */
atropa.arrays = {};
/**
 * Compares two arrays based on size, contents, and element order.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} array1 One array you want compared to another.
 * @param {Array} array2 The other array.
 * @returns {Boolean} Returns true or false depending on
 *  whether or not the arrays matched in size, composition, and
 *  element order.
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.match(x,y);
 * // returns false
 * @example
 * var x = [1,2];
 * var y = [1,2];
 * atropa.arrays.match(x,y);
 * // returns true
 * @example
 * var x = [1,2];
 * var y = [2,1];
 * atropa.arrays.match(x,y);
 * // returns false because the elements are not in the same order.
 * @example
 * var x = [1,{'aProp' : 'aValue'}];
 * var y = [1,{'aProp' : 'aValue'}];
 * atropa.arrays.match(x,y);
 * // returns false because even though the object looks the same, the
 * // two objects are in fact distinct objects.
 * @example
 * var obj = {'aProp' : 'aValue'};
 * var x = [1,obj];
 * var y = [1,obj];
 * atropa.arrays.match(x,y);
 * // returns true because the objects referenced in the arrays are
 * // in fact the same object.
 */
atropa.arrays.match = function arraysMatch(array1, array2) {
    "use strict";
    var x,
    l;
    if (array1.length !== array2.length) {
        return false;
    }
    l = array1.length;
    for (x = 0; x < l; x += 1) {
        if (array1[x] !== array2[x]) {
            return false;
        }
    }
    return true;
};
/**
 * Subtracts one array from another array based on the unique values in both
 *  sets.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} a (subtrahend) The array to subtract.
 * @param {Array} (minuend) fromB The array with elements duplicated in <code>a</code>
 * @returns {Array} Returns a new array containing only the unique
 *  values found in <code>fromB</code> that are not present in <code>a</code>
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.subtract(x,y);
 * // returns [3]
 * @example
 * var x = [1,3];
 * var y = [3,1];
 * atropa.arrays.subtract(x,y);
 * // returns []
 * @example
 * var x = [1,3];
 * var y = [3,1,1,9];
 * atropa.arrays.subtract(x,y);
 * // returns [9]
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'}
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.subtract(x,y);
 * // returns [] 
 * // because the objects referenced in the arrays are the same object.
 */
atropa.arrays.subtract = function(a, fromB) {
    "use strict";
    var the = {};
    the.result = [];
    fromB.forEach(function(item){
        the.mark = false;
        a.forEach(function(rm){
            if(item === rm) {
                the.mark = true;
            }
        });
        if(the.mark !== true) {
            the.result.push(item);
        }
    });
    return the.result;
};
/**
 * Returns an array of values found in both of the given arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} array1 An array.
 * @param {Array} array2 Another array.
 * @returns {Array} Returns an array of values found in both of the given
 *  arrays.
 * @example
 * var x = [1,3,4];
 * var y = [3,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3]
 * @example
 * var x = [1,1,3,4];
 * var y = [3,1,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,1,3]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3,{'aProp' : 'aVal'}]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 */
atropa.arrays.intersect = function intersect(array1, array2) {
    "use strict";
    var smallArray, largeArray, intersection = [];
    if(array1.length > array2.length) {
        largeArray = array1.splice(0);
        smallArray = array2.splice(0);
    } else {
        largeArray = array2.splice(0);
        smallArray = array1.splice(0);
    }
    smallArray.forEach(function (item) {
        var idxInLargeArray = largeArray.indexOf(item);
        if (0 <= idxInLargeArray) { // has word
            intersection.push(largeArray.splice(idxInLargeArray, 1)[0]);
        }
    });
    return intersection;
};
/**
 * Calculates the frequency of items occurring in an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array to calculate frequencies from.
 * @returns {Object} Returns an object whose keys are each unique
 *  elements from the array and their value is their frequency of
 *  occurrence within the array. Be careful that your array does
 *  not contain values matching object instance property names.
 * @example
 * var x = [1,1,1,1,1,3,3];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 5,
 * //     "3": 2
 * // }
 * @example
 * var x = ["bill", "fred", "fred", "jane"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "bill": 1,
 * //     "fred": 2,
 * //     "jane": 1
 * // }
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 1
 * // }
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var otherObj = {};
 * var x = [1,3,obj,otherObj,{'aDoughnut' : 'sprinkles'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 3
 * // }
 * @example
 * var x = [1,3,"toString"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "toString": "function toString() {\n    [native code]\n}1"
 * // }
 */
atropa.arrays.getFrequency = function (arr) {
    "use strict";
    var out = arr.reduce(function (acc, curr) {
        if (acc[curr] === undefined) {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
    return out;
};
/**
 * Gets Unique values from an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} largeArray The array with duplicate values in it.
 * @returns {Array} Returns a new array containing only the unique
 *  values found in the largeArray.
 * @example
 * var x = [1,1,1,4,4,3,6];
 * atropa.arrays.getUnique(x);
 * // returns [ "1", "4", "3", "6" ]
 * @example
 * var x = ["bill", "fred", "jane", "fred"];
 * atropa.arrays.getUnique(x);
 * // returns ["bill", "fred", "jane"]
 * @example
 * var x = [ 
 *     "bill",
 *     {"aProp" : "aValue"},
 *     {"aGuy" : "fred"},
 *     {"aLady" : "jane"}
 * ];
 * atropa.arrays.getUnique(x);
 * // returns [ "bill", "[object Object]" ]
 */
atropa.arrays.getUnique = function (largeArray) {
    "use strict";
    return Object.keys(atropa.arrays.getFrequency(largeArray)).sort();
};
/**
 * Removes empty strings from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arrayWithEmptyElements The array with empty strings in it.
 * @returns {Array} Returns a new array with empty strings removed.
 * @example
 * var x = [ 10, , 5, "", '', 7 ];
 * console.log('starting length ' + x.length);
 * console.log(x);
 * x = atropa.arrays.removeEmptyElements(x);
 * console.log('ending length ' + x.length);
 * console.log(x);
 * // displays the following
 * // starting length 6
 * // [10, undefined, 5, "", "", 7]
 * // ending length 3
 * // [10, 5, 7]
 */
atropa.arrays.removeEmptyElements = function (arrayWithEmptyElements) {
    "use strict";
    return arrayWithEmptyElements.filter(function (item) {
        return !atropa.inquire.isEmptyString(item);
    });
};
/**
 * Reindexes an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array with discontinuous keys.
 * @returns {Array} Returns an array with continuous keys.
 * @example
 * var x = [ "a", "b", "c", undefined ];
 * console.log(x); // [ "a", "b", "c", undefined ]
 * console.log(x.length); // 4
 * 
 * delete x[1]; // deletes the key from the array but
 *              // the array length remains the same
 *              // at this point the arrays keys are 0, 2, and 3
 * console.log(x); // [ "a", undefined, "c", undefined ]
 * console.log(x.length); // 4
 * 
 * x = atropa.arrays.reindex(x);
 * console.log(x); //  [ "a", "c", undefined ]
 *    // note that the last element existed in the array, its value was
 *    // undefined but it did have a key so the element remains in the array.
 *    //
 *    // The deleted element was in fact deleted from the array so there was no
 *    // key x[1] at all, when trying to access this non existing element the
 *    // value of undefined was returned. This behavior is confusing unless you
 *    // think about the arrayas an object whose properties are named by
 *    // numbers. Accessing an undefined property returns undefined regardless
 *    // of whether the property existed in the past or not.
 * console.log(x.length); // 3
 */
atropa.arrays.reindex = function reindex(arr) {
    "use strict";
    var idx, out;
    out = [];
    for(idx in arr) {
        if(arr.hasOwnProperty(idx)) {
            out.push(arr[idx]);
        }
    }
    return out;
};
/**
 * Sorts an array's elements numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @param {Array} arr The array to sort. All elements of the array must be
 *  number-ish.
 * @returns {Array} Returns an array whose elements are in numeric order.
 * @example
 * var x = [3, 2, 9, 26, 10, 1, 99, 15];
 * console.log( atropa.arrays.sortNumerically(x) );
 * // logs [1, 2, 3, 9, 10, 15, 26, 99]
 */
atropa.arrays.sortNumerically = function sortNumerically(arr) {
    "use strict";
    return arr.sort(function (a, b) {
        return (a - b);
    });
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.arrays.sortAlphabetically = function sortAlphabetically(arr) {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};
/**
 * Deletes the given element from the array at the given index. It basically
 *  does what you would expect the delete operator to do, except the delete
 *  operator doesn't do what you would expect.
 * @param {Array} arr The array.
 * @param {Number} index The index of the element to delete.
 * @returns Returns an array with the element removed, contiguous keys, and
 *  whose length is 1 less than the input array.
 */
atropa.arrays.deleteElement = function (arr, index) {
    "use strict";
    delete arr[index];
    return atropa.arrays.reindex(arr);
};



/**
 * Container for functions that test the state of inputs.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for functions that test the state of inputs.
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.inquire">tests</a>
 */
atropa.inquire = {};
/**
 * Checks whether the input is null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be null.
 * @returns {Boolean} Returns true if x === null.
 */
atropa.inquire.isNull = function (x) {
    "use strict";
    return (x === null);
};
/**
 * Checks whether the input is an object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be an object.
 * @returns {Boolean} Returns true if typeof(x) === 'object'.
 */
atropa.inquire.isObject = function (x) {
    "use strict";
    return (typeof x === 'object');
};
/**
 * Checks whether the input is both an object and not null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be both an
 * object and null.
 * @returns {Boolean} Returns true if x is both an object and
 * not null. (null is an object).
 */
atropa.inquire.isObjectNotNull = function (x) {
    "use strict";
    return atropa.inquire.isObject(x) && (!atropa.inquire.isNull(x));
};
/**
 * Checks an object for the existence of a property
 * regardless of whether the property was inherited
 * or not.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj An object which may or may not
 * have the property identified by prop.
 * @param {String} prop A string value representing the
 * name of the property.
 * @returns {Boolean} Returns true if obj.prop exists,
 * otherwise returns false.
 */
atropa.inquire.hasProperty = function (obj, prop) {
    "use strict";
    if (atropa.inquire.isObjectNotNull(obj)) {
        return (prop in obj);
    }
    return false;
};
/**
 * Checks whether the input is an empty string.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} str The string you want to know about
 * @returns {Boolean} Returns true if str is an empty string,
 *  otherwise returns false.
 */
atropa.inquire.isEmptyString = function (str) {
    "use strict";
    var out = false;
    if ('' === str) {
        out = true;
    }
    return out;
};



(function () {
    "use strict";
    atropa.requires(
        'wtf',
        function () {
            var supported = true;
            
            [
                atropa.regex,
                atropa.string.countWords,
                atropa.setAsOptionalArg
            ].forEach(function (prerequisite) {
                if(prerequisite === undefined) {
                    supported = false;
                }
            });
            return supported;
        }
    );
}());

(function () {
    "use strict";
    atropa.requires(
        'wtfHtmlElement',
        function () {
            var supported = true;
            
            [
                window
            ].forEach(function (prerequisite) {
                if(prerequisite === undefined) {
                    supported = false;
                }
            });
            return supported;
        }
    );
}());

/**
 * Container for all Glorious WTFifier related functions and such.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for all Glorious WTFifier related functions and such.
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.wtf">tests</a>
 * @requires atropa.regex
 * @requires atropa.wtf.dictionary
 */
atropa.wtf = {};
/**
 * The Glorious WTFification Dictionary: Turning Shit
 * Into Polished Turds.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130110
 */
atropa.wtf.dictionary = {
    "adapt" : "adopt",
    "adaptation" : "adaption",
    "adapted" : "adopted",
    "administer" : "minister",
    "admittance" : "admission",
    "aesthetic" : "ascetic",
    "affect" : "effect",
    "agreement" : "agreeance",
    "aid" : "aide",
    "aide" : "aid",
    "air" : "err",
    "aisle" : "isle",
    "all" : "ball",
    "allowed" : "aloud",
    "allude" : "refer",
    "aloud" : "allowed",
    "alternate" : "alternative",
    "ambiguous" : "ambivalent",
    "amongst" : "among",
    "analysis" : "analyzation",
    "anecdote" : "antidote",
    "ant" : "aunt",
    "anyways" : "anywise",
    "appraise" : "apprise",
    "apropos" : "appropriate",
    "arc" : "ark",
    "ark" : "arc",
    "asphixiate" : "finixiate",
    "assure" : "ensure",
    "astigmatism" : "stigmatism",
    "ate" : "eight",
    "attached" : "attacked",
    "attic" : "anus",
    "audition" : "auction",
    "aunt" : "ant",
    "bad" : "mad",
    "badly" : "poorly",
    "bagel" : "baby",
    "bah" : "bag",
    "ball" : "all",
    "ballad" : "salad",
    "banners" : "manners",
    "bare" : "bear",
    "base" : "bass",
    "bass" : "base",
    "be" : "bee",
    "beach" : "beech",
    "beans" : "jeans",
    "bear" : "bare",
    "beast" : "feast",
    "beat" : "beet",
    "beaurocrats" : "beaurocraps",
    "bedding" : "wedding",
    "bee" : "be",
    "beech" : "beach",
    "beet" : "beat",
    "bells" : "wells",
    "belly" : "jelly",
    "berry" : "bury",
    "berth" : "birth",
    "best" : "breast",
    "bionic" : "bisontonical",
    "birth" : "berth",
    "bite" : "byte",
    "blew" : "blue",
    "blow" : "crow",
    "blue" : "blew",
    "blushing" : "crushing",
    "boar" : "bre",
    "bore" : "boar",
    "bough" : "bow",
    "bought" : "boughten",
    "bowel" : "foul",
    "bowl" : "soul",
    "brake" : "break",
    "bread" : "bred",
    "broach" : "brooch",
    "brows" : "browse",
    "bubbling" : "babbling",
    "bunny" : "money",
    "buoy" : "boy",
    "burrow" : "burro",
    "bury" : "berry",
    "busy" : "dizzy",
    "butter" : "butthurt",
    "butterfly" : "flutter by",
    "buy" : "by",
    "bye" : "eye",
    "byte" : "bite",
    "capture" : "captivate",
    "careen" : "career",
    "caustic" : "crastic",
    "cell" : "sell",
    "cent" : "sent",
    "cereal" : "serial",
    "chili" : "chilly",
    "chinese" : "children",
    "chip" : "flip",
    "chord" : "cord",
    "christ" : "chile",
    "chromosomes" : "kromo-stones",
    "cite" : "site",
    "civic" : "civil",
    "classic" : "classical",
    "cliff-hanger" : "cliff-dweller",
    "close" : "clothes",
    "coke" : "cock",
    "collaborate" : "corroborate",
    "collected" : "collective",
    "college" : "collage",
    "comedic" : "comical",
    "commentate" : "comment",
    "complement" : "compliment",
    "comprehension" : "apprehension",
    "comprised" : "composed",
    "concentration" : "consecration",
    "confiscate" : "confisticate",
    "conscientious" : "conscious",
    "control" : "patrol",
    "converse" : "conversate",
    "coop" : "coupe",
    "cop porn" : "popcorn",
    "corpuscles" : "corpsuckels",
    "correct" : "catrectal",
    "council" : "counsel",
    "coupe" : "coop",
    "coupon" : "puke on",
    "creak" : "creek",
    "credible" : "credulous",
    "cremated" : "incremented",
    "crews" : "cruise",
    "critique" : "criticize",
    "crock" : "crack",
    "crow" : "blow",
    "crushing" : "blushing",
    "damn" : "donut",
    "damp" : "stamp",
    "dealer" : "stealer",
    "dear" : "queer",
    "depreciate" : "deprecate",
    "derogatory" : "suppository",
    "deterrent" : "detergent",
    "die" : "dye",
    "disinterested" : "uninterested",
    "disney" : "divorce",
    "dissension" : "dysentery",
    "dissenting" : "descending",
    "distinguished" : "extinguished",
    "dizzy" : "busy",
    "do" : "dew",
    "doctoral" : "doctorial",
    "doe" : "dough",
    "dog" : "dong",
    "dramatic" : "dramatical",
    "dribble" : "drivel",
    "dual" : "duel",
    "dude" : "doodie",
    "dysentery" : "dissension",
    "ears" : "tears",
    "ease" : "tease",
    "ecology" : "ecrology",
    "effect" : "affect",
    "egoist" : "egotist",
    "eight" : "ate",
    "elective" : "electoral",
    "eleviate" : "elebate",
    "empathy" : "sympathy",
    "enormity" : "immensity",
    "ensure" : "insure",
    "entrepreneur" : "entramanore",
    "erogenous" : "geronimous",
    "err" : "air",
    "escape" : "excape",
    "ewe" : "you",
    "eye" : "bye",
    "face" : "race",
    "fair" : "fare",
    "fairy" : "ferry",
    "fall on deaf ears" : "fall on death ears",
    "fanatic" : "phonetic",
    "farther" : "further",
    "faze" : "phase",
    "feast" : "beast",
    "feat" : "feet",
    "feminine" : "femine",
    "fight in your race" : "right in your face",
    "fight" : "right",
    "fir" : "fur",
    "fish" : "wish",
    "flags" : "hags",
    "flammable" : "inflammable",
    "flaunt" : "flout",
    "flea" : "flee",
    "fleshout" : "flushout",
    "flew" : "flu",
    "flip" : "chip",
    "flounder" : "founder",
    "flour" : "flower",
    "flung" : "hung",
    "flutter by" : "butterfly",
    "for all intents and purposes" : "for all intensive purposes",
    "for" : "four",
    "foreplay" : "floorplay",
    "form" : "warm",
    "formally" : "formerly",
    "forth" : "fourth",
    "fortuitous" : "fortunate",
    "foul" : "bowel",
    "frustrated" : "flustrated",
    "fuck" : "fridge",
    "funeral" : "venereal",
    "gall" : "garlic",
    "gangster" : "hamster",
    "gansta" : "hamsta",
    "garage" : "grave",
    "gentle" : "genital",
    "good" : "well",
    "gorilla" : "guerrilla",
    "grease" : "Greece",
    "grieve" : "berieve",
    "groan" : "grown",
    "groin" : "groan",
    "gynecologist" : "groinacologist",
    "hags" : "flags",
    "hair" : "hare",
    "hall" : "haul",
    "halve" : "have",
    "hay" : "hey",
    "heal" : "heel",
    "hearing" : "earring",
    "hell" : "he'll",
    "hello" : "hell",
    "hi" : "high",
    "hick" : "sick",
    "hiss and lear" : "listen here",
    "hissed" : "missed",
    "historic" : "historical",
    "history" : "mystery",
    "hoarse" : "horse",
    "hole" : "whole",
    "holey" : "holy",
    "honein" : "homein",
    "horizontal" : "Vertizontal",
    "hormones" : "her-mones",
    "horses" : "hornets",
    "hottie" : "hogtie",
    "hour" : "our",
    "house" : "hooker",
    "hung" : "flung",
    "hungry" : "horny",
    "hypodemic needle" : "hypodermic nurdle",
    "hysterical" : "hilarious",
    "I couldn't care less" : "I could care less",
    "imply" : "infer",
    "incense" : "incest",
    "incidents" : "instance",
    "ingenuous" : "ingenious",
    "insensible" : "insensitive",
    "install" : "instill",
    "insulation" : "installation",
    "intense" : "intensive",
    "interior" : "inferior",
    "interment" : "internment",
    "interpret" : "interpretate",
    "intimate" : "iminent",
    "intuition" : "intermission",
    "invite" : "knife",
    "isle" : "aisle",
    "it's a dog-eat-dog world" : "it's a doggy dog world",
    "jeans" : "beans",
    "jelly beans" : "belly jeans",
    "jelly" : "belly",
    "jesus" : "birdseed",
    "jetlag" : "jetlock",
    "jump" : "dump",
    "kiss" : "kill",
    "knead" : "need",
    "knew" : "new",
    "knight" : "night",
    "knot" : "not",
    "know" : "no",
    "lack" : "pack",
    "later" : "latter",
    "lay" : "lie",
    "lead" : "led",
    "lead" : "speed",
    "leave" : "let",
    "leopard" : "shepherd",
    "lessen" : "lesson",
    "liberation" : "lubrication",
    "lies" : "pies",
    "light" : "right",
    "light" : "spite",
    "lighted" : "lit",
    "listen here" : "hiss and lear",
    "loan" : "lone",
    "loose" : "lose",
    "loving" : "shoving",
    "luxuriant" : "luxurious",
    "mad" : "bad",
    "made" : "maid",
    "magic" : "magical",
    "mail" : "male",
    "mail" : "sail",
    "manners" : "banners",
    "marry" : "merry",
    "martial" : "marshal",
    "massacres" : "mascaras",
    "masseuse" : "masseur",
    "mazeltov" : "molotov",
    "meat" : "meet",
    "median" : "medium",
    "meditate" : "menstruate",
    "medium" : "median",
    "melting" : "smelting",
    "memorial" : "memorium",
    "memoriam" : "memorial",
    "mend" : "send",
    "menopause" : "mental pause",
    "mescaline" : "masculine",
    "minorities" : "minororities",
    "minors" : "miners",
    "minstrel" : "menstrual",
    "mischievous" : "mischievious",
    "missed" : "hissed",
    "money" : "bunny",
    "mustered" : "mustard",
    "mystery" : "history",
    "nails" : "tails",
    "needle" : "nurdle",
    "nick" : "pick",
    "no tails" : "toe nails",
    "none" : "nun",
    "oh" : "owe",
    "one" : "won",
    "oppress" : "repress",
    "or" : "oar",
    "orient" : "orientate",
    "ostensibly" : "ostensively",
    "out" : "shout",
    "overdo" : "overdue",
    "oversee" : "overlook",
    "pack" : "lack",
    "paid" : "laid",
    "pail" : "pale",
    "pain" : "pane",
    "paralysis" : "paralyzation",
    "parameters" : "perimeters",
    "peace" : "piece",
    "peak" : "peek",
    "pen" : "penis",
    "persecute" : "execute",
    "persecute" : "prosecute",
    "perspective" : "prospective",
    "perspire" : "expire",
    "pervert" : "orevert",
    "pharoahs" : "fairy-ohs",
    "phone" : "thong",
    "pick" : "nick",
    "pick" : "pickle",
    "pie" : "porn",
    "pies" : "lies",
    "plain" : "plane",
    "pole" : "poll",
    "poor" : "pour",
    "popcorn" : "cop porn",
    "practical" : "practicle",
    "practice" : "practise",
    "pray" : "prey",
    "prearranged" : "prederranged",
    "precede" : "proceed",
    "precipitate" : "precipitous",
    "pre-marital" : "premartial",
    "prescribe" : "proscribe",
    "principal" : "principle",
    "prostate" : "prostrate",
    "puke on" : "coupon",
    "qualifications" : "qualifidations",
    "queer" : "dear",
    "quiet" : "quite",
    "race" : "face",
    "rain" : "rein",
    "rap" : "wrap",
    "rare" : "rarified",
    "rationale" : "rationalization",
    "ravaging" : "ravishing",
    "ravishing" : "ravenous",
    "reactionary" : "reactive",
    "real" : "reel",
    "rebelling" : "revolting",
    "rebut" : "refute",
    "reckless" : "wreckless",
    "refute" : "refudiate",
    "regardless" : "irregardless",
    "regretfully" : "regrettably",
    "regurgitate" : "detergerate",
    "rehabilitate" : "debilitate",
    "releave" : "relive",
    "repel" : "repulse",
    "repute" : "refute",
    "right" : "fight",
    "ring" : "wring",
    "role" : "roll",
    "rose" : "rows",
    "sail" : "sale",
    "salad" : "ballad",
    "salient" : "saline",
    "sanitarium" : "saniquarium",
    "save" : "wave",
    "scapegoat" : "escape goat",
    "scene" : "seen",
    "sea" : "see",
    "seal" : "heal",
    "seam" : "seem",
    "segue" : "segway",
    "self esteem" : "self of steam",
    "self-depreciating" : "self-deficating",
    "send" : "mend",
    "sense" : "since",
    "shake" : "take",
    "shelled" : "unshelled",
    "shepherd" : "leopard",
    "shout" : "out",
    "shoving" : "loving",
    "shower" : "tower",
    "sick" : "hick",
    "since" : "sense",
    "site" : "sight",
    "so" : "sew",
    "soar" : "sore",
    "social" : "societal",
    "soil" : "toil",
    "sole" : "soul",
    "some" : "sum",
    "sons" : "tons",
    "soon" : "slutty",
    "soul" : "bowl",
    "specially" : "especially",
    "speed" : "lead",
    "spite" : "light",
    "spread" : "sores",
    "stamp" : "damp",
    "stature" : "statue",
    "steal" : "steel",
    "stealer" : "dealer",
    "strategies" : "tragedies",
    "studying" : "studding",
    "substantial" : "substantive",
    "supposedly" : "supposably",
    "sweat" : "fart",
    "synchronize" : "sympathize",
    "tail" : "tale",
    "take" : "shake",
    "taste" : "waste",
    "taunt" : "taut",
    "tears" : "ears",
    "tease" : "ease",
    "tenant" : "tenet",
    "tenets" : "tenants",
    "term" : "worm",
    "testament" : "tentacle",
    "their" : "there",
    "therefor" : "therefore",
    "thorough" : "thoroughgoing",
    "throne" : "throb",
    "thusly" : "thus",
    "toe" : "tow",
    "toil" : "soil",
    "toilet" : "terlit",
    "tons" : "sons",
    "tornado" : "tomato",
    "tout" : "taut",
    "toward" : "towards",
    "tower" : "shower",
    "tragedies" : "strategies",
    "trampoline" : "trampaloon",
    "transvestite" : "transversive",
    "tupperware" : "underwear",
    "ulterior" : "alterior",
    "unconscious" : "unconscience",
    "uniform" : "unicorn",
    "united" : "untied",
    "unparalled" : "unparalyzed",
    "unparalleled" : "unparalyzed",
    "untied" : "united",
    "upmost" : "utmost",
    "upped the ante" : "upped the annie",
    "usage" : "use",
    "utilize" : "use",
    "vacation" : "vocation",
    "vary" : "very",
    "verbiage" : "verbage",
    "vericose" : "very close",
    "vice versa" : "ipso fatso",
    "viola" : "voila",
    "violence" : "violins",
    "virtue" : "virgin",
    "viscous circle" : "vicious cycle",
    "voluptuous" : "volumptuous",
    "wail" : "whale",
    "waist" : "waste",
    "wait" : "weight",
    "war" : "wore",
    "warm" : "form",
    "warn" : "worn",
    "warrantee" : "warranty",
    "wary" : "weary",
    "waste" : "taste",
    "wave" : "save",
    "way" : "weigh",
    "wayside" : "wasteside",
    "we" : "wee",
    "weak" : "week",
    "weary" : "leery",
    "weather" : "whether",
    "wedding" : "bedding",
    "week" : "weed",
    "wells" : "bells",
    "werewolf" : "weirdwolf",
    "whales" : "sails",
    "which" : "witch",
    "wish" : "fish",
    "worm" : "term",
    "worse comes to worst" : "worst comes to worst",
    "worthwhile" : "worthwild",
    "your" : "you're",
    "zebras" : "zeberellas",
    "zucchini" : "cuisini"
};
/**
 * Accepts plain text input and Gloriously WTFifies it.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130110
 * @param {String} target The text to WTFify.
 * @param {Boolean} outputHTML Specifies if you want the output
 *  in HTML format. If false, will output plain text. Defaults
 *  to false.
 * @return {String} Returns Genuine WTFified text.
 */
atropa.wtf.wtfify = function (target, outputHTML) {
    "use strict";
    atropa.supportCheck('wtf');
    
    var regexValue,
        replacementText,
        oldWord,
        wtfCount,
        wordCount,
        ret,
        word;
    
    if(true !== outputHTML) {
        outputHTML = false;
    }
    ret = {};
    wtfCount = 0;
    target = target.trim();
    wordCount = atropa.string.countWords(target);
    if(true === outputHTML) {
        target = target.replace(
            /(\. ?){2,}/gi,
            '<span style="color : brown ;"> [shit taco] </span>'
        );
        target = '<p> ' + target.replace(/(\r\n|\r|\n)/g,' <br/> ') + ' </p>';
    } else {
        target = target.replace(/(\. ?){2,}/gi, ' [shit taco] ');
    }
    /**
     * Accepts plain text input and Gloriously WTFifies it.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130112
     * @methodOf atropa.wtf.wtfify-
     * @private
     * @param {String} m First matched pattern in string searched.
     * @param {String} sub1 First matched subpattern in string searched.
     * @param {String} sub2 Second matched subpattern in string searched.
     */
    replacementText = function (m, sub1, sub2) {
        wtfCount++;
        sub1 = atropa.setAsOptionalArg('', sub1);
        sub2 = atropa.setAsOptionalArg('', sub2);
        var out;
        if(true === outputHTML) {
            out = '<span style="color : red ;">' +
                sub1 + atropa.wtf.dictionary[word] + sub2 +
                '</span>';
        } else {
            out = sub1 + atropa.wtf.dictionary[word] + sub2;
        }
        return out;
    };
    // word is defined in the containing scope and
    // is not global, jshint is wrong
    for (word in atropa.wtf.dictionary) {
        if (atropa.wtf.dictionary.hasOwnProperty(word)) {
            oldWord = atropa.regex.appendPrefixesAndSuffixes(word);
            regexValue = new RegExp(oldWord, 'gi');
            target = target.replace(regexValue, replacementText);
        }
    }
    ret.wtfCount = wtfCount;
    ret.wordCount = wordCount;
    ret.score = wtfCount / wordCount;
    ret.txt = target;
    return ret;
};
/**
 * WTFifies the <code>textContent</code> or <code>value</code> of the
 *  given element and replaces the element's innerHTML with a pre block
 *  containing the results of WTFification.
 * @param {HTMLElement} elementReference A reference to an HTML Element.
 * @returns {HTMLElement} Returns the given element after wtfification.
 * @version 20130313
 */
atropa.wtf.htmlElement = function (elementReference) {
    "use strict";
    atropa.supportCheck('wtfHtmlElement');
    
    var wtfified, txt;
    elementReference.innerHTML = elementReference.innerHTML.replace(
        /<br>(\s+)?(\r\n|\r|\n)?/g, '\r\n');
    txt = elementReference.value || elementReference.textContent;
    wtfified = atropa.wtf.wtfify(txt, true);
    elementReference.innerHTML =
        '<pre style="color:black; background:white; white-space:pre-wrap;">' +
        wtfified.txt +
        '</pre>';
    return elementReference;
};



/**
 * A few utilities for manipulating strings.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace A few utilities for manipulating strings.
 * @requires atropa.regex.patterns
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.string">tests</a>
 */
atropa.string = {};
/**
 * Replaces repeated words and phrases with a single word or phrase.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to remove repeated words from.
 * @returns {String} Returns the given string with repeated words and
 *  phrases removed.
 */
atropa.string.removeRepeatedWord = function removeRepeatedWord (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.repeatedWords, '$1');
};
/**
 * Creates paragraph breaks at every occurrence of two consecutive line breaks.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to insert paragraph tags into.
 * @returns {String} Returns the given string with paragraph breaks inserted.
 */
atropa.string.lineBreaksToParagraphTags = function lineBreaksToParagraphTags (string) {
    "use strict";
    var out = string.replace(atropa.regex.patterns.paragraphBreaks, '</p><p>');
    out = '<p>' + out.trim() + '</p>';
    out = out.replace(/\s+<\/(p|br)>/g, '</$1>');
    return out;
};
/**
 * Creates break tags at every line break.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to insert break tags into.
 * @returns {String} Returns the given string with break tags inserted.
 */
atropa.string.lineBreaksToBreakTags = function lineBreaksToBreakTags (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.lineBreaks, '<br>');
};
/**
 * Normalizes line breaks to `\n`.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to normalize.
 * @returns {String} Returns the given string with normalized line breaks.
 */
atropa.string.normalizeEol = function normalizeEol (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.lineBreaks, '\n');
};
/**
 * Converts the first character of a given string to
 * uppercase.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {String} string The string for which you want the
 * first letter to be in upper case.
 * @returns {String} The given string with it's first letter capitalized.
 */
atropa.string.ucFirst = function ucFirst(string) {
    "use strict";
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string;
};
/**
 * Converts the given string to camel case.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130823
 * @param {String} string The string to camelize.
 * @returns {String} The camelized string.
 * @example
 *  atropa.string.camelize('get it together');
 *  // returns "getItTogether"
 */
atropa.string.camelize = function camelize (str) {
    "use strict";
    var arr, out;
    arr = str.split(' ');
    out = arr.shift();
    arr = arr.map(function (item) {
        return atropa.string.ucFirst(item);
    });
    out += arr.join('');
    return out;
};
/**
 * Counts words.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130313
 * @param {String} someText Plain text.
 * @return {Number} Returns the count of words in someText.
 */
atropa.string.countWords = function countWords(someText) {
    "use strict";
    var wordCount, re, len = 0;
    if(someText !== undefined && someText !== null) {
        someText = someText.trim();
        if(someText !== '') {
            wordCount = 0;
            re = /\s+/gi;
            wordCount = someText.split(re);
            len = wordCount.length;
        }
    }
    return len;
};
/**
 * Converts end of line markers into whatever you want. 
 * Automatically detects any of \r\n, \n, or \r and 
 * replaces it with the user specified EOL marker.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text you want processed.
 * @param {String} newEOL The replacement for the current EOL marks.
 * @returns {String} Returns the processed text.
 */
atropa.string.convertEol = function convertEOL(text, newEOL) {
    'use strict';
    return text.replace(atropa.regex.patterns.lineBreaks, newEOL);
};

/**
 * Removes a quantity of leading spaces specified by offset.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process.
 * @param {Number} offset The amount of spaces you want removed 
 * from the beginning of the text.
 * @returns Returns the processed text.
 */
atropa.string.offsetWhiteSpace = function offsetWhiteSpace(text, offset) {
    'use strict';
    var regx;
    regx = new RegExp('^ {' + offset + '}');
    text = text.replace(regx, '');
    return text;
};

/**
 * Converts all tabs in leading whitespace into four spaces.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process
 * @returns {String} Returns the processed text.
 */
atropa.string.normalizeWhiteSpacePrefix = function normalizeWhiteSpacePrefix(
    text
) {
    'use strict';
    var prefix = text.match(/^\s*/);
    if(prefix) {
        prefix = prefix[0];
        prefix = prefix.replace(/\t/g, '    ');
        text = text.replace(/^\s*/, prefix);
    }
    return text;
};

/**
 * Converts all tabs into four spaces.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process
 * @returns {String} Returns the processed text.
 */
atropa.string.normalizeWhiteSpace = function normalizeWhiteSpace(text) {
    'use strict';
    text = text.replace(/\t/g, '    ');
    return text;
};

/**
 * Counts the number of leading space or tab characters but not both.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to analyze.
 * @returns {Number} Returns the quantity of leading spaces or tabs.
 */
atropa.string.getOffset = function getOffset(text) {
    'use strict';
    var offset = 0,
        leadingChar = text.charAt(0);
        
    if( leadingChar === ' ' || leadingChar === '\t') {
        while(text.charAt(offset) === leadingChar && offset < text.length) {
            offset++;
        }
    }
    return offset;
};
/**
 * Breaks a string into an array of words.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} text The text to analyze.
 * @returns {Array} Returns an array of the words in
 *  the given text.
 * @requires atropa.arrays.removeEmptyElements
 */
atropa.string.getWords = function (text) {
    "use strict";
    var out = [];
    function invalidChars(element) {
        var matched = /^[\-'’`]+$/.test(element);
        // invert the result of test. throw out elements that match.
        return !matched;
    }
    out = atropa.arrays.removeEmptyElements(
        text.split(/[^A-Za-z\-'’`]+/gi)
    );
    out = out.filter(invalidChars);
    return out;
};
/**
 * Escapes <code>CDATA</code> sections in text
 *  so that the text may be embedded into a 
 *  <code>CDATA</code> section. This should be run
 *  on any text which may contain the string 
 *  <code>]]></code> since said string will effectively
 *  end the <code>CDATA</code> section prematurely.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} text The text containing 
 *  <code>CDATA</code> sections to escape.
 * @returns {Array} Returns a string with escaped
 *  <code>CDATA</code> sections.
 * @see <a href="http://en.wikipedia.org/wiki/CDATA#Nesting">
 *  http://en.wikipedia.org/wiki/CDATA#Nesting</a>
 * @see <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=98168">
 *  https://bugzilla.mozilla.org/show_bug.cgi?id=98168</a>
 */
atropa.string.escapeCdata = function escapeCdata(text) {
    "use strict";
    return String(text).replace(/\]\]>/g, ']]]]><![CDATA[>');
};



/**
 * Container for regex functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for regex functions.
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.regex">tests</a>
 */
atropa.regex = {};
/**
 * Regex patterns.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Regex patterns.
 */
atropa.regex.patterns = {
    /** finds repeated words and phrases */
    repeatedWords : /(\b.{3,}\b)\s*(\1)/g,
    /** finds paragraph breaks */
    paragraphBreaks : /(\r\n\r\n|\n\n|\r\r)/g,
    /** finds line breaks */
    lineBreaks : /(\r\n|\r|\n)/g
};
/**
 * Appends common prefix, suffix, and word boundary regex strings to
 * the supplied word.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130110
 * @param {String} word The word to append prefix and suffix to
 * @param {Integer} threshold The word.length at which it does not
 * make sense to append prefix and suffix. Defaults to 3.
 * @returns {String} Returns the supplied word with prefix, suffix,
 * and word boundaries attached. If the word.length was not greater
 * than the threshold, only word boundaries are attached. The string
 * represents a RegEx which should pick out most forms of regular
 * words.
 */
atropa.regex.appendPrefixesAndSuffixes = function (word, threshold) {
    "use strict";
    var prefixes,
    suffixes;
    prefixes = '(pre|un|re)?';
    suffixes = '(ification|' +
                'tionally|' +
                'ication|' +
                'ified|istic|iness|' +
                'fare|tion|ance|ence|less|ally|able|ness|ized|ised|' +
                'ous|ify|ing|ity|ful|ant|ate|est|ism|izm|ist|' +
                'ic|al|ed|er|et|ly|rs|in|' +
                'y|s|r|d)?';
    
    threshold = threshold === undefined ? 3 : threshold;
    
    if (word.length > threshold) {
        word = '\\b' + prefixes + word + suffixes + '\\b';
    } else {
        word = '\\b()' + word + '()\\b';
    }
    return word;
};


while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}


try {
    module.exports = atropa;
} catch (ignore) {
    // module.exports does not exist.
}


