// an attempt to reduce redundant calls
function TargetGroupCache(targetCollection, systemParameters) {

    let groupCache = null,
        groupCacheCount = 0;

    const getGroup = function(bees) {

        if(groupCache == null || groupCacheCount > systemParameters.cacheLoops) {
            groupCache = targetCollection.groupBees(bees);
            groupCacheCount = 0;
        }
        else {
            groupCacheCount++;
        }

        return groupCache;
    };

    return {
        getGroup: getGroup
    };
}
