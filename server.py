from types import MethodType
from flask import request 
from flask import Flask, render_template
from datetime import datetime, timedelta
import json


app = Flask(__name__)

all = json.load(open("static/all.json"))

@app.route("/")
def index():
    # Request.args.get("http://127.0.0.1:5003/booking.html")
    return render_template("index.html")

@app.route("/data/<mnth>")
def data(mnth):
    # print(mnth)
    [yr,mn] = mnth.split("-")
    first = datetime(year=int(yr), month=int(mn), day=1)
    dopm = first - timedelta(days = first.weekday())
    # print(dopm)
    weeks = []
    for w in range(5):
        week = []
        for i in range(7):
            day = (dopm+timedelta(days=i+7*w)).isoformat()[:10]
            week.append({
                "whn": day,
                "free": sum([x["capacity"]-x["booked"] for x in all if x["whn"].startswith(day)])
            })
        weeks.append(week)
    ret = {
        "month-name":first.strftime("%B"),
        "month-year":f"{yr}",
        "weeks":weeks
    }
    return ret

@app.route("/day/<date>")
def date(date):
    return {"availability":[x for x in all if x['whn'].startswith(date)]}

@app.route("/bookingticket/", methods = ["POST", "GET"])
def bookingTicket():
    date = request.args.get("date")
    time = request.args.get("time")
    day = request.args.get("weekdayval")
    monthname = datetime.strptime(date.split("-")[1], "%m").strftime("%B")

    adultval = request.args.get("adultval")
    childval = request.args.get("childval")
    if adultval == "" or adultval == None:
        adultval = 0
    
    if childval == "" or childval == None:
        childval = 0
    total = int(adultval)+int(childval)
    
    return render_template("booking.html",
    date=date,time=time,day=day,monthname=monthname,
    adultval=adultval,childval=childval,total=total)

app.run(debug=True, port=5571)
# important   :::   change your port number to => 5571