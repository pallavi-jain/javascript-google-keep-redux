var $ = require('jquery');
export function saveCardState(id, cardInfo){

    var url = "http://localhost:3000/lists/"+id,
    type = "PUT"
    $.ajax({
        url: url,
        type: type,
        data: JSON.stringify(cardInfo),
        headers: {
            "content-type": "application/json"  
          },
        success: function(result) {
        //Write your code here
        
        }
});      
}