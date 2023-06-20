var EHSOIElementType = rec.get('RECV.DTL.EHSOI_ELEMENT_TYPE');
log.println('EHSOI Element Type = ' + EHSOIElementType);

var EHSOIElement = rec.get('RECV.DTL.EHSOI_ELEMENT');
log.println('EHSOI Element = ' + EHSOIElement);


if(EHSOIElementType.toLowerCase() == 'pro-active index element' && 

(EHSOIElement == 'First Aid Cases' || EHSOIElement == 'Job Transfer and Restriction Cases' 
 || EHSOIElement == 'Lost Time Incident Cases' || EHSOIElement == 'Recordable Cases'
 || EHSOIElement == 'Severity Rate, A, B, C all Categories (avg)' || EHSOIElement == 'Severity Rate, A, B, C all Categories (max)')) {
	
    rec.field('RECV.DTL.EHSOI_ELEMENT').clear();
}

else if(EHSOIElementType.toLowerCase() == 're-active index element' && 

(EHSOIElement == 'Action Items Completion' || EHSOIElement == 'Hazard IDs' 
 || EHSOIElement == 'Inspection' || EHSOIElement == 'Other (describe)'
 || EHSOIElement == 'Report of Near Miss' || EHSOIElement == 'Safety Committee Meetings'
 || EHSOIElement == 'Safety Committee Meetings with Manager Participation' || EHSOIElement == 'Safety Observation' || EHSOIElement == 'Training')) {
	
    rec.field('RECV.DTL.EHSOI_ELEMENT').clear();
}