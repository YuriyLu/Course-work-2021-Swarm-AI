// an attempt to reduce redundant calls
function TargetGroupCache(targetCollection) {

    let groupCache = null,
        groupCacheCount = 0;

    const getGroup = function(bees) {

        if(groupCache == null || groupCacheCount > CACHE_LOOPS) {
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
