
var PeriodType = rec.get('RECV.DTL.REPORTING_PERIOD_TYPE');
log.println('Period type = ' + PeriodType);

var PerformanceTarget = rec.get('RECV.DTL.PERFORMANCE_TARGET');
log.println('Performance target = ' + PerformanceTarget);

var TargetValueInPeriodType = rec.field('RECV.DTL.TARGET_VALUE_IN_PERIOD_TYPE');

if (PeriodType == 'Annual'){
    TargetValueInPeriodType.set(PerformanceTarget/12,PerformanceTarget/12)
}

else if (PeriodType == 'Quarterly'){
    TargetValueInPeriodType.set(PerformanceTarget/3,PerformanceTarget/3)
}

else if (PeriodType == 'Monthly'){
    TargetValueInPeriodType.set(PerformanceTarget,PerformanceTarget)
}

else if (PeriodType == 'Ongoing'){
    TargetValueInPeriodType.set(PerformanceTarget,PerformanceTarget)
}