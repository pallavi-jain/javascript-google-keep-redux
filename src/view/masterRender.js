export const todo = (itemIndex, taskItem) => `<li class="mb-2 ml-4" id="li_${itemIndex}">
<div class="row">
    <div id="task_${itemIndex}" class="task col-sm-11 modalInput">
        <span>${taskItem}</span></div>
    <div class='col-sm-1 pl-0'>
        <button id="removeBtn_${itemIndex}" type="button" class="btn btn-primary btn-sm deleteItem"> X </button></div>
    </div>
</li>`;

export function todoEdit(id_suffix, taskItem, isChecked = '', dateAttr) { 
    return `<li class="mb-2 ml-4" id="li_${id_suffix}" data-createDate="${dateAttr}">
                            <div class="row">
                                <div class="col-md-11">
                                    <input type="checkbox" id="check_${id_suffix}" ${isChecked} class="form-check-input mt-3 checkboxPopup">
                                        <input id="input_${id_suffix}" class="form-control modalInput" type="text" value="${taskItem}"></div>
                                <div class="col-md-1 pl-0"><button id="removeBtn_${id_suffix}" type="button" class="btn btn-primary btn-sm deleteItem"> X </button>
                            </div></div>
                            </li>`;
}

export const cardHeader = (name, cardId) => `<div class="container">
    <div class="row">
        <div class="col-md-9">
            <h5>${name}</h5>
        </div>
        <div class="col-md-3">
            <a role="button" class="btn pl-0 pr-0" aria-label="edit" id="card-edit_${cardId}">
                <i class="far fa-edit"></i></a>
            <a role="button" class="btn pl-0 pr-0" aria-label="delete" id="card-delete_${cardId}">
                <i class="fas fa-trash-alt"></i></a>
        </div>
    </div>
    </div>`;

export const addCardModal = () => ` <div class="modal fade" id="addListCardModal" tabindex="-1" role="dialog" aria-labelledby="addListCardModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addListCardModalTitle">to-do List</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                <input id="todoListTitle" class="form-control border-0" type="text" placeholder="Title">
            </div>
                
                <div class="container mt-2">
                    <div class="row">
                        <div class="col-sm-12">
                                <input id="addItem" class="form-control border-0" type="text" placeholder="Add Item">
                        </div>
                        
                    </div>
                </div>

                <div class="mt-3">
                    <hr>
                     <ul id="taskList-ul" class="list-unstyled">
                    </ul> 
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button id="saveCardBtn" type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>`;

export const addOpenConfirmation = () => ` <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirm</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this list?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          <button id="deleteConfirmbtn" type="button" class="btn btn-primary">Yes</button>
        </div>
      </div>
    </div>
  </div>`;