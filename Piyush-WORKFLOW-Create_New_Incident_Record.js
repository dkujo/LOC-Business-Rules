var incidentRecord = ctx.new_record("REPORT_INCIDENT");
var basicIncRecID = tok.eval("{REC.ID}");

//for reference
incidentRecord.set("RECV.FORM.INITIAL_INCIDENT_FORM_ID", basicIncRecID, basicIncRecID);
incidentRecord.set('RECV.FORM.INCIDENT_CLASSIFICATION', null, "Undetermined");

var SCATCat = rec.field('RECV.DTL.SCAT_CATEGORY');
incidentRecord.set('RECV.FORM.FACILITY__TO', SCATCat.hvalue(0), SCATCat.vvalue(0));

var incFacility = rec.field('RECV.DTL.INCIDENT_FACILITY');
incidentRecord.set('RECV.FORM.FACILITY__TO', incFacility.hvalue(0), incFacility.vvalue(0));

//Facility Code (use in subject)
var incFacilityCode = rec.field('RECV.DTL.FACILITY_IDENTIFIER').get();
incidentRecord.set('RECV.FORM.FACILITY_IDENTIFIER', incFacilityCode, incFacilityCode);

var dept = rec.field('RECV.DTL.DEPARTMENT_REPORTED_TO');
incidentRecord.set('RECV.FORM.DEPARTMENT_REPORTED_TO', dept.hvalue(0), dept.vvalue(0));

var incDate = rec.field('RECV.DTL.INCIDENT_DATE').hvalue(0);
incidentRecord.set('RECV.FORM.INCDATE', incDate, incDate);

var incTime = rec.field('RECV.DTL.INCIDENT_TIME').hvalue(0);
incidentRecord.set('RECV.FORM.INCTIME', incTime, incTime);

//date Text
var incDateText = rec.field('RECV.DTL.INCIDENT_DATE_TEXT').get();
incidentRecord.set('RECV.FORM.INCIDENT_DATE_TEXT', incDateText, incDateText);

var incDescription = rec.field('RECV.DTL.EVENT_DESCRIPTION').get();
incidentRecord.set('RECV.FORM.DESCRIPTION_OF_INCIDENT', incDescription);

//Date Reported/ Notified Date
var reportedDate = rec.field('RECV.DTL.DATE_REPORTED').hvalue(0);
incidentRecord.set('RECV.FORM.DATE_OF_NOTIFICATION', reportedDate, reportedDate);

var repotedTo = rec.field('RECV.DTL.REPORT_TO_WHOM_NAME');
incidentRecord.set('RECV.FORM.COMPANY_PERSONNEL_NOTIFIED_OF_INCIDENT', repotedTo.hvalue(0), repotedTo.vvalue(0));

//Insert object
incidentRecord = ctx.insert(incidentRecord);

var resultData = [];
resultData[0] = incidentRecord.id(); //new created Incident recID
out.scope().add(0,resultData);