const $ = require('jquery');

export function addCardData(cardObj, callback, id) {


    let type = "POST",
     url = "http://localhost:3000/lists";

    if (id) {
        url = `http://localhost:3000/lists/${id}`;
        type = "PATCH";
    }

    $.ajax({
        url,
        type,
        "data": JSON.stringify({"card": cardObj}),
        // DataType: "json",
        "headers": {
            "content-type": "application/json"
           
            
          },
        "success"(result) {
        // Write your code here
        callback(result);
        }
});      
}

export function deleteCardData(callback, id) {
    let type = 'DELETE',
     url = `http://localhost:3000/lists/${id}`;

    $.ajax({
        url,
        type,
        
        // DataType: "json",
        "headers": {
            "content-type": "application/json"
           
            
          },
        "success"(result) {
        // Write your code here
        callback(result);
        }
});     
}