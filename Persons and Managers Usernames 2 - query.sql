WITH
PersonsInvolved
AS (SELECT
        
		rec.recid,
	eiddl1.VSTRING_15 AS parent,
	eiddl1.VSTRING_3 as Veiemployeename,
	eiddl1.VSTRING_24 as Veimailusername,


	eiddl1.VSTRING_21 as Veimanager,
	eiddl1.STRING_21 as Heimanagerr,
		
		eiddl1.STRING_21 AS Heimanager
    FROM DAT_RECORD rec
        JOIN DAT_DATA_LRG eiddl1
            ON eiddl1.CTXTYPE = rec.CTXTYPE
               AND eiddl1.CTXID = rec.CTXID
               AND eiddl1.RECID = rec.RECID
    WHERE rec.CTXTYPE = 2500
          AND rec.CTXTKN = 'INCIDENT_PARTICIPANT'
          AND eiddl1.BATCH = 1
          AND eiddl1.FGTOKEN = 'INFO'
          AND rec.IS_DELETED = 0
          AND rec.TID = 100844
          AND eiddl1.VSTRING_15 = 1871323


),

ManageEmployees
AS (


   SELECT
       
	   edddl1.VSTRING_10 as Vedemailaddress,
	   edddl1.VSTRING_2 as Vedemployeeid

   FROM DAT_RECORD rec
       JOIN DAT_DATA_LRG edddl1
           ON edddl1.CTXTYPE = rec.CTXTYPE
              AND edddl1.CTXID = rec.CTXID
              AND edddl1.RECID = rec.RECID
   WHERE rec.CTXTYPE = 2500
         AND rec.CTXTKN = 'EMPLOYEES'
         AND edddl1.BATCH = 1
         AND edddl1.FGTOKEN = 'DTL'
		 AND rec.IS_DELETED = 0
		 AND rec.TID = 100844
		 
		 )



SELECT *
FROM PersonsInvolved JOIN ManageEmployees ON ManageEmployees.Vedemployeeid = PersonsInvolved.Heimanager

