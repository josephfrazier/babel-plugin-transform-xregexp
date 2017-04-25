RegExp();
new RegExp('^[a-z]+$');
RegExp('( [0-9]{4} ) -?  # year  \n' +
       '( [0-9]{2} ) -?  # month \n' +
       '( [0-9]{2} )     # day     ', 'x');
RegExp(`
  ( [0-9]{4} ) -?  # year
  ( [0-9]{2} ) -?  # month
  ( [0-9]{2} )     # day
`, 'x');
