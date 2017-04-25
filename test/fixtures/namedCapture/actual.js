/\b(?<word>[a-z]+)\s+\k<word>\b/gi;
new RegExp('\\b(?<word>[a-z]+)\\s+\\k<word>\\b', 'gi');

/\b(?<word>[a-z]+)\s+\k<word>\b/.source;
