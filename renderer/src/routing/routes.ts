export const RoutePaths = {
    Index: '/',
    Dashboard: '/dashboard',
    Login: '/login',
    Pools: '/pools',
    Account: '/account',
    AccountNew: '/account/new',
    AccountSet: '/account/set',
    Settings: '/settings',
    Subscriptions: '/subscriptions'

};

export const RouteProviders = {
    Index: () => RoutePaths.Index,
    Dasboard: () => RoutePaths.Dashboard,
    Login: () => RoutePaths.Login,
    Pools: () => RoutePaths.Pools,
    Account: () => RoutePaths.Account,
    NewAccount: () => RoutePaths.AccountNew,
    SetAccount: () => RoutePaths.AccountSet,
    Settings: () => RoutePaths.Settings,
    Subscriptions: () => RoutePaths.Subscriptions,
};

