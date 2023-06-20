var laborYear = rec.get("RECV.DTL.YEAR");
var laborMonth = rec.field("RECV.DTL.MONTH").hvalue(0);
var totalMonthlyHrs = 0;

var emp_cont_HrsEntered = rec.get("RECV.DTL.TOTAL_MONTHLY_EMPLOYEE_HOURS_WORKED");
var emp_cont_HrsAPI = rec.get("RECV.DTL.API_TOTAL_MONTHLY_EMPLOYEE_HOURS_WORKED");

if(emp_cont_HrsEntered !== '' && emp_cont_HrsEntered !== null && emp_cont_HrsEntered !== undefined) {
	totalMonthlyHrs = emp_cont_HrsEntered;
}
else if(emp_cont_HrsAPI !== '' && emp_cont_HrsAPI !== null && emp_cont_HrsAPI !== undefined) {
	totalMonthlyHrs = emp_cont_HrsAPI;
} 

log.println("Labor Hours print detail==" + laborYear + "==" + laborMonth + "==" + totalMonthlyHrs);

if(laborYear !== '' && laborMonth !== '' && totalMonthlyHrs !== '') {	
	laborMonth = parseInt(laborMonth, 10);
	if((laborMonth % 3) == 0) {
		var startMonth = laborMonth - 2;
		var endMonth = laborMonth - 1;

		var res = db.sql(
			" SELECT ddl.VNUMBER_1, sum(ddl.DECIMAL_10) FROM "
			+ "DAT_RECORD rec, DAT_DATA_LRG ddl where "
			+ "rec.ctxtype = 2500 and rec.ctxtkn = 'LABOR_HOURS' "
			+ "and ddl.ctxtype = rec.ctxtype and ddl.ctxid = rec.ctxid "
			+ "and ddl.FGTOKEN = 'DTL' and ddl.batch = 1 "
			+ "and ddl.recid = rec.recid and rec.state < 3 "
			+ "and rec.TID = ddl.TID and rec.TID = :tenantid "
			+ "and ddl.VNUMBER_1 = :laborYear  and ddl.NUMBER_2 BETWEEN :startMonth and :endMonth " 
			+ "GROUP BY ddl.VNUMBER_1 ")
			.add_long("tenantid", "{TEN.ID}")
			.add_long("laborYear", laborYear)
			.add_int("startMonth", startMonth)
			.add_int("endMonth", endMonth)
			.result();
		
		var quarterlyTotal = 0;
		if (res.rc() == 1 && res.size() > 0) {
			var quarterlyTotal = res.data().get(0)[1];
		}
		log.println("Total Quarterly Labor Hours==" + (parseInt(quarterlyTotal, 10) + parseInt(totalMonthlyHrs, 10)));

		rec.set("RECV.DTL.TOTAL_QUARTERLY_HOURS_WORKED", (parseInt(quarterlyTotal, 10) + parseInt(totalMonthlyHrs, 10)));
	}
}