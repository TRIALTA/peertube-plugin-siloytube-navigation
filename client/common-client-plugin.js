async function register({ registerHook, peertubeHelpers }) {
  console.log("[peertube-plugin-siloytube-navigation] Initializing Hooks");

  const disallowedPathsForNormalUsers = [
      '/home',
      '/videos/overview',
      '/videos/subscriptions',
      '/videos/browse',
      '/c/',
      '/my-account/import-export',
      '/my-account/applications'
  ];

  registerHook({
    target: 'action:router.navigation-end',
    handler: async({path}) => {
      const user = peertubeHelpers.getUser();
      const isLoggedIn = peertubeHelpers.isLoggedIn();
      const isInternalUser = isLoggedIn && user?.role?.id !== 2;

      if(!isLoggedIn) {
        if(!path.includes("/login") && !path.includes("/signup")) {
          window.location.href = "/login";
        }
        return;
      }

      if(!isInternalUser) {
        disallowedPathsForNormalUsers.forEach(disallowedPath => {
          console.log(path);
          if (path.includes(disallowedPath)) {
            window.location.href = "/my-library/videos";
          }
        });
        return;
      }

      if(isInternalUser) {
        setInterval(() => {
          document.querySelector("#typeahead-container").style.display = "block";
        }, 150);
      }
    }
  });

  registerHook({
    target: 'filter:left-menu.links.create.result',
    handler: async (items) => {
      const user = peertubeHelpers.getUser();
      const isLoggedIn = peertubeHelpers.isLoggedIn();
      const isInternalUser = isLoggedIn && user?.role?.id !== 2;

      return isInternalUser ? items : [];
    }
  });
}

export {
  register
}