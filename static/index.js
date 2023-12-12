function fillCalendarWithMonth(year,month){
    fetch(`data/${year}-${month}`)
    .then(r=>r.json())
    .then(r=>{
        document.getElementById("month-name").innerText=r["month-name"];
        document.getElementById("month-year").innerText=r["month-year"];
        
        document.getElementById("next").onclick = () => {
            if(month<12){
                fillCalendarWithMonth(year, month+1);
            }
            else{
                fillCalendarWithMonth(year+1, 1);
            }
        };
        document.getElementById("prev").onclick = () => {
            if(month>1){
                fillCalendarWithMonth(year, month-1);
            }
            else{
                fillCalendarWithMonth(year-1, 12);
            }
        };
        document.getElementById("up-arrow").onclick = () => {
            if(month<12){
                fillCalendarWithMonth(year, month+1);
            }
            else{
                fillCalendarWithMonth(year+1, 1);
            }
        };
        document.getElementById("down-arrow").onclick = () => {
            if(month>1){
                fillCalendarWithMonth(year, month-1);
            }
            else{
                fillCalendarWithMonth(year-1, 12);
            }
        };

        let dropdowndiv = document.createElement("div");
        dropdowndiv.setAttribute("id", "dropdownbtn");
        dropdowndiv.classList.add("dropdowndiv");
        dropdowndiv.style.display = "none";
        // dropdowndiv.classList.add("dropdown-content");
        dropdowndiv.setAttribute("class", "dropdown-content");

        let todaydate = new Date();
        let thismomth = todaydate.getMonth()+1;
        // console.log(thismomth);
        let yeararr = [2021];
        for(let i=0; i<yeararr.length; i++){
            let innertag = document.createElement("div");
            innertag.setAttribute("id", "yeardiv");
            innertag.classList.add("yeardiv")
            innertag.style.display = "block";
            innertag.style.fontSize = "20px";
            innertag.style.textAlign = "right";
            innertag.style.fontWeight = "normal";
            innertag.innerText = yeararr[i];
            dropdowndiv.append(innertag);
            innertag.onclick = () => {
                fillCalendarWithMonth(yeararr[i], thismomth);
            }
        }   
        document.getElementById("month-year").append(dropdowndiv);

        var dropdown = document.querySelectorAll('.dropdownbtn');
        dropdown.onclick

        // document.getElementById("yeardiv").onclick = () => {
        //     fillCalendarWithMonth(2021,01);
        // };
       
        let monthdropdowndiv = document.createElement("div");
        monthdropdowndiv.setAttribute("id", "monthdropdownbtn");
        monthdropdowndiv.style.display = "none";
        monthdropdowndiv.setAttribute("class", "dropdown-content");

        let thisyear = todaydate.getFullYear();
        // console.log(thisyear);
        let monthlist = new Array(13);
        for(let month=1; month<monthlist.length; month++){
            // console.log(month);
            let monthinnertag = document.createElement("div");
            monthinnertag.setAttribute("id", "monthdiv");
            monthinnertag.style.display = "block";
            monthinnertag.style.fontSize = "20px";
            monthinnertag.style.textAlign = "right";
            monthinnertag.style.fontWeight = "normal";
            let monthname = new Date(0000, month, 00).toLocaleString('en-us', { month: 'long' });
            monthinnertag.innerHTML = `${monthname}`;
            monthdropdowndiv.append(monthinnertag);
            monthinnertag.onclick = () => {
                fillCalendarWithMonth(thisyear, month);
            }
        }
        document.getElementById("month-name").append(monthdropdowndiv);


        // let choosedropdown = document.createElement("a");
        // choosedropdown.setAttribute("id", "selecttag")
        // choosedropdown.innerHTML = `2025`;
        // dropdowndiv.append(choosedropdown);

        // let seldiv = document.createElement("div");
        // seldiv.setAttribute("id", "seldiv");
        // seldiv.setAttribute("class", "dropdown-menu");
        // seldiv.setAttribute("aria-labelledby", "dropdownMenuButton");
        // document.getElementById("month-name").onclick = () => {
        //     if(seldiv.style.display === "none"){
        //         let monthlist = new Array(13);
        //         for(let month=1; month<monthlist.length; month++){
        //             // console.log(month);
        //             let eachmonth = document.createElement("div");
        //             eachmonth.setAttribute("id", "option-month");
        //             eachmonth.setAttribute("class", "dropdown-item");
        //             let monthname = new Date(0000, month, 00).toLocaleString('en-us', { month: 'long' });
        //             eachmonth.innerHTML = `${monthname}`;
        //             seldiv.append(eachmonth);
        //         } 
        //         seldiv.style.display = "block";
        //         document.getElementById("month-name").appendChild(seldiv);
        //     }
        //     else{
        //         seldiv.style.display === "none"
        //     }
        // }
        // document.getElementById("month-name").append(seldiv);

        document.querySelectorAll("tr").forEach(tr => {tr.remove()})
        document.getElementById("plan").innerHTML = `
        <tr>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THUR</th>
            <th>FRI</th>
            <th>SAT</th>
            <th>SUN</th>
        </tr>`

        // const count = {};
        // let elelist = [];
        // for(let w of r.weeks){
        //     for(let day of w){
        //         elelist.push(String(day["whn"].split("-")[1]));
        //     }
        // }
        // elelist.forEach(function (x) { count[x] = (count[x] || 0) + 1; });
        // let keys = Object.keys(count);
        // console.log(keys);
        // for(let samemonth of keys){
        //     if(samemonth != month){
        //         console.log(samemonth);
        //     }
        // }

        for(let w of r.weeks){
            let tr = document.createElement("tr");
            for (let day of w){
                let td = document.createElement("td");
                // td.setAttribute("id", "tddiv")
                td.innerText = day.whn.split("-")[2];

                if(String(day["whn"].split("-")[1]) != month){
                    // console.log(String(day["whn"].split("-")[1]))
                    td.style.backgroundColor = "lightgrey";
                    td.style.color = "grey";
                    td.classList.add("calendar-format");
                }
                else if (day.free === 0){
                    td.classList.add("fully-booked");
                }
                else{
                    td.onmouseover = () => {
                        td.style.backgroundColor = "lightblue";
                        if(day.free == 1){
                            td.innerText = `Only ${day.free} ticket available`;
                        }
                        else{
                            td.innerText = `${day.free} tickets available`;
                        }
                        
                        td.style.fontSize = "13px";
                        td.style.color = "rgb(0, 0, 65)";
                    }
                    td.onmouseout = () => {
                        td.style.backgroundColor = "rgb(0, 0, 65)";
                        td.innerText = day.whn.split("-")[2];
                        td.style.fontSize = "20px";
                        td.style.color = "white";
                    }
                    // td.removeAttribute("class");

                    td.onclick = ()=> {
                        // const date = new Date(day.whn).toUTCString();
                        // let dateformat = date.split(" ").slice(0, 4).join(" ");
                        let dateelements = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
                        let dateformat = new Date(day.whn).toLocaleString('en-us', dateelements);
                        // console.log(new Date(day.whn).toUTCString().split("00:00:00 GMT")[0]);
                        document.getElementById("day").innerHTML = `<div style="font-size: 25px; margin-left: 10px;">${dateformat}</div>`;
                        
                        // let inputdiv = document.createElement("form");
                        // inputdiv.setAttribute("id", "inputdiv");
                        // inputdiv.setAttribute("name", "inputform");
                        // // inputdiv.setAttribute("action", "");
                        // inputdiv.setAttribute("method", "GET");
                        // // inputdiv.setAttribute("class", "row");

                        // let rowdivinput = document.createElement("div");
                        // rowdivinput.setAttribute("class", "row")

                        // let leftcolinput = document.createElement("div");
                        // leftcolinput.setAttribute("id", "leftcolinput");
                        // leftcolinput.setAttribute("class", "form-group col-sm-6");

                        // let textadult = document.createElement("label");
                        // textadult.setAttribute("id", "textadult");
                        // textadult.setAttribute("for", "inputadult");
                        // textadult.innerText = "For Adults";
                        // leftcolinput.append(textadult);
                        // let inputadult = document.createElement("input");
                        // inputadult.required = true;
                        // inputadult.setAttribute("id", "inputadult");
                        // inputadult.setAttribute("class", "form-control input-sm");
                        // inputadult.setAttribute("type", "number");
                        // inputadult.setAttribute("min", "0");
                        // inputadult.setAttribute("max", "4");
                        // inputadult.setAttribute("name", "adult");
                        // inputadult.setAttribute("placeholder", "Enter number of adult...")
                        // leftcolinput.append(inputadult);

                        // let rightcolinput = document.createElement("div");
                        // rightcolinput.setAttribute("id", "rightcolinput")
                        // rightcolinput.setAttribute("class", "form-group col-sm-6");
                        // let textchild = document.createElement("label");
                        // textchild.setAttribute("id", "textchild");
                        // textchild.setAttribute("for", "inputchild");
                        // textchild.innerText = "For Children";
                        // rightcolinput.append(textchild);
                        // let inputchild = document.createElement("input");
                        // inputchild.required = true;
                        // inputchild.setAttribute("id", "inputchild");
                        // inputchild.setAttribute("class", "form-control input-sm");
                        // inputchild.setAttribute("type", "number");
                        // inputchild.setAttribute("min", "0");
                        // inputchild.setAttribute("max", "4");
                        // inputchild.setAttribute("name", "child");
                        // inputchild.setAttribute("placeholder", "Enter number of child...")
                        // rightcolinput.append(inputchild);

                        // rowdivinput.append(leftcolinput);
                        // rowdivinput.append(rightcolinput);

                        // inputdiv.append(rowdivinput);
                        // document.getElementById("day").append(inputdiv);

                        fetch(`day/${day.whn}`)
                            .then(r=>r.json())
                            .then(r=>{
                                if(day.free !== 0){
                                    let availblock = document.querySelector(".day-onclick");
                                    if(availblock){
                                        availblock.classList.remove("day-onclick");
                                    };
                                    td.classList.add("day-onclick");
                                }

                                // let div = document.createElement("div");
                                // div.innerHTML = JSON.stringify(r["availability"]);
                                // document.getElementById("day").append(div); 

                                let arr = r["availability"];
                                for(let i =0; i<arr.length; i++){
                                    // console.log(arr[i]["whn"]);
                                    let div = document.createElement("div");
                                    div.setAttribute("id", "rows-div")
                                    // div.style.backgroundColor = "pink";
                                    // div.setAttribute("class", "row");

                                    let timediv = document.createElement("span");
                                    // timediv.style.backgroundColor = "red";
                                    timediv.setAttribute("id", "fc-date");
                                    // timediv.setAttribute("class", "col-sm-4");
                                    // div.innerHTML = JSON.stringify(arr[i]["whn"].slice(11, 16));
                                    timediv.innerHTML = arr[i]["whn"].slice(11, 16);
                                    // console.log(arr[i]["whn"].slice(11, 16));
                                    // document.getElementById("day").append(div); 

                                    let availdiv = document.createElement("span");
                                    // availdiv.style.backgroundColor = "lightblue";
                                    availdiv.setAttribute("id", "sc-avail");
                                    // availdiv.setAttribute("class", "col-sm-4");
                                    availdiv.innerHTML = "Available";
                                    // document.getElementById("day").append(availdiv);

                                    availdiv.onmouseover = () => {
                                        let leftticket = parseInt(arr[i]["capacity"])-parseInt(arr[i]["booked"]);
                                        if(leftticket == 0){
                                            availdiv.innerText = `All tickets sold out`;
                                        }
                                        else if(leftticket == 1){
                                            availdiv.innerText = `Only ${leftticket} ticket available`;
                                        }
                                        else{
                                            availdiv.innerText = `${leftticket} tickets available`;
                                        }
                                        availdiv.style.fontSize = "18px";
                                        availdiv.style.color = "white";
                                        availdiv.style.width = "auto";
                                        availdiv.style.color = "rgb(95, 186, 211)";
                                        availdiv.style.fontStyle = "italic";
                                    }
                                    availdiv.onmouseout = () => {
                                        availdiv.style.backgroundColor = "transparent";
                                        availdiv.innerText = "Available";
                                        availdiv.style.fontSize = "25px";
                                        availdiv.style.color = "rgb(95, 186, 211)";
                                        availdiv.style.fontStyle = "normal";
                                    }
                                    
                                    let seldiv = document.createElement("button");
                                    // seldiv.style.backgroundColor = "lightgreen";
                                    seldiv.setAttribute("id", "tc-select");
                                    seldiv.innerText = "SELECT";

                                    // console.log(arr[i]["whn"].split("T")[1])
                                    // console.log(arr[i]["whn"].split("T")[1].slice(0, 5))

                                    seldiv.onclick = () => {

                                        let bookedval = arr[i]["booked"];
                                        let capacityval = arr[i]["capacity"];
                                        let datetimeval = arr[i]["whn"];

                                        let date = datetimeval.split("T")[0];
                                        let time = datetimeval.split("T")[1].slice(0,5);

                                        let weekdayval = new Date(day.whn).toLocaleString('en-us', {weekday: "long"});

                                        let adultval = document.getElementById("inputadult").value;
                                        let childval = document.getElementById("inputchild").value;

                                        // window.location.replace("/bookingticket/?datetime="+datetimeval+"&adultval="+adultval+"&childval="+childval);
                                        if(parseInt(adultval) < 0 || parseInt(childval) < 0){
                                            alert("Pls do not enter minus number!");
                                        }
                                        else if(adultval == "" && childval == ""){
                                            alert("Pls fill for both adult and child.");
                                        }
                                        else if(parseInt(adultval)+parseInt(bookedval) > parseInt(capacityval)){
                                            alert("Sorry! You've exceeded the available booking for day-time: " +datetimeval.split("T")[0]+" - "+datetimeval.split("T")[1]+".");
                                        }
                                        else if(parseInt(childval)+parseInt(bookedval) > parseInt(capacityval)){
                                            alert("Sorry! You've exceeded the available booking for day-time: " +datetimeval.split("T")[0]+" - "+datetimeval.split("T")[1]+".");
                                        }
                                        else if(parseInt(adultval) + parseInt(childval) + parseInt(bookedval) > parseInt(capacityval)){
                                            alert("Sorry! You've exceeded the available booking for day-time: " +datetimeval.split("T")[0]+" - "+datetimeval.split("T")[1]+".");
                                        }
                                        else{
                                            window.location.replace("/bookingticket/?date="+date+
                                            "&weekdayval="+weekdayval+"&time="+time+"&adultval="+
                                            adultval+"&childval="+childval);
                                        }
                                    }

                                    // seldiv.setAttribute("type", "submit");
                                    // seldiv.setAttribute("value", "SELECT");
                                    // seldiv.setAttribute("onClick", location.href="booking.html");
                                    
                                    // seldiv.onclick = () => {
                                    //     // console.log(arr[i]["whn"]);
                                    //     let hiddenspan = document.createElement("input");
                                    //     hiddenspan.setAttribute("id", "dateTtime");
                                    //     hiddenspan.setAttribute("name", "whn");
                                    //     hiddenspan.setAttribute("value", arr[i]["whn"]);
                                    //     hiddenspan.setAttribute("type", "hidden");
                                    //     div.append(hiddenspan);
                                        
                                    //     let datetimeval = document.inputform.whn.value;
                                    //     let adultval = document.inputform.adult.value;
                                    //     let childval = document.inputform.child.value;
                                        
                                    //     // window.location.replace("/bookingticket/?datetime="+datetimeval+"&adultval="+adultval+"&childval="+childval);
                                    //     // window.location.replace("/bookingticket/?datetime="+datetime+"&adult="+adultval+"&child="+childval)
                                    
                                    //     redirectRoute(datetimeval, adultval, childval);
                                    // }
                                    
                                    // seldiv.setAttribute("class", "col-sm-4");
                                    // document.getElementById("day").append(seldiv);
                                    // console.log(arr[i]["whn"].slice(11, 16));

                                    div.appendChild(timediv);
                                    div.appendChild(availdiv);
                                    div.appendChild(seldiv);

                                    // inputdiv.append(div);
                                    document.getElementById("day").append(div);
                                }
                            })
                            // document.getElementById("day").append(div);
                            // td.classList.toggle("day-onclick");
                    }
                }
                tr.append(td);
            }
            document.getElementById("plan").append(tr);
        }
    })
}

fillCalendarWithMonth(2021,10);

function yearDropDownFunction(){
    var x = document.getElementById("dropdownbtn");
    if (x.style.display === "none"){
    x.style.display = "block";
    } 
    else{
      x.style.display = "none";
    }
}

function monthDropDownFunction(){
    var x = document.getElementById("monthdropdownbtn");
    if (x.style.display === "none"){
    x.style.display = "block";
    }
    else{
      x.style.display = "none";
    }
}

function closeFunction(){
    window.location.replace("/");
}