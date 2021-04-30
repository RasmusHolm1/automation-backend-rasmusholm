const ENDPOINT_GET_ROOMS ='http://localhost:3000/api/rooms'
const ENDPOINT_POST_ROOMS ='http://localhost:3000/api/room/new'


function createRandomRoomPayload(){
    const fakecategory = ["twin"]
    const fakefloor = Math.floor(Math.random()*10)+1
    const fakenumber= (fakefloor*100)+(Math.floor(Math.random()*10)+1)
    const available = Math.random()<0.5
    const fakeprice = (Math.floor(Math.random()*10)+1)*1000
    const features = ["penthouse"]

    const payload = {
        "category":fakecategory, 
        "number": fakenumber,
        "floor":fakefloor, 
        "available":available,
        "price":fakeprice,
        "features":features
    }
    return payload
}
function getAllRoomsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            expect(response.status).to.eq(200)
        }))
    }))
}
function getAllRoomsRequestWithAssertion(cy, number, features, floor, price){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(features)
            expect(responseAsString).to.have.string(number)
            expect(responseAsString).to.have.string(floor)
            expect(responseAsString).to.have.string(price)
        }))
    }))
}
function createRoomRequest(cy){
    cy.authenticateSession().then((response =>{
        let randomRoomPayload = createRandomRoomPayload()
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOMS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: randomRoomPayload
        }).then((response =>{
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(randomRoomPayload.number)
        }))
        getAllRoomsRequestWithAssertion(cy, randomRoomPayload.number, randomRoomPayload.features, randomRoomPayload.floor, randomRoomPayload.price)
    }))
}

module.exports ={
    getAllRoomsRequest,
    createRoomRequest,
    
}