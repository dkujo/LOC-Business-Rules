var recid = rec.id();
log.println("this record ID is: " + recid);

// qurey to extract Person(s) Involved USERNAMES (through hidden recid)
var queryPeople =
  " SELECT eiddl1.VSTRING_24 " +
  " FROM DAT_RECORD rec JOIN DAT_DATA_LRG eiddl1 " +
  " ON eiddl1.CTXTYPE = rec.CTXTYPE AND eiddl1.CTXID = rec.CTXID AND eiddl1.RECID = rec.RECID " +
  " WHERE rec.CTXTYPE = 2500 AND rec.CTXTKN = 'INCIDENT_PARTICIPANT' AND eiddl1.BATCH = 1 " +
  " AND eiddl1.FGTOKEN = 'INFO'AND rec.IS_DELETED = 0 AND rec.tid = {TEN.TID} AND eiddl1.VSTRING_15 = {REC.ID} ";

var queryPeopleRes = db.sql(queryPeople).result();

var peopleUsernames = "";

if (queryPeopleRes.data().size() > 0) {
  for (var i = 0; i < queryPeopleRes.data().size(); i++) {
    var username = queryPeopleRes.cell(0, i);
    if (peopleUsernames !== "") {
      peopleUsernames += ", ";
    }
    peopleUsernames += username;
  }
}

log.println("Person involved Usernames are: " + peopleUsernames);
rec.set("RECV.FORM.PERSONS_INVOLVED_USERNAMES", peopleUsernames, peopleUsernames);

// query to extract managers USERNAMES (through hidden employee ID) from Person(s) Involved
var queryManagers =
" WITH " +
" PersonsInvolved " +
" AS (SELECT eiddl1.STRING_21 AS Heimanager " +
" FROM DAT_RECORD rec " +
" JOIN DAT_DATA_LRG eiddl1 " +
" ON eiddl1.CTXTYPE = rec.CTXTYPE " +
" AND eiddl1.CTXID = rec.CTXID " +
" AND eiddl1.RECID = rec.RECID " +
" WHERE rec.CTXTYPE = 2500 " +
" AND rec.CTXTKN = 'INCIDENT_PARTICIPANT' " +
" AND eiddl1.BATCH = 1 " +
" AND eiddl1.FGTOKEN = 'INFO' " +
" AND rec.IS_DELETED = 0 " +
" AND rec.TID = {TEN.TID} AND eiddl1.VSTRING_15 = {REC.ID}), " +
" ManageEmployees " +
" AS (SELECT " +
" edddl1.VSTRING_2 AS Vedemployeeid, " +
" edddl1.VSTRING_10 AS Vedemailaddress " +
" FROM DAT_RECORD rec " +
" JOIN DAT_DATA_LRG edddl1 " +
" ON edddl1.CTXTYPE = rec.CTXTYPE " +
" AND edddl1.CTXID = rec.CTXID " +
" AND edddl1.RECID = rec.RECID " +
" WHERE rec.CTXTYPE = 2500 " +
" AND rec.CTXTKN = 'EMPLOYEES' " +
" AND edddl1.BATCH = 1 " +
" AND edddl1.FGTOKEN = 'DTL' " +
" AND rec.IS_DELETED = 0 " +
" AND rec.TID = {TEN.TID}) " +
" SELECT ManageEmployees.Vedemailaddress " +
" FROM PersonsInvolved " +
" JOIN ManageEmployees " +
" ON ManageEmployees.Vedemployeeid = PersonsInvolved.Heimanager ";

var queryManagersRes = db.sql(queryManagers).result();

var managerUsernames = "";

if (queryManagersRes.data().size() > 0) {
  for (var i = 0; i < queryManagersRes.data().size(); i++) {
    var username = queryManagersRes.cell(0, i);
    if (managerUsernames !== "") {
      managerUsernames += ", ";
    }
    managerUsernames += username;
  }
}

log.println("Manager Usernames are: " + managerUsernames);
rec.set("RECV.FORM.MANAGERS_USERNAMES", managerUsernames, managerUsernames);
