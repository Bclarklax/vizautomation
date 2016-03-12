
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

            document.getElementById("queue").innerHTML = recordArr;

        }, "html");
    });
} 





//=====================================helpers=================================
function parseVizRequest(records) {

    for (var i = records.length - 1; i >= 0; i--) {

        recordArr[i] = records[i].innerHTML;
    }
    return recordArr;
}



