var $ = require('jquery');
export function saveCardState(id, cardInfo){

    var url = "http://localhost:3000/lists/"+id,
    type = "PUT"
    $.ajax({
        url: url,
        type: type,
        data: JSON.stringify(cardInfo),
        //dataType: "json",
        headers: {
            "content-type": "application/json"
           
            
          },
        // beforeSend: function(x) {
        //   if (x && x.overrideMimeType) {
        //     x.overrideMimeType("application/j-son;charset=UTF-8");
        //   }
        // },
        success: function(result) {
        //Write your code here
        
        }
});      
}