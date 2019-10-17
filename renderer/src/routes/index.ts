export const RoutePaths = {
    Index: '/',
    Login: '/login',
    Account: '/account',
    AccountNew: '/account/new',
    AccountSet: '/account/set',
    Settings: '/settings',
};

export const RouteProviders = {
    Index: () => RoutePaths.Index,
    Login: () => RoutePaths.Login,
    Account: () => RoutePaths.Account,
    NewAccount: () => RoutePaths.AccountNew,
    SetAccount: () => RoutePaths.AccountSet,
    Settings: () => RoutePaths.Settings,
};

