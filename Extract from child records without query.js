// NOTE to me: this could be done through SQL query which would extract data from child records, this is second solution, maybe better


var PersonsInvolvedRecids = rec.list("RECV.FORM.PERSONS_INVOLVED").ids();
var ArrSize = PersonsInvolvedRecids.length;

log.println("Number of Persons Involved is =" + ArrSize);

var PersonsInvoledNames = "";

for (var i = 0; i < ArrSize; i++) {
  var PersonRecid = PersonsInvolvedRecids[i];
  log.println("Person Involved record =" + PersonRecid);

  var PersonInvolvedRecord = ctx.record(PersonRecid);
  var PersonName = PersonInvolvedRecord.get("RECV.INFO.NAME_2");

  if (PersonsInvoledNames !== "") {
    PersonsInvoledNames += ", ";
  }
  PersonsInvoledNames += PersonName;
}

log.println("All Persons Involved Names =" + PersonsInvoledNames);
rec.set("RECV.FORM.PERSONS_INVOLVED_INCIDENT", PersonsInvoledNames, PersonsInvoledNames);