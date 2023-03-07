AFRAME.registerComponent("create-buttons", {
    init:function(){
        //1. create the button
        var button1=document.createElement("button");
        button1.innerHTML="Rate Us";
        button1.setAttribute("id", "rating-button");
        button1.setAttribute("class", "btn btn-warning");
        //2. Create the second button
        var button2=document.createElement("button");
        button2.innerHTML="Order Now";
        button2.setAttribute("id", "order-button");
        button2.setAttribute("class", "btn btn-warning");


        var buttonDiv=document.getElementById("button-div");
        buttonDiv.appendChild(button1);
        buttonDiv.appendChild(button2);
    }
})