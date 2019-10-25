export const RoutePaths = {
    Index: '/',
    Login: '/login',
    Pools: '/pools',
    Account: '/account',
    AccountNew: '/account/new',
    AccountSet: '/account/set',
    Settings: '/settings',
};

export const RouteProviders = {
    Index: () => RoutePaths.Index,
    Login: () => RoutePaths.Login,
    Pools: () => RoutePaths.Pools,
    Account: () => RoutePaths.Account,
    NewAccount: () => RoutePaths.AccountNew,
    SetAccount: () => RoutePaths.AccountSet,
    Settings: () => RoutePaths.Settings,
};
