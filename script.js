
$(window).on('load', function() {
$('#btn_search').on('click', function(e){
    e.preventDefault();
    
    var results = findEntriesWithID($('#search_box').val());
    
    $('.output').text(JSON.stringify(results));
})

var csvString = $.trim($('.CSV').text());
var csvArray = csvToArray(csvString);

function findEntriesWithID(ID){
    var entries = [];
    
    for(var i = 0; i < csvArray.length; ++i){
        var row = csvArray[i];
        
        if(row.ID === ID){
            entries.push(row);
        }
    }
    
    return entries;
}

function csvToArray(csvString){
  // The array we're going to build
  var csvArray   = [];
  // Break it into rows to start
  var csvRows    = csvString.split(/\n/);
  // Take off the first line to get the headers, then split that into an array
  var csvHeaders = csvRows.shift().split(';');

  // Loop through remaining rows
  for(var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
    var rowArray  = csvRows[rowIndex].split(';');

    // Create a new row object to store our data.
    var rowObject = csvArray[rowIndex] = {};
    
    // Then iterate through the remaining properties and use the headers as keys
    for(var propIndex = 0; propIndex < rowArray.length; ++propIndex){
      // Grab the value from the row array we're looping through...
      var propValue =   rowArray[propIndex].replace(/^"|"$/g,'');
      // ...also grab the relevant header (the RegExp in both of these removes quotes)
      var propLabel = csvHeaders[propIndex].replace(/^"|"$/g,'');;

      rowObject[propLabel] = propValue;
    }
  }

  return csvArray;
}
});