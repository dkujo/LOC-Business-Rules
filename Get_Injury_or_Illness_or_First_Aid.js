var emprecid = rec.field('RECV.DTL.EMPLOYEE').get();


// check emprecid
if(emprecid != null && emprecid !=''){
	emprecid = rec.field('RECV.DTL.EMPLOYEE').hvalue(0);
var res = db.sql(" select edddl1.number_1 as typeid,edddl1.vnumber_1 as type " +
" from Dat_Record rec, Dat_Data_Lrg edddl1 " +
		" where rec.ctxtype = 2500 and rec.ctxtkn = 'INCIDENT_PARTICIPANT' " +
			" and edddl1.ctxtype = rec.ctxtype and edddl1.ctxid = rec.ctxid " +
			" and edddl1.fgtoken = 'INFO' and edddl1.batch = 1 " +
			" and edddl1.recid = rec.recid " +
			" and rec.recid=:RecordID ")
        .add_int('RecordID',emprecid)
	.limit(1)
	.result();
log.println(res.cell(0,0));
log.println(res.cell(1,0));
rec.set("RECV.DTL.INJURY_ILLNESS", res.cell(0,0),res.cell(1,0));

}