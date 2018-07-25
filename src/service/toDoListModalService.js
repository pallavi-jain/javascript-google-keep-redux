import $ from "jquery";

/**
 * Save the card data.
 * @param {object} cardObj The first number.
 * @param {object} callback/Info The second number.
 * @param {int} id sum of the two numbers.
 */
export function addCardData(cardObj, callback, id) {


    let type = "POST",
     url = "http://localhost:3000/lists";

    if (id) {
        type = "PATCH";
        url = `http://localhost:3000/lists/${id}`;
        
    }

    $.ajax({
        url,
        type,
        "data": JSON.stringify({"card": cardObj}),
        // DataType: "json",
        "headers": {
            "content-type": "application/json"
           
            
          },

          /**
         * Success callback.
         * @param {object} result The first number.
         * @param {object} callback/Info The second number.
         * 
         */
        "success"(result) {
        // Write your code here
        callback(result);
        }
});      
}

export function deleteCardData(callback, id) {
    const type = 'DELETE',
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