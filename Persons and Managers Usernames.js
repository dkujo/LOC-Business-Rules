var recid = rec.id();
log.println("this record ID is: " + recid);

// qurey to extract Person(s) Involved (child record) USERNAMES from Report an Incident (parent)
var query =
  " SELECT eiddl1.VSTRING_24 " +
  " FROM DAT_RECORD rec JOIN DAT_DATA_LRG eiddl1 " +
  " ON eiddl1.CTXTYPE = rec.CTXTYPE AND eiddl1.CTXID = rec.CTXID AND eiddl1.RECID = rec.RECID " +
  " WHERE rec.CTXTYPE = 2500 AND rec.CTXTKN = 'INCIDENT_PARTICIPANT' AND eiddl1.BATCH = 1 " +
  " AND eiddl1.FGTOKEN = 'INFO'AND rec.IS_DELETED = 0 AND rec.tid = {TEN.TID} AND eiddl1.VSTRING_15 = {REC.ID} ";

var queryRes = db.sql(query).result();

var usernames = "";

if (queryRes.data().size() > 0) {
  for (var i = 0; i < queryRes.data().size(); i++) {
    var username = queryRes.cell(0, i);
    if (usernames !== "") {
      usernames += ", ";
    }
    usernames += username;
  }
}

log.println("Person involved Usernames are: " + usernames);

rec.set("RECV.FORM.PERSONS_INVOLVED_USERNAMES", usernames, usernames);

// query to extract Person(s) Involved (child record) MANAGERS (hidden recid) from Report an Incident (parent) and their USERNAMES
var queryManagers =
  " SELECT eiddl1.STRING_21 " +
  " FROM DAT_RECORD rec JOIN DAT_DATA_LRG eiddl1 " +
  " ON eiddl1.CTXTYPE = rec.CTXTYPE AND eiddl1.CTXID = rec.CTXID AND eiddl1.RECID = rec.RECID " +
  " WHERE rec.CTXTYPE = 2500 AND rec.CTXTKN = 'INCIDENT_PARTICIPANT' AND eiddl1.BATCH = 1 " +
  " AND eiddl1.FGTOKEN = 'INFO'AND rec.IS_DELETED = 0 AND rec.tid = {TEN.TID} AND eiddl1.VSTRING_15 = {REC.ID} ";

var queryManagersRes = db.sql(queryManagers).result();

var managerUsernames = "";

if (queryManagersRes.data().size() > 0) {
  for (var i = 0; i < queryManagersRes.data().size(); i++) {
    var hiddenEmployeeRecord = queryManagersRes.cell(0, i);

    if (
      hiddenEmployeeRecord !== "" &&
      hiddenEmployeeRecord !== null &&
      hiddenEmployeeRecord != undefined
    ) {
      var manageEmployeeRecord = ctx.record(hiddenEmployeeRecord);
      var employeeEmailUsername = manageEmployeeRecord.get(
        "RECV.DTL.EMAIL_ADDRESS"
      );
      
      
      
      
      
      
      //log.println("Managers managerUsernames = " + employeeEmailUsername);

      if (managerUsernames !== "") {
        managerUsernames += ", ";
      }
      managerUsernames += employeeEmailUsername;
    }
  }
}

log.println("Manager Usernames are: " + managerUsernames);

