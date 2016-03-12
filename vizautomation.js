
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
GET_QUEUE_DATA();







/***************************************************************************
* GET_QUEUE_DATA: 
* @desc:    Get request sent out to collect pending viz requests 
* @returns: void -- (puts requests on html page)   
***************************************************************************/
function GET_QUEUE_DATA () {
    $(document).ready(function(){
        $.get( QUEUE_PAGE , function(data, status){
            var records = $($(data)[9].children[1].children[3]).find('.unclaimedurgent');
            parseVizRequest(records);

            //document.getElementById("queue").innerHTML = recordArr;

        }, "html");

        for (var i = recordArr.length - 1; i >= 0; i--) {

            GET_REQUEST_DATA(recordArr[i]);

        }
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

        }, "html");
    });
} 




//=====================================helpers=================================
function parseVizRequest(records) {

    for (var i = records.length - 1; i >= 0; i--) {

        var id = $(records[i].innerHTML)[10].innerHTML;
        var show = $(records[i].innerHTML)[0].innerHTML;
        var deadline = $(records[i].innerHTML)[2].innerHTML;
        var title = $(records[i].innerHTML)[4].innerHTML;
        var requester = $(records[i].innerHTML)[8].innerHTML;
        var keyword = $(records[i].innerHTML)[14].innerHTML;

        var href = HOME_PAGE+extractHREF( $(records[i]).attr('onclick') ); 

        recordArr[i] = new recordDATA(id, href, show, deadline, title, requester, keyword);
    }
    return recordArr;
}

function extractHREF(string) {

   return string.substring( string.indexOf("\'")+1, string.lastIndexOf("\'"));

}



