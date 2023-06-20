if (
    actualCompletionDate !== "" &&
    actualCompletionDate !== null &&
    actualCompletionDate != undefined &&
    dateRecordCreatedQuery.rc() == 1
  ) {
    // create date objects
    var actualCompletionDateObj = new Date(actualCompletionDate);
    var dateRecordCreatedObj = new Date(dateRecordCreated);
  
    // calculate difference in days
    var differenceInDays = Math.floor(
      (actualCompletionDateObj - dateRecordCreatedObj) / (1000 * 60 * 60 * 24)
    );
    log.println("difference in days = " + differenceInDays);
  }