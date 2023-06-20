var IRec = ctx.new_record("REPORT_INCIDENT");
var BRecID = tok.eval("{REC.ID}");

IRec.set("RECV.FORM.INITIAL_INCIDENT_FORM_ID", BRecID, BRecID);
IRec.set("RECV.FORM.INCIDENT_CLASSIFICATION", null, "Undetermined");

var SCATCat = rec.field("RECV.DTL.SCAT_CATEGORY");
IRec.set("RECV.FORM.FACILITY__TO", SCATCat.hvalue(0), SCATCat.vvalue(0));

var IncFac = rec.field("RECV.DTL.INCIDENT_FACILITY");
IRec.set("RECV.FORM.FACILITY__TO", IncFac.hvalue(0), IncFac.vvalue(0));

var PV = rec.field("RECV.DTL.PERSONS_INVOLVED").vvalue();
var PH = rec.field("RECV.DTL.PERSONS_INVOLVED").hvalue();
var ArrV = [];
var ArrH = [];
for (var i = 0; i < PV.length; i++) {
  var sV = String(PV[i]);
  var sH = String(PH[i]);
  ArrV.push(sV);
  ArrH.push(sH);
}
IRec.set("RECV.FORM.PERSONS_INVOLVED_INCIDENT", ArrH, ArrV);

var incFac = rec.field("RECV.DTL.FACILITY_IDENTIFIER").get();
IRec.set("RECV.FORM.FACILITY_IDENTIFIER", incFac, incFac);

var dept = rec.field("RECV.DTL.DEPARTMENT_REPORTED_TO");
IRec.set("RECV.FORM.DEPARTMENT_REPORTED_TO", dept.hvalue(0), dept.vvalue(0));

var incDate = rec.field("RECV.DTL.INCIDENT_DATE").hvalue(0);
IRec.set("RECV.FORM.INCDATE", incDate, incDate);

var incTime = rec.field("RECV.DTL.INCIDENT_TIME").hvalue(0);
IRec.set("RECV.FORM.INCTIME", incTime, incTime);

var incDateText = rec.field("RECV.DTL.INCIDENT_DATE_TEXT").get();
IRec.set("RECV.FORM.INCIDENT_DATE_TEXT", incDateText, incDateText);

var incDescription = rec.field("RECV.DTL.EVENT_DESCRIPTION").get();
IRec.set("RECV.FORM.DESCRIPTION_OF_INCIDENT", incDescription);

var reportedDate = rec.field("RECV.DTL.DATE_REPORTED").hvalue(0);
IRec.set("RECV.FORM.DATE_OF_NOTIFICATION", reportedDate, reportedDate);

var repotedTo = rec.field("RECV.DTL.REPORT_TO_WHOM_NAME");
IRec.set(
  "RECV.FORM.COMPANY_PERSONNEL_NOTIFIED_OF_INCIDENT",
  repotedTo.hvalue(0),
  repotedTo.vvalue(0)
);

IRec = ctx.insert(IRec);
var resultData = [];
resultData[0] = IRec.id();
out.scope().add(0, resultData);
