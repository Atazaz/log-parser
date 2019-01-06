/*

at top of the file in comments:  
  Product: VALUE
  Model Number: VALUE
  Version: VALUE
  Serial Number: VALUE
  Read in first 8 features; one row for each 

  out of interface_name>Management</interface_name> pull the ip right below it
    maybe get it out of the correct parent object
*/

var allText;
var xml;

$(document).ready(() => {

    //  get data from text box upon submit and parse through
    $('#submit').click(function() {
        allText = $('#text').val();
        // empty table 
        $('#table').empty();
        $('#table').append('<tr class="titles"> <th>Management IP</th> <th>DNS IP</th><th>Product</th> <th>Model Number</th>'+ 
        '<th>Version</th> <th>Serial Number</th> <th>Features</th>  </tr>');

         var file = document.getElementById('file').files[0];
         if (file) {
             // create reader
             var reader = new FileReader();
             reader.readAsText(file);
             reader.onload = function(e) {
                 // browser completed reading file
                //allText = document.createTextNode(e.target.result);
                allText = e.target.result;

               // $('body').append(allText); 

                xml = $.parseXML(e.target.result);

                parse(allText, xml);
             };

         }
    })

    $('#clear').click(function() {
        $('#table').empty();
    })
})


/// update table one time
function parse(txt, xml) {
    // txt is the raw text file, not newlines
    // xml is the jquery object from .parseXML; can find tags etc. 

    // create new row to use 
    $('#table').append('<tr id='+1+'></tr>');
    var thisRow = $('#'+1);

// management ip (using xml) 
    var interface_name = $(xml).find('interface_name');
    var interface_legit;
    for (let i = 0; i < interface_name.length; i++) {
        if ($(interface_name[i]).text() == "Management") {
            interface_legit = interface_name[i];
            break;
        }
    }
    // go to parent and find ip  
    var ip = $(interface_legit).parent().find("ip");
    var ipData = $(ip).text();
    thisRow.append('<td>'+ipData+'</td>');

// dns ip
    var dns_ip = $(xml).find("dns_ip");
    //console.log(dns_ip);
    thisRow.append('<td>'+$(dns_ip[0]).text()+', '+$(dns_ip[1]).text()+'</td>');

// SET UP PARSING FOR TXT 
    var textArray = txt.split("<!--");
    var secondArray = textArray[1].split("-->")
    var comment = secondArray[0];

    var pieces = comment.split(":");

// product 
    // 'model number' is the ending piece to chop
    var firstChunk = pieces[1];
    var firstChunkSplit = firstChunk.split(" ");
    var product = "";

    let i = 1;
    while (firstChunkSplit[i] != "") {
        product += firstChunkSplit[i] + " ";
        i++;
    }

    thisRow.append('<td>'+product+'</td>');

// model number
    // has 'version' as ending piece
    firstChunk = pieces[2];
    firstChunkSplit = firstChunk.split(" ");
    var model = "";
    i = 1;
    while (firstChunkSplit[i] != "") {
        model += firstChunkSplit[i] + " ";
        i++;
    }
    thisRow.append('<td>'+model+'</td>');

// version
    firstChunk = pieces[3];
    firstChunkSplit = firstChunk.split(" ");
    var version = "";
    i = 1;
    while (firstChunkSplit[i] != "") {
        version += firstChunkSplit[i] + " ";
        i++;
    }
    thisRow.append('<td>'+version+'</td>');

// serial number
    firstChunk = pieces[4];
    firstChunkSplit = firstChunk.split(" ");
    var serial = "";
    i = 1;
    while (firstChunkSplit[i] != "") {
        serial += firstChunkSplit[i] + " ";
        i++;
    }
    thisRow.append('<td>'+serial+'</td>');

// features (8, one per line)
    var diffSplit = comment.split('\n');
    // 8 - 15 are the lines i want! 
    var allFeatures = "";
    for (let j = 8; j < 16; j++) {
        allFeatures += diffSplit[j] + '\n';
    }
    thisRow.append('<td id="features">'+allFeatures+'</td>');

    // ADD YOUR OWN STUFF HERE 

}

// table header maker helper
function addHeader(title) {
    $('.titles').append('<th>'+title+'</th>');
}

// SAMPLE CODES

    // getting first instance of a tag
/*
var dns_ip = $(xml).find("dns_ip");
console.log(dns_ip.length);
thisRow.append('<td>'+dns_ip[0].text());
*/