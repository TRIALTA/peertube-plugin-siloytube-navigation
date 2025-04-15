async function register({ registerHook, peertubeHelpers }) {
  console.log("[peertube-plugin-siloytube-navigation] Initializing");

  /*
  if(window.location.href.includes("/videos/browse") || window.location.href.includes("/videos/subscriptions")) {
    window.location.href = "/my-library/videos";
  } */

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

      if(isInternalUser) {
        return;
      }

      if(!isLoggedIn) {
        if(!path.includes("/login") && !path.includes("/signup")) {
          window.location.href = "/login";
        }
        return;
      }

      disallowedPathsForNormalUsers.forEach(disallowedPath => {
        console.log(path);
        if(path.includes(disallowedPath)) {
          window.location.href = "/my-library/videos";
        }
      });

      if(isInternalUser) {
        setInterval(() => {
          console.log("Enabling Search");
          document.querySelector("#typeahead-container").style.display = "block";
        }, 200);
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