/*

TODO:  change this file to match the new input 

*/

var allText;
var rowNum = -1;

$(document).ready(() => {

    //  get data from text box upon submit and parse through
    $('#submit').click(function() {
        allText = $('#text').val();
        // empty table 
        $('#table').empty();
        $('#table').append('<tr class="titles"><th>Date</th><th>Time (ms)</th><th>Client IP</th>'+
        '<th>HTTP Response</th><th>Bytes</th><th>Method</th><th>URL</th><th>Direct/Via</th>'+
        '<th>Decryption Policy</th><th>Identity</th><th>Access Policy</th><th>Web Category</th>'+
        '<th>Score</th></tr>');
        rowNum = -1;
        parse(allText);
    })

    $('#clear').click(function() {
        $('#table').empty();
    })
})

function makeLogs(allText) {
    var logs = allText.split("> -");
}

//  update table w new data on each loop; recursive
function parse(input) {

    // create new row to use 
    rowNum++;
    $('#table').append('<tr id='+rowNum+'></tr>');

    // base case: end of input
    var pieces = input.split(" ");
    if (pieces[5] == null) {
        return 0;
    }

    // date
    var utcSeconds = pieces[0];
    var d = new Date(0); 
    d.setUTCSeconds(utcSeconds);   

    var thisRow = $('#'+rowNum);
    thisRow.append('<td>'+d+'</td>');

    // time
    thisRow.append('<td>'+pieces[1]+'</td>');

    // client ip
    thisRow.append('<td>'+pieces[2]+'</td>');

    // http response
    thisRow.append('<td>'+pieces[3]+'</td>');

    // bytes
    thisRow.append('<td>'+pieces[4]+'</td>');

    // method
    thisRow.append('<td>'+pieces[5]+'</td>');

    // url
    thisRow.append('<td>'+pieces[6]+'</td>');

    // skip 7

    // direct or via
    thisRow.append('<td>'+pieces[8]+'</td>');

    // skip 9

    // Decryption Policy/Identity/Access Policy:  split by dashes within; 
        // first chunk can be ignored if there’s a decrypt; 2 then name of decrypt; 
        // 3 then id; ignore; ignore; ignore; 7 access policy name; ignore (may disappear?)  
    var decryptChunks = pieces[10].split("-");

    thisRow.append('<td>'+decryptChunks[1]+'</td>');    
    thisRow.append('<td>'+decryptChunks[2]+'</td>');    
    thisRow.append('<td>'+decryptChunks[6]+'</td>');    

    var otherChunks = pieces[11].split(",");
    var web = otherChunks[0].replace("<", "");
    thisRow.append('<td>'+web+'</td>');    
    thisRow.append('<td>'+otherChunks[1]+'</td>');    

    // OR split by the last piece (wont work for all data heck) 
    leftovers = input.split("> -");
    console.log(input);

    // make sure to add the other stuff at the end! 
    var fixed = input.substr(leftovers[0].length+3);
    if (fixed!=null) {
        parse(fixed);
    }

}