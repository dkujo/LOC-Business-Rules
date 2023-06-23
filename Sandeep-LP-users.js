var dob = rec.field("RECV.DTL.DATE_OF_BIRTH");
var uid = tok.eval("{USR.ID}");
log.println(uid);
var query = " select uid from sec_user su  " +
      " where su.uid = :userid " +
      " and exists ( select uid   " +
      " from  SEC_USER_GROUP sg join SEC_GROUP gr on sg.gid = gr.GID and sg.TID = gr.TID  " +
      " where  gr.NAME = 'Incident Administrator'  " +
      " and sg.uid = su.uid)  " ;
var queryRes = db.sql(query).add_long("userid", uid).limit(1).result(); 
if (queryRes.size() > 0) {
	dob.visible();
	dob.editable();
}