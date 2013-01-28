
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
    };

    var $x = window._global_;
    $x.__namespace = "true";
    $x.__typeName = "_global_";
})(this);

  

  
/* vsdoc for atropa */

(function (window) {
    

    window.atropa = {
        /// <summary></summary>
        /// <field name="regex" type="">Container for regex functions.</field>
        /// <field name="string" type="">A few utilities for manipulating strings.</field>
        /// <field name="wtf" type="">Container for all Glorious WTFifier related functions and such.</field>
        /// <returns type="atropa"/>
                
        setAsOptionalArg: function(defaultVal, optionalArg) {
            /// <summary>Set default values for optional function parameters.</summary>
            /// <param name="defaultVal" type="Mixed">The default value to set.</param>
            /// <param name="optionalArg" type="Mixed">A reference to the optional argument.</param>
            /// <returns type="Mixed">Returns the default value supplied when the optional
            /// argument is undefined or null. Otherwise, the supplied optional argument
            /// is returned.</returns>
        }
        
    };

    var $x = window.atropa;
    $x.__namespace = "true";
    $x.__typeName = "atropa";
})(this);

  

  
/* vsdoc for atropa.regex */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.regex = {
        /// <summary></summary>
        /// <returns type="atropa.regex"/>
                
        appendPrefixesAndSuffixes: function(word, threshold) {
            /// <summary>Appends common prefix, suffix, and word boundary regex strings to
            /// the supplied word.</summary>
            /// <param name="word" type="String">The word to append prefix and suffix to</param>
            /// <param name="threshold" type="Integer" integer="true">The word.length at which it does not
            /// make sense to append prefix and suffix. Defaults to 3.</param>
            /// <returns type="String">Returns the supplied word with prefix, suffix,
            /// and word boundaries attached. If the word.length was not greater
            /// than the threshold, only word boundaries are attached. The string
            /// represents a RegEx which should pick out most forms of regular
            /// words.</returns>
        }
        
    };

    var $x = window.atropa.regex;
    $x.__namespace = "true";
    $x.__typeName = "atropa.regex";
})(this);

  

  
/* vsdoc for atropa.string */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.string = {
        /// <summary></summary>
        /// <returns type="atropa.string"/>
                
        ucFirst: function(string) {
            /// <summary>Converts the first character of a given string to
            /// uppercase.</summary>
            /// <param name="string" type="String">The string for which you want the
            /// first letter to be in upper case.</param>
            /// <returns type="String">The given string with it&apos;s first letter capitalized.</returns>
        }, 
        
        countWords: function(someText) {
            /// <summary>Counts words.</summary>
            /// <param name="someText" type="String">Plain text.</param>
            /// <returns type="Number">Returns the count of words in someText.</returns>
        }, 
        
        convertEol: function(text, newEOL) {
            /// <summary>Converts end of line markers into whatever you want. 
            /// Automatically detects any of \r\n, \n, or \r and 
            /// replaces it with the user specified EOL marker.</summary>
            /// <param name="text" type="String">The text you want processed.</param>
            /// <param name="newEOL" type="String">The replacement for the current EOL marks.</param>
            /// <returns type="String">Returns the processed text.</returns>
        }, 
        
        offsetWhiteSpace: function(text, offset) {
            /// <summary>Removes a quantity of leading spaces specified by offset.</summary>
            /// <param name="text" type="String">The text to process.</param>
            /// <param name="offset" type="Number">The amount of spaces you want removed 
            /// from the beginning of the text.</param>
            /// <returns type="">Returns the processed text.</returns>
        }, 
        
        normalizeWhiteSpacePrefix: function(text) {
            /// <summary>Converts all tabs in leading whitespace into four spaces.</summary>
            /// <param name="text" type="String">The text to process</param>
            /// <returns type="String">Returns the processed text.</returns>
        }, 
        
        normalizeWhiteSpace: function(text) {
            /// <summary>Converts all tabs into four spaces.</summary>
            /// <param name="text" type="String">The text to process</param>
            /// <returns type="String">Returns the processed text.</returns>
        }, 
        
        getOffset: function(text) {
            /// <summary>Counts the number of leading space or tab characters but not both.</summary>
            /// <param name="text" type="String">The text to analyze.</param>
            /// <returns type="Number">Returns the quantity of leading spaces or tabs.</returns>
        }, 
        
        getWords: function(text) {
            /// <summary>Breaks a string into an array of words.</summary>
            /// <param name="text" type="String">The text to analyze.</param>
            /// <returns type="Array">Returns an array of the words in
            ///  the given text.</returns>
        }, 
        
        escapeCdata: function(text) {
            /// <summary>Escapes &lt;code&gt;CDATA&lt;/code&gt; sections in text
            ///  so that the text may be embedded into a 
            ///  &lt;code&gt;CDATA&lt;/code&gt; section. This should be run
            ///  on any text which may contain the string 
            ///  &lt;code&gt;]]>&lt;/code&gt; since said string will effectively
            ///  end the &lt;code&gt;CDATA&lt;/code&gt; section prematurely.</summary>
            /// <param name="text" type="String">The text containing 
            ///  &lt;code&gt;CDATA&lt;/code&gt; sections to escape.</param>
            /// <returns type="Array">Returns a string with escaped
            ///  &lt;code&gt;CDATA&lt;/code&gt; sections.</returns>
        }
        
    };

    var $x = window.atropa.string;
    $x.__namespace = "true";
    $x.__typeName = "atropa.string";
})(this);

  

  
/* vsdoc for atropa.wtf */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.wtf = {
        /// <summary></summary>
        /// <field name="dictionary" type="">The Glorious WTFification Dictionary: Turning Shit
        /// Into Polished Turds.</field>
        /// <returns type="atropa.wtf"/>
                
        wtfify: function(target, isHTML) {
            /// <summary>Accepts plain text input and Gloriously WTFifies it.</summary>
            /// <param name="target" type="String">The text to WTFify.</param>
            /// <param name="isHTML" type=""></param>
            /// <returns type="String">Returns Genuine WTFified text.</returns>
        }, 
        
        htmlElement: function(elementReference) {
            /// <summary>WTFifies the &lt;code&gt;textContent&lt;/code&gt; or &lt;code&gt;value&lt;/code&gt; of the
            ///  given element and replaces the element with a pre block
            ///  containing the results of WTFification.</summary>
            /// <param name="elementReference" type="HTMLElement">A reference to an HTML Element.</param>
        }
        
    };

    var $x = window.atropa.wtf;
    $x.__namespace = "true";
    $x.__typeName = "atropa.wtf";
})(this);

  

