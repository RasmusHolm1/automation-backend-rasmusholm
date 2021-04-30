import * as roomHelpers from '../helpers/roomHelpers'
import * as clientHelpers from '../helpers/clientHelpers'

describe('testing auth', function(){
    it('01. Create a new room', function(){
        roomHelpers.createRoomRequest(cy)
    })

    it('02. Get all rooms', function(){
        roomHelpers.getAllRoomsRequest(cy)
    })

    it('03. Edit client', function(){
        clientHelpers.EditClientRequest(cy)
    })

    it('04. Delete client', function(){
        clientHelpers.deleteClientRequest(cy)
        //deleteRequestAfterCreateRoomRequest(cy)
        //(createAndDeleteClientRequest)
    })

})