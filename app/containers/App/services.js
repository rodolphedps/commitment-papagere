const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

const shouldDisplayInstallMessage = isIos() && !isInStandaloneMode();

const AppServices = {
  isIos,
  isInStandaloneMode,
  shouldDisplayInstallMessage
};

export { AppServices };
