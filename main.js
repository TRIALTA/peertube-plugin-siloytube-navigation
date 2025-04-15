const USER_ROLE_ADMIN = 0;
const USER_ROLE_MOD = 1;
const USER_ROLE_USER = 2;

async function register ({
        registerHook,
        getRouter,
        peertubeHelpers
    }) {
    const logger = peertubeHelpers.logger;

    // API MIDDLEWARE
    const checkRoles = async (req, res, next) => {
        const user = await peertubeHelpers.user.getAuthUser(res);

        if(user.role !== USER_ROLE_ADMIN && user.role !== USER_ROLE_MOD) {
            res.json({ error: 'Not authenticated'});
            return;
        }

        next();
    };
}

async function unregister () {
    return undefined;
}

module.exports = {
    register,
    unregister
}
