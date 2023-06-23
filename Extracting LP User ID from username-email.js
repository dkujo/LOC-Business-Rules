// get Person Responsible hidden value (it points so Manage Employee record)
var hiddenEmployeeRecord = rec
  .field("RECV.INVES.PERSON_RESPONSIBLE_FOR_CORRECTIVE_ACTION")
  .hvalue(0);

log.println("Employee hidden value = " + hiddenEmployeeRecord);

if (
  hiddenEmployeeRecord !== "" &&
  hiddenEmployeeRecord !== null &&
  hiddenEmployeeRecord != undefined
) {
  var manageEmployeeRecord = ctx.record(hiddenEmployeeRecord);
  var employeeEmailUsername = manageEmployeeRecord.get("RECV.DTL.EMAIL_ADDRESS");
  log.println("employee email / LP username = " + employeeEmailUsername);
}

//pull user ID from SEC_USER table
var query = " select UID from SEC_USER where USERNAME = :emailUsername ";
var queryRes = db
  .sql(query)
  .add_string("emailUsername", employeeEmailUsername)
  .limit(1)
  .result();

if (queryRes.rc() == 1 && queryRes.size() > 0) {
  var employeeUID = queryRes.cell(0, 0);
}

log.println("employee UID: " + employeeUID);

rec.set("RECV.INVES.LP_USER_ID", employeeUID, employeeUID);
