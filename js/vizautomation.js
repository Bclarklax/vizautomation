/***************************************************************************
* vizautomation.js
* @author: jordan sutton <https://twitter.com/jsutCodes>
* @author: Brian Clark   <https://behance.net/bclarkdesign/>
* @desc:    
*       - Code to automate the viz tool used at fox news 
***************************************************************************/
//Globals
var recordArr = [];
const QUEUE_PAGE = "html/http_10.133.23.20_queue.php.html"; 
const HOME_PAGE = "html/http_10.133.23.20_";


function recordDATA(id, href, show, deadline, title, requester, keyword) {
    this.id = id,
    this.href = href,

    this.show = show,
    this.deadline = deadline,
    this.title = title,
    this.requester = requester,
    this.keyword = keyword
};



//main:
GET_QUEUE_DATA(function() {

    for (var i = recordArr.length - 1; i >= 0; i--) {

        GET_REQUEST_DATA(recordArr[i]);

    }
    for (var i = recordArr.length - 1; i >= 0; i--) {

        PROCESS_REQUEST(recordArr[i]);

    }
});






/***************************************************************************
* GET_QUEUE_DATA: 
* @desc:    Get request sent out to collect pending viz requests 
* @returns: void -- (puts requests on html page)   
***************************************************************************/
function GET_QUEUE_DATA ( _callback) {
    $(document).ready(function(){
        $.get( QUEUE_PAGE , function(data, status){
            var records = $($(data)[9].children[1].children[3]).find('.unclaimedurgent');
            parseVizRequest(records);



            //document.getElementById("queue").innerHTML = recordArr;
            _callback();

        }, "html");

    });
} 
/***************************************************************************
* GET_REQUEST_DATA: 
* @desc:    process the individual request data 
* @returns: 
***************************************************************************/
function GET_REQUEST_DATA (record_data) {
    $(document).ready(function(){
        $.get( record_data.href, function(data, status){
            console.log("STATUS: " + status);
            //TODO: 
            // we need to actually process the data here now 

        }, "html")
          .done(function() {
            console.log( "success for: "+ record_data.href );
          })
          .fail(function() {
            console.log( "error for: " + record_data.href);
          });
        VizTable.push(record_data);

    });
} 
/***************************************************************************
* PROCESS_REQUEST: 
* @desc:    using CLI creates the image needed to do the work
* @returns: a finished templated image 
***************************************************************************/
function PROCESS_REQUEST (request) {
    // step 3 in read me 
    // TODO: ...

    //VizTable.handleRequest(request.id);
}




//=====================================helpers=================================
function processRequestPage( page_data ) {
    // may need to pass in recordData
    // 1. read the table from request page 
    // 2. do the work to automate the request (using gimp CLI)
    // may need semi automation, where some things neeed to be aproved before being sent off
    VizTable.push(page_data);
}

function parseVizRequest(records) {

    for (var i = records.length - 1; i >= 0; i--) {

        var id = $(records[i].innerHTML)[10].innerHTML;
        var show = $(records[i].innerHTML)[0].innerHTML;
        var deadline = $(records[i].innerHTML)[2].innerHTML;
        var title = $(records[i].innerHTML)[4].innerHTML;
        var requester = $(records[i].innerHTML)[8].innerHTML;
        var keyword = $(records[i].innerHTML)[14].innerHTML;

        var href = encodeURIComponent(HOME_PAGE+extractHREF( $(records[i]).attr('onclick') ));

        recordArr[i] = new recordDATA(id, href, show, deadline, title, requester, keyword);
    }
    return recordArr;
}

function extractHREF(string) {

   return string.substring( string.indexOf("\'")+1, string.lastIndexOf("\'"))+ ".html";

}

// class for visualation of viz automation
class VizTable {

    static push( entry ) {
        var table = document.getElementById("vizTable");
        var row = table.insertRow(-1);

        for (var i = 0; i < 5; i++) {
            var cell = row.insertCell(i);

            switch(i) {
                case 0:
                cell.innerHTML = entry.id;
                break;
                case 1:
                cell.innerHTML = entry.title;
                break; 
                case 2:
                cell.innerHTML = entry.deadline;
                break;
                case 3:
                cell.innerHTML = entry.requester;
                break; 
                case 4:
                cell.innerHTML = "Pending";
                break;
                default:
                console.log("Index Error in VizTable.push().");
                break;
            }
        }

    }
    static pop() {
        var table = document.getElementById("vizTable");
        table.deleteRow(-1);
    }
    static handleRequest(RID) {
        var table = document.getElementById("vizTable");

            for (var i = 0; i < table.rows.length; i++) {
            if(table.rows[i].cells[0].innerHTML == RID)
                table.rows[i].cells[4].innerHTML = "PROCESSING";
        }
    }
}



