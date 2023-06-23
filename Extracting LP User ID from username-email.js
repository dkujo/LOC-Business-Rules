var parentRecid = rec.field("RECV.INVES.PARENT_RECID").get();
var incidentRec = ctx.record(parentRecid);

var incID = incidentRec.get("RECV.FORM.INCIDENT_ID");
var scat_desc = incidentRec.get("RECV.FORM.SCAT_INCIDENT_DESCRIPTION");

rec.set("RECV.INVES.INCIDENT_CASE_ID", incID, incID);
rec.set("RECV.INVES.SCAT_INCIDENT_DESCRIPTION", scat_desc, scat_desc);





// get person responsible visible and hidden value 
var employeeNameVisible = rec.field("RECV.INVES.PERSON_RESPONSIBLE_FOR_CORRECTIVE_ACTION").vvalue(0);
var employeeNameHidden = rec.field("RECV.INVES.PERSON_RESPONSIBLE_FOR_CORRECTIVE_ACTION").hvalue(0);

// log these 2 variables for testing purposes
log.println("Employee visible value = " + employeeNameVisible);
log.println("Employee hidden value = " + employeeNameHidden);

// hidden value is referencing employee recid, call it if hidden is not '' / null / undefind



// grab LP username (email) from employee recid


//define query to pull user id from username (email)....use SEC_USER table


// finally set the user id into field in Corrective action entity