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

rec.set("RECV.INVES.LP_USER_ID", employeeEmailUsername, employeeEmailUsername);
