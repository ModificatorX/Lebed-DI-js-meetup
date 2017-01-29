var str="";
var request = require('request');
url='https://api.meetup.com/2/open_events?&sign=true&photo-host=public&lat=34&topic=softwaredev&lon=-118&radius=20&page=20&key=274a4d7c770f6f3772592a40694c';
var fs=require('fs');
fs.writeFileSync("meet.html", "ds<!DOCTYPE HTML><html><head><style>body{background:grey;}a:visited{color: blue;}div{font-family:Arial;border:solid;border-radius:10px;background:white;margin-bottom:10px;box-shadow: 0 0 20px rgba(0,0,0,0.5);}header{margin:-20px;vertical-align:middle;text-align:center;font-size:150%;color:red;}h1{: center;}</style></head><body><header><h1>There is a list of occasions for a week</h1></header>");
j=0;
request(url, function(err,res,body)
    {
        if (err) {
            throw err;
        }
        else {
			var DayLong = 86400000;
			var starts = (new Date()).setHours(0, 0, 0, 0) + 43200000;
			var events = (JSON.parse(body))[results];
			while (j<7)
			{
				if 	(j==0)
				{
					fs.writeFileSync("meet.html", "<h1 align='center'>Monday</h1>");
				}
				else if (j==1)
				{
					fs.writeFileSync("meet.html", "<h1 align='center'>Tuesday</h1>");
				}
				else if (j==2)
				{
					fs.writeFileSync("meet.html", "<h1 align='center'>Wednesday</h1>");
				}
				else if (j==3)
				{
					fs.writeFileSync("meet.html", "<h1 align='center'>Thursday</h1>");
				}
				else if (j==4)
				{
					fs.writeFileSync("meet.html", "<h1 align='center'>Friday</h1>");
				}
				else if (j==5)
				{
					fs.writeFileSync("meet.html", "<h1 align='center'>Saturday</h1>");
				}
				else if (j==6)
				{
					fs.writeFileSync("meet.html", "<h1 align='center'>Sunday</h1>");
				}
				for (var i in events) {
				var eDate = new Date((events[i])["time"]);
				if (eDate > starts && eDate < starts + DayLong) {
					str+="<div>";
					str += "<b>Name: </b>" + (events[i])["name"] + "<br>";
					if ("venue" in events[i]) {
					str += "<b>Address: </b>" + ((events[i])["venue"])["address_1"] + "<br>";
					}
					str += "<b>Time: </b>" + (eDate.toTimeString()).substring(0,5) + " PM<br>";
					if ("description" in events[i]) {
					str +="<details><summary><b>Description</b></summary><p>" + (events[i])["description"] + "</p></details>";
					}
					str += "<br>";
					str+="</div>";
				}
			}
			fs.writeFileSync("meet.html",str);
			str="";
			starts += DayLong;
		
				j++;
				
			}
			
		}	
		
	})
fs.writeFileSync("meet.html", "</body></html>");	

	
