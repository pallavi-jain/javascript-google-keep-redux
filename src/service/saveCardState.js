import $ from 'jquery';

/**
 * Adds two numbers together.
 * @param {int} id The first number.
 * @param {object} card/Info The second number.
 * @returns {object} The sum of the two numbers.
 */

export function saveCardState(id, cardInfo) {

    const type = "PUT",
     url = `http://localhost:3000/lists/${id}`;

    $.ajax({
        url,
        type,
        "data": JSON.stringify(cardInfo),
        "headers": {
            "content-type": "application/json"  
          },
        "success"() {
        // Write your code here
        
        }
});      
}