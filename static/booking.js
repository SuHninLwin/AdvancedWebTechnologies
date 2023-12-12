document.getElementById("confirmbtn").onmouseover = () => {
    document.getElementById("confirmbtn").innerText = "Thank You"; 
    document.getElementById("confirmbtn").style.fontSize = "12px";
}

document.getElementById("confirmbtn").onmouseout = () => {
    document.getElementById("confirmbtn").innerText = "Confirm"; 
    document.getElementById("confirmbtn").style.fontSize = "15px";
}

document.getElementById("cancelbtn").onmouseover = () => {
    document.getElementById("cancelbtn").innerText = "Go Back"; 
    document.getElementById("cancelbtn").style.fontSize = "12px";
}

document.getElementById("cancelbtn").onmouseout = () => {
    document.getElementById("cancelbtn").innerText = "Cancel"; 
    document.getElementById("cancelbtn").style.fontSize = "15px";
}

function confirmFunction(){
    let date = document.getElementById("date").innerText;
    let time = document.getElementById("time").innerText;
    let day = document.getElementById("day").innerText;
    let child = document.getElementById("child").innerText;
    let adult = document.getElementById("adult").innerText;
    let backtickettext = document.getElementById("backtickettext").innerText;

    document.getElementById("sub-title").innerText = "Thank You For Having A Tour With Us!"
    let rowtable = document.getElementById("row-table");
    rowtable.style.backgroundColor = "transparent";

    let flipdiv = document.createElement("div");
    flipdiv.setAttribute("class", "flip");
    flipdiv.style.margin = "auto";

    let flipinner = document.createElement("div");
    flipinner.setAttribute("class", "flip__inner");

    let ticketdiv = document.createElement("div");
    ticketdiv.setAttribute("class", "ticket");

    let backticketdiv = document.createElement("div");
    backticketdiv.setAttribute("class", "back-ticket");

    let backticketptag = document.createElement("p");
    backticketptag.innerText = backtickettext;
    backticketptag.style.fontSize = "20px";

    let ticketheader = document.createElement("div");
    ticketheader.setAttribute("class", "ticket__header");
    ticketheader.innerText = "Harry Potter Experience";

    let ticketptag = document.createElement("p");
    ticketptag.setAttribute("class", "ticket__heading");
    ticketptag.innerText = `Adult: ${adult} | Child: ${child}`;

    let ticketdetailsdiv = document.createElement("div");
    ticketdetailsdiv.setAttribute("class", "ticket__details");

    let firstticketdetaildiv = document.createElement("div");
    firstticketdetaildiv.setAttribute("class", "ticket__detail");

    let secondticketdetaildiv = document.createElement("div");
    secondticketdetaildiv.setAttribute("class", "ticket__detail");

    let datediv = document.createElement("div");
    datediv.innerText = "Date";

    let datevaldiv = document.createElement("div");
    datevaldiv.innerText = date;

    let timediv = document.createElement("div");
    timediv.innerText = "Time";

    let timevaldiv = document.createElement("div");
    timevaldiv.innerText = `${time} (${day.slice(0,3)})`;

    secondticketdetaildiv.append(timediv);
    secondticketdetaildiv.append(timevaldiv);
    
    firstticketdetaildiv.append(datediv);
    firstticketdetaildiv.append(datevaldiv);
    
    ticketdetailsdiv.append(firstticketdetaildiv);
    ticketdetailsdiv.append(secondticketdetaildiv);

    backticketdiv.append(backticketptag);

    ticketdiv.append(ticketheader);
    ticketdiv.append(ticketptag);
    ticketdiv.append(ticketdetailsdiv);
    
    flipinner.append(ticketdiv);
    flipinner.append(backticketdiv);

    flipdiv.append(flipinner);
    rowtable.innerText = "";
    rowtable.append(flipdiv);
    
    document.getElementById("row-table").style.border = "none";
    document.getElementById("confirmbtn").style.display = "none";
    document.getElementById("cancelbtn").style.display = "none";
    let homebtn = document.createElement("button");
    homebtn.innerText = "Done"
    homebtn.setAttribute("onClick", "redirectIndexFunction()")
    document.getElementById("btns").append(homebtn);

    homebtn.onmouseover = () => {
        homebtn.innerText = "Exit Page";
        homebtn.style.fontSize = "12px";
    }
    homebtn.onmouseout = () => {
        homebtn.innerText = "Done";
        homebtn.style.fontSize = "15px";
    }
}

function redirectIndexFunction(){
    window.location.replace("/");
}

function cancelFunction(){
    window.location.replace("/");
}