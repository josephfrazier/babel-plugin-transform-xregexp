// RegExp
RegExp();
RegExp('');
new RegExp('^[a-z]+$');
RegExp('( [0-9]{4} ) -?  # year  \n' +
       '( [0-9]{2} ) -?  # month \n' +
       '( [0-9]{2} )     # day     ', 'x');
RegExp(`
  ( [0-9]{4} ) -?  # year
  ( [0-9]{2} ) -?  # month
  ( [0-9]{2} )     # day
`, 'x');

RegExp(`
  ( [\d]{4} ) -?  # year
  ( [\d]{2} ) -?  # month
  ( [\d]{2} )     # day
`, 'x' + '');

// leadingModeModifier
/(?im)^[a-z]+$/;
new RegExp('(?im)^[a-z]+$');

/(?im)^[a-z]+$/.source;

// namedCapture
/\b(?<word>[a-z]+)\s+\k<word>\b/gi;
new RegExp('\\b(?<word>[a-z]+)\\s+\\k<word>\\b', 'gi');
new RegExp(`\b(?<word>[a-z]+)\s+\k<word>\b`, 'gi');
new RegExp(`\b([a-z]+)\s+\\1\b`, 'gi');

/\b(?<word>[a-z]+)\s+\k<word>\b/.source;
