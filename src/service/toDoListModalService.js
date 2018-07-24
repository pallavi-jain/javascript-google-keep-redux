var $ = require('jquery');

export function addCardData(cardObj, callback,id){


    var url = "http://localhost:3000/lists";
    var type = "POST";
    if(id){
        url = "http://localhost:3000/lists/"+id;
        type = "PATCH"
    }

    $.ajax({
        url: url,
        type: type,
        data: JSON.stringify({"card": cardObj}),
        //dataType: "json",
        headers: {
            "content-type": "application/json"
           
            
          },
        success: function(result) {
        //Write your code here
        callback(result);
        }
});      
}

export function deleteCardData(callback, id){
    var type = 'DELETE';
    var url = "http://localhost:3000/lists/"+id;
    $.ajax({
        url: url,
        type: type,
        
        //dataType: "json",
        headers: {
            "content-type": "application/json"
           
            
          },
        success: function(result) {
        //Write your code here
        callback(result);
        }
});     
}
