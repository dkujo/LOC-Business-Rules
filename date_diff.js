actualCompletionDate = rec
  .field("RECV.INVES.ACTUAL_COMPLETION_DATE")
  .get_date()
  .toString(6);
log.println("Actual Completion Date = " + actualCompletionDate);
//log.println('actual Completion Date date type = ' + typeof actualCompletionDate);

var recid = rec.id();

// find date when record was created
var dateRecordCreatedQuery = db.sql(
    "SELECT CONVERT(VARCHAR(200), REC.CREATED_DATE, 120) FROM "
    + "DAT_RECORD REC JOIN CFG_FIXED_LIST WFSTAT ON "
    + "WFSTAT.FLID = REC.STATUS_FLID AND WFSTAT.TID = REC.TID "
    + "WHERE REC.CTXTYPE = 2500 AND REC.CTXTKN = 'CORRECTIVE_ACTIONS' "
    + "AND WFSTAT.VTID = 7 AND REC.TID = :tenantTID AND REC.RECID =:RecordID " )
  .add_long("tenantTID", "{TEN.ID}")
  .add_int("RecordID", recid)
  .limit(1)
  .result();

// extract creation date STRING
var dateRecordCreated = dateRecordCreatedQuery.cell(0, 0);
log.println("Date when record was created = " + dateRecordCreated);
//log.println('type of dateRecordCreated = ' + typeof dateRecordCreated)

if (
  actualCompletionDate !== "" &&
  actualCompletionDate !== null &&
  actualCompletionDate != undefined &&
  dateRecordCreatedQuery.rc() == 1
) {
  // create date objects
  var actualCompletionDateObj = new Date(actualCompletionDate);
  
  // for new record
  if (dateRecordCreated == null) {var dateRecordCreatedObj = new Date();}
  // for older records
  else {var dateRecordCreatedObj = new Date(dateRecordCreated);}

  // calculate difference in days
  var differenceInDays = Math.ceil(
    (actualCompletionDateObj - dateRecordCreatedObj) / (1000 * 60 * 60 * 24)
  );
  log.println("difference in days = " + differenceInDays);

  rec.set("RECV.INVES.DURATION_FROM_COMPLETION_TO_REVIEW", differenceInDays, differenceInDays);
}
