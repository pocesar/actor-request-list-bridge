const Apify = require('apify');

const { log } = Apify.utils;

Apify.main(async () => {
    const {
        taskId,
        actorId,
        requestListSources,
        targetStartUrlsProperty,
        extraInput = {},
        useMetamorph = false,
        plainArray = false,
        map,
        filter,
        limit,
    } = await Apify.getInput();

    if (!actorId && !taskId) {
        throw new Error('Need to provide taskId or actorId');
    }

    if (actorId && !useMetamorph) {
        throw new Error('Using actorId needs useMetamorph');
    }

    if (typeof targetStartUrlsProperty !== 'string' && !targetStartUrlsProperty) {
        throw new Error('Required targetStartUrlsProperty needs to be a string');
    }

    const rl = await Apify.openRequestList(null, requestListSources);
    const mapFn = typeof map === 'string' && map ? eval(map) : null;
    const filterFn = typeof filter === 'string' && filter ? eval(filter) : null;
    const sources = [];
    let req;
    let count = 0;

    while (req = await rl.fetchNextRequest()) {
        if (filterFn && !filterFn(req)) {
            continue;
        }

        const mapped = mapFn ? mapFn(req) : req;
        sources.push(plainArray ? mapped.url : mapped);

        if (limit && ++count >= limit) {
            break;
        }
    }

    if (useMetamorph) {
        log.info(`Metamorphing into ${actorId} with ${sources.length} urls`);
        await Apify.metamorph(actorId, {
            ...extraInput,
            [targetStartUrlsProperty]: sources,
        });
    } else {
        log.info(`Starting task ${taskId} with ${sources.length} urls`);

        await Apify.callTask(taskId, {
            ...extraInput,
            [targetStartUrlsProperty]: sources,
        }, { waitSecs: 0 });
    }

    log.info('Done');
});
