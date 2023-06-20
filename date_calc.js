var startDateExist = rec.field("RECV.INFO.LOST_RESTRICTED_DAY_START").get();
var endDateExist = rec.field("RECV.INFO.LOST_RESTRICTED_DAY_END").get();

if(startDateExist != null && startDateExist != "") {

	var startdate = rec.field("RECV.INFO.LOST_RESTRICTED_DAY_START").get_date();
	
	var lostDays = 0;
	rec.set("RECV.INFO.LOST_DAYS","",lostDays);
	rec.set("RECV.INFO.DAYS_RESTRICTED","",lostDays);

	if (endDateExist == null || endDateExist == "") {
		log.println("No End Date");		
		var endDate = ctx.date();
	} 
	else if (endDateExist != null && endDateExist != "") {
		var endDate = rec.field("RECV.INFO.LOST_RESTRICTED_DAY_END").get_date();
	}

	var maxDate = startdate.add(0,0,179,0,0,0,0);

	var startdateObj = new Date(Date.parse(startdate));
	var endDateObj = new Date(Date.parse(endDate));
	
	var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var diffDays = Math.abs((startdateObj.getTime() - endDateObj.getTime()) / (oneDay));

	//lostDays = startdate.dateDiff(endDate,"",2) + 1;
	lostDays = Math.round(diffDays) + 1;

	if(lostDays >= 180) {
		lostDays = 180;
		rec.field('RECV.INFO.CALCULATION_LOST_RESTRICTED_DAY_END').set(maxDate.toString(3));
	}
	else {
		rec.field('RECV.INFO.CALCULATION_LOST_RESTRICTED_DAY_END').set(endDate.toString(3));
	}
	if(lostDays <= 0) {
		lostDays = 0;
	}

	rec.field('RECV.INFO.MAX_LOST_RESTRICTED_END_DAY').set(maxDate.toString(3));

	var subject = "";
	var type = rec.get("RECV.INFO.LOST_TIME_TYPE");

	if(type == 'Lost Day'){
		rec.set("RECV.INFO.LOST_DAYS","",lostDays);
		subject = "Lost Day(s): " + lostDays;
		rec.set("REC.SUBJECT",subject);
	} 
	else if(type == 'Restricted Day') {
		rec.set("RECV.INFO.DAYS_RESTRICTED","",lostDays);
		subject = "Restricted Day(s): " + lostDays;
		rec.set("REC.SUBJECT",subject);
	}
}