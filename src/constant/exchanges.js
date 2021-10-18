import chroma from 'chroma-js';

const getAPIs = (exchange) => ({
  prices: {
    url: `https://${exchange}/api/wallet/binaryoption/prices`,
    method: 'get',
    token: 'accessToken',
  },
  balance: {
    url: `https://${exchange}/api/wallet/binaryoption/spot-balance`,
    method: 'get',
    token: 'accessToken',
  },
  profile: {
    url: `https://${exchange}/api/auth/me/profile`,
    method: 'get',
    token: 'accessToken',
  },
  overview: {
    url: `https://${exchange}/api/wallet/binaryoption/user/overview`,
    method: 'get',
    token: 'accessToken',
  },
  statistics: {
    url: `https://${exchange}/api/wallet/binaryoption/user/bo-statistics`,
    method: 'get',
    token: 'accessToken',
  },
  token: {
    method: 'post',
    url: `https://${exchange}/api/auth/auth/token`,
  },
  bet: {
    method: 'post',
    url: `https://${exchange}/api/wallet/binaryoption/bet`,
    token: 'accessToken',
  },
  transfer: {
    method: 'post',
    url: `https://${exchange}/api/wallet/USDT/transfer`,
    token: 'accessToken',
  },
  transaction: {
    method: 'get',
    url: `https://${exchange}/api/wallet/USDT/transactions?size=10&page=1`,
    token: 'accessToken',
  },
});

