AFRAME.registerComponent("markerhandler", {
    init: async function(){
        this.el.addEventListener("markerFound", ()=>{
            console.log("marker is found");
            this.handleMarkerFound();
        });

        this.el.addEventListener("markerLost", ()=>{
            console.log("marker is lost");
            
        })
    },
    handleMarkerFound:function(){
        //changing button div visibility
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";
        var orderButton = document.getElementById("order-button");
        var RateButton = document.getElementById("rating-button");

        //Handling Click Events
        orderButton.addEventListener("click", ()=>{
            swal({
                icon:"https:?/i.imgur.com/4NZ6uLY.jpg",
                title:"Thanks for Order!",
                text:"",
                timer:3000,
                buttons:false
            });
        });

        RateButton.addEventListener("click", ()=>{
            swal({
                icon:"warning",
                title:"Order Summary",
                text:"Work In Progress"
            });
        });
    },
    handleMarkerLost:function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display="none"
    },
    getAllRobots: async function(){
        return await firebase
        .firestore()
        .collection("robots")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
        });
    },
    handleOrder:function(uid, robot){
        //Reading current UID order details
        firebase.firestore().collection("users").doc(uid).get().then(doc => {
            var details = doc.data();

            if(details["current_orders"][robot.id]){
                //Increasing Current Quatity
                details["current_orders"][robot.id]["quantity"] += 1;

                //Calculating Subtotal of item
                var currentQuantity = details["current_orders"][robot.id]["quantity"];
                
                details["current_orders"[robot.id]]["sub_total"] = 
                currentQuantity * robot.price;
            } else {
                details["current_orders"][robot.id]["subtotal"] = {
                    item: robot.robot_name,
                    price:robot.price,
                    quantity: 1,
                    subtotal: robot.price
                };
            }

            details.total_bill += robot.price;

            //Updating DB

            firebase.firestore().collection("users").doc(doc.id).update(details);
        });
    },
})