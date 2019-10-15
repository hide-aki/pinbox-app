export const RoutePaths = {
    Index: '/',
    Account: '/account',
    AccountNew: '/account/new',
    AccountSet: '/account/set',
    Settings: '/settings',
};

export const RouteProviders = {
    Index: () => RoutePaths.Index,
    Account: () => RoutePaths.Account,
    NewAccount: () => RoutePaths.AccountNew,
    SetAccount: () => RoutePaths.AccountSet,
    Settings: () => RoutePaths.Settings,
};