export const exchanges = {
  'aresbo.com': {
    logo: 'https://aresbo.com/img/logo-footer.b779160b.svg',
  },
  'binance.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg',
  },
  'bitono.io': {
    logo: 'https://bitono.io/img/logo.56ecf1d6.svg',
  },
  'deniex.com': {
    apis: getAPIs('vista.trade'),
    client_id: 'deniex-web',
    walletLabel: 'usdtAvailableBalance',
    primaryColor: '#2a74f9',
    secondaryColor: '#011022',
    emailInput: 'input[name="email"]',
    logo: 'https://vista.trade/img/logo.878dd9ff.svg',
    contacts: [
      { name: 'Mr Đại Villa', phone: '094 59 222 86' },
      { name: 'Mr Tommy', phone: '039 860 9999' },
    ],
    subscribeAccount: 'AILenThienDang',
    subscribeFee: 59,
  },
  'kitanex.com': {
    logo: 'https://kitanex.com/img/logo.465d0f0c.svg',
  },
  'ladytrade.net': {
    logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjIuMywgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNTMuNCA2Mi43IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNTMuNCA2Mi43OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0U2M0Q4RDt9Cgkuc3Qxe2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAgICA7fQoJLnN0MntmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8ZyBpZD0iR3JvdXBfMjI3NDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05MCAtMjQuNDgpIj4KCTxnIGlkPSJJTUFHRV8yMDIxLTA1LTI5XzEzOjQ2OjI1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5MCAyNC40OCkiPgoJCTxnIGlkPSJfZTYzZDhkZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiPgoJCQk8ZyBpZD0iUGF0aF80ODgyNCI+CgkJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuNCwyLjljMC4xLTEuMSwwLjYtMi4xLDEuNS0yLjljMSwwLjYsMS45LDEuNSwyLjUsMi41QzE1LjMsNCwxNSw1LjksMTUuMSw3LjYKCQkJCQljLTAuMiw0LjcsMC4xLDkuNS0wLjUsMTQuM2MtMC4yLDMuMiwwLDYuNS0wLjQsOS43Yy0wLjQsMywwLDYtMC4zLDljLTAuNCwyLjktMC44LDctMS4yLDkuOWMyLjgsMC4yLDUuNywwLjIsOC41LDAKCQkJCQljMTAuMiwwLDEwLjQsMCwxNS41LDBjMi41LDAuMSw5LjYtMC40LDEwLjIsMS4zYy0wLjYsMS0xLjQsMS45LTIuNywxLjdjLTE0LjcsMC0yOS40LDAtNDQuMiwwYzAtMC41LDAtMS41LDAtMS45CgkJCQkJYzMuMS0yLDctMC4zLDEwLjUtMS4xYzAtMy4zLTAuMi02LjYtMC42LTkuOUM5LjcsMzQuMSw5LjgsMjcuNSw5LjgsMjFjMC0yLjYsMC01LjIsMC4yLTcuOEMxMC40LDkuNywxMCw2LjMsMTAuNCwyLjl6Ii8+CgkJCTwvZz4KCQk8L2c+Cgk8L2c+Cgk8ZyBjbGFzcz0ic3QxIj4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQ3LDY4Yy0xLjEsMS43LTIuMiwzLjItMy41LDQuM2MtMS4zLDEuMS0yLjQsMS43LTMuMywxLjdjLTEuMywwLTEuOS0xLTEuOS0zLjFjMC0yLjgsMC45LTUuMywyLjgtNy40CgkJCWMxLjktMi4xLDQuMS0zLjEsNi42LTMuMWMxLDAsMS44LDAuMSwyLjUsMC40YzAsMC4yLTAuMSwwLjMtMC4xLDAuM2wtMC4yLDAuN2MtMC4xLDAuNS0wLjIsMC44LTAuMiwwLjlsLTAuOSw2LjJsLTAuMSwwLjkKCQkJYy0wLjEsMC45LTAuMiwxLjUtMC4yLDEuOGMwLDAuNCwwLjEsMC42LDAuMywwLjZjMC44LDAsMS42LTAuOSwyLjQtMi42YzAuMywwLjEsMC40LDAuMywwLjQsMC40YzAsMC4zLTAuNCwxLTEuMiwyCgkJCWMtMS4xLDEuMy0yLjEsMi0zLDJjLTAuNywwLTEtMC41LTEtMS40YzAtMC4zLDAtMC43LDAuMS0xLjJsMC4xLTEuMWwwLjItMS4yTDE0Nyw2OHogTTE0Ny44LDYyLjVjLTAuOC0wLjUtMS43LTAuNy0yLjYtMC43CgkJCWMtMS4zLDAtMi40LDAuOC0zLjMsMi40Yy0wLjksMS42LTEuMywzLjYtMS4zLDUuOWMwLDEuMiwwLjQsMS44LDEuMSwxLjhjMC44LDAsMS44LTAuNiwzLTEuOWMxLjYtMS43LDIuNS0zLjcsMi45LTZMMTQ3LjgsNjIuNXoiCgkJCS8+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2Mi40LDYwLjRsMC4xLTEuMmMwLjMtMywxLjQtNS41LDMuMS03LjRjMS43LTIsMy43LTMsNS45LTNjMC41LDAsMSwwLDEuNCwwLjFsLTIsMmMtMC40LTAuMS0xLTAuMi0xLjYtMC4yCgkJCWMtMS40LDAtMi40LDAuNS0zLjEsMS41Yy0wLjcsMS0xLjIsMi42LTEuNCw1bC0xLjMsMTEuN2wtMC4xLDAuOWMtMC4xLDAuOC0wLjEsMS40LTAuMSwxLjdjMCwwLjUsMC4xLDAuNywwLjQsMC43CgkJCWMwLjgsMCwxLjYtMC45LDIuMy0yLjZjMC4zLDAuMSwwLjQsMC4zLDAuNCwwLjRjMCwwLjMtMC40LDEtMS4xLDJjLTEuMSwxLjMtMiwyLTMsMmMtMC43LDAtMS4xLTAuNS0xLjEtMS41CgkJCWMwLTAuNCwwLjEtMS4xLDAuMi0yLjJsMC4xLTEuMmwwLjEtMWMtMC42LDEuNC0xLjcsMi43LTMuMSw0Yy0xLjQsMS4zLTIuNiwxLjktMy41LDEuOWMtMS4zLDAtMi0xLTItMy4xYzAtMi43LDAuOS01LjEsMi43LTcuMwoJCQljMS44LTIuMSwzLjktMy4yLDYuMi0zLjJDMTYyLDYwLjQsMTYyLjIsNjAuNCwxNjIuNCw2MC40eiBNMTYyLjIsNjIuNGMtMC44LTAuNC0xLjUtMC42LTIuMi0wLjZjLTEuNCwwLTIuNSwwLjgtMy40LDIuMwoJCQljLTAuOSwxLjYtMS4zLDMuNi0xLjMsNmMwLDEuMiwwLjQsMS44LDEuMSwxLjhjMC45LDAsMS45LTAuNiwzLTEuOWMxLjUtMS42LDIuNC0zLjYsMi43LTZMMTYyLjIsNjIuNHoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTc4LDY4Yy0wLjksMS43LTEuOSwzLjEtMyw0LjNjLTEsMS4xLTEuOSwxLjctMi41LDEuN2MtMC45LDAtMS40LTAuOS0xLjUtMi44bC0wLjEtMS45bC0wLjItNGwwLTEuMQoJCQljLTAuMS0xLjUtMC40LTIuMy0wLjgtMi4zYy0wLjcsMC0xLjQsMC43LTIuMSwyLjFjLTAuMi0wLjItMC40LTAuMy0wLjQtMC41YzAtMC41LDAuNS0xLjIsMS40LTJjMC45LTAuOCwxLjYtMS4yLDIuMi0xLjIKCQkJYzAuNiwwLDEsMC4zLDEuMiwwLjhjMC4yLDAuNSwwLjQsMS41LDAuNSwyLjlsMC4zLDQuOWMwLjEsMS45LDAuNCwyLjgsMC45LDIuOGMwLjgsMCwxLjctMC45LDIuOC0yLjZjMS4xLTEuNywxLjgtMy40LDIuMi01LjEKCQkJbDAuNS0yLjlsMi41LTAuOWMtMC4zLDAuOC0wLjYsMi4xLTEsMy43bC0xLjksOS40Yy0wLjcsMy43LTEuOSw2LjQtMy40LDguMWMtMi4zLDIuNi01LDMuOS04LDMuOWMtMC42LDAtMS4zLTAuMS0yLjEtMC40bDEuNy0xLjkKCQkJYzAuOSwwLjQsMS44LDAuNiwyLjcsMC42YzEuOSwwLDMuNC0wLjYsNC40LTEuOWMxLTEuMywxLjgtMy42LDIuNC02LjlMMTc4LDY4eiIvPgoJPC9nPgoJPGcgY2xhc3M9InN0MSI+CgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE4Ny43LDYyLjJsLTAuNyw2LjJjLTAuMSwxLjEtMC4yLDEuOS0wLjIsMi41YzAsMS4xLDAuNCwxLjYsMS4xLDEuNmMwLjgsMCwxLjYtMC42LDIuNC0xLjkKCQkJYzAuMSwwLjIsMC4yLDAuMywwLjIsMC41YzAsMC41LTAuNSwxLjEtMS40LDEuOWMtMC45LDAuNy0xLjcsMS4xLTIuNCwxLjFjLTEuMywwLTItMC44LTItMi41YzAtMC42LDAuMS0xLjYsMC4yLTNsMC43LTYuMmgtMi45CgkJCWwxLjYtMS42aDEuNWwwLjMtMi41bDIuMS0wLjdsLTAuMywzLjJoNS45bC0xLjYsMS42SDE4Ny43eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOTgsNjYuMWMyLjEtMy45LDQuMS01LjksNi4xLTUuOWMwLjUsMCwxLDAuMSwxLjYsMC40bC0yLDIuMmMtMC4zLTAuMi0wLjctMC4zLTEuMS0wLjNjLTEsMC0yLDAuOC0zLjEsMi40CgkJCWMtMS4xLDEuNi0xLjcsMy4yLTEuOSw0LjlsLTAuNCwzLjRsLTIuMSwwLjdsMC0wLjRsMC4xLTAuOWwwLjEtMC45bDAuNy02LjdsMC4xLTAuN2MwLjEtMC42LDAuMS0xLDAuMS0xLjNjMC0wLjYtMC4yLTAuOS0wLjUtMC45CgkJCWMtMC43LDAtMS41LDAuOC0yLjIsMi40Yy0wLjItMC4yLTAuMy0wLjQtMC4zLTAuNWMwLTAuNiwwLjUtMS4zLDEuNi0yLjNjMS0wLjksMS44LTEuNCwyLjQtMS40YzAuOCwwLDEuMiwwLjUsMS4yLDEuNgoJCQljMCwwLjMsMCwwLjYtMC4xLDFsLTAuMSwxbC0wLjEsMS4yTDE5OCw2Ni4xeiIvPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yMTMuNyw2OGMtMS4xLDEuNy0yLjIsMy4yLTMuNSw0LjNjLTEuMywxLjEtMi40LDEuNy0zLjMsMS43Yy0xLjMsMC0xLjktMS0xLjktMy4xYzAtMi44LDAuOS01LjMsMi44LTcuNAoJCQljMS45LTIuMSw0LjEtMy4xLDYuNi0zLjFjMSwwLDEuOCwwLjEsMi41LDAuNGMwLDAuMi0wLjEsMC4zLTAuMSwwLjNsLTAuMiwwLjdjLTAuMSwwLjUtMC4yLDAuOC0wLjIsMC45bC0wLjksNi4ybC0wLjEsMC45CgkJCWMtMC4xLDAuOS0wLjIsMS41LTAuMiwxLjhjMCwwLjQsMC4xLDAuNiwwLjMsMC42YzAuOCwwLDEuNi0wLjksMi40LTIuNmMwLjMsMC4xLDAuNCwwLjMsMC40LDAuNGMwLDAuMy0wLjQsMS0xLjIsMgoJCQljLTEuMSwxLjMtMi4xLDItMywyYy0wLjcsMC0xLTAuNS0xLTEuNGMwLTAuMywwLTAuNywwLjEtMS4ybDAuMS0xLjFsMC4yLTEuMkwyMTMuNyw2OHogTTIxNC41LDYyLjVjLTAuOC0wLjUtMS43LTAuNy0yLjYtMC43CgkJCWMtMS4zLDAtMi40LDAuOC0zLjMsMi40Yy0wLjksMS42LTEuMywzLjYtMS4zLDUuOWMwLDEuMiwwLjQsMS44LDEuMSwxLjhjMC44LDAsMS44LTAuNiwzLTEuOWMxLjYtMS43LDIuNS0zLjcsMi45LTZMMjE0LjUsNjIuNXoiCgkJCS8+CgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTIyOS4xLDYwLjRsMC4xLTEuMmMwLjMtMywxLjQtNS41LDMuMS03LjRjMS43LTIsMy43LTMsNS45LTNjMC41LDAsMSwwLDEuNCwwLjFsLTIsMmMtMC40LTAuMS0xLTAuMi0xLjYtMC4yCgkJCWMtMS40LDAtMi40LDAuNS0zLjEsMS41Yy0wLjcsMS0xLjIsMi42LTEuNCw1bC0xLjMsMTEuN2wtMC4xLDAuOWMtMC4xLDAuOC0wLjEsMS40LTAuMSwxLjdjMCwwLjUsMC4xLDAuNywwLjQsMC43CgkJCWMwLjgsMCwxLjYtMC45LDIuMy0yLjZjMC4zLDAuMSwwLjQsMC4zLDAuNCwwLjRjMCwwLjMtMC40LDEtMS4xLDJjLTEuMSwxLjMtMiwyLTMsMmMtMC43LDAtMS4xLTAuNS0xLjEtMS41CgkJCWMwLTAuNCwwLjEtMS4xLDAuMi0yLjJsMC4xLTEuMmwwLjEtMWMtMC42LDEuNC0xLjcsMi43LTMuMSw0Yy0xLjQsMS4zLTIuNiwxLjktMy41LDEuOWMtMS4zLDAtMi0xLTItMy4xYzAtMi43LDAuOS01LjEsMi43LTcuMwoJCQljMS44LTIuMSwzLjktMy4yLDYuMi0zLjJDMjI4LjYsNjAuNCwyMjguOCw2MC40LDIyOS4xLDYwLjR6IE0yMjguOCw2Mi40Yy0wLjgtMC40LTEuNS0wLjYtMi4yLTAuNmMtMS40LDAtMi41LDAuOC0zLjQsMi4zCgkJCWMtMC45LDEuNi0xLjMsMy42LTEuMyw2YzAsMS4yLDAuNCwxLjgsMS4xLDEuOGMwLjksMCwxLjktMC42LDMtMS45YzEuNS0xLjYsMi40LTMuNiwyLjctNkwyMjguOCw2Mi40eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yNDIuOSw2OS4yYzAuMiwwLjIsMC40LDAuMywwLjQsMC42YzAsMC4zLTAuMywwLjgtMC45LDEuNWMtMS42LDEuOC0zLjIsMi44LTQuNywyLjhjLTEsMC0xLjctMC40LTIuNC0xLjEKCQkJYy0wLjYtMC44LTAuOS0xLjctMC45LTIuOWMwLTIuMSwwLjgtNC4zLDIuNC02LjVjMS42LTIuMiwzLjItMy4zLDQuOC0zLjNjMS4xLDAsMS43LDAuNiwxLjcsMS44YzAsMS40LTAuNywyLjctMiw0CgkJCWMtMS4zLDEuMy0zLDIuMi00LjksMi43YzAuMiwyLjIsMS4xLDMuNCwyLjcsMy40QzI0MC42LDcyLjEsMjQxLjksNzEuMiwyNDIuOSw2OS4yeiBNMjM2LjUsNjcuMWMwLjMsMC4xLDAuNSwwLjEsMC43LDAuMQoJCQljMS4yLDAsMi4yLTAuNCwzLTEuMWMwLjktMC43LDEuMy0xLjUsMS4zLTIuNWMwLTEuMS0wLjYtMS42LTEuNy0xLjZjLTAuOCwwLTEuNSwwLjUtMi4yLDEuNFMyMzYuNiw2NS42LDIzNi41LDY3LjF6Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==',
  },
  'remitex.net': {
    apis: getAPIs('didi.biz'),
    client_id: 'remitex-web',
    walletLabel: 'usdtAvailableBalance',
    primaryColor: '#34d1d6',
    secondaryColor: '#011022',
    emailInput: 'input[name="email"]',
    logo: 'https://didi.biz/img/logo.57b09ac4.svg',
    subscribeAccount: 'AILenThienDang',
    subscribeFee: 39,
  },
  'rosichi.net': {
    logo: 'https://rosichi.net/img/logo.5fdf0f5c.svg',
  },
  'shogunbo.com': {
    logo: 'https://shogunbo.com/img/logo.d3e0e491.svg',
  },
};

export const generateColor = (color) => {
  let primaryColors = [color];
  while (primaryColors[primaryColors.length - 1] !== '#000000') {
    primaryColors.push(
      chroma(primaryColors[primaryColors.length - 1])
        .darken()
        .hex()
    );
  }
  while (primaryColors[0] !== '#ffffff') {
    primaryColors.unshift(chroma(primaryColors[0]).brighten().hex());
  }
  primaryColors = primaryColors
    .filter((cl) => cl !== '#ffffff' && cl !== '#000000')
    .slice(-9);

  const primary = {};
  for (let i = primaryColors.length - 1; i >= 0; i--) {
    primary[(i + 1 + (9 - primaryColors.length)) * 100] = primaryColors[i];
  }
  return primary;
};

const getBrandColors = () => ({
  primary: generateColor(exchanges[process.env.EXCHANGE].primaryColor),
  secondary: generateColor(exchanges[process.env.EXCHANGE].secondaryColor),
});
export const colors = getBrandColors();
export default exchanges[process.env.EXCHANGE];
