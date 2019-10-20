export const RoutePaths = {
    Index: '/',
    Login: '/login',
    Nodes: '/nodes',
    Account: '/account',
    AccountNew: '/account/new',
    AccountSet: '/account/set',
    Settings: '/settings',
};

export const RouteProviders = {
    Index: () => RoutePaths.Index,
    Login: () => RoutePaths.Login,
    Nodes: () => RoutePaths.Nodes,
    Account: () => RoutePaths.Account,
    NewAccount: () => RoutePaths.AccountNew,
    SetAccount: () => RoutePaths.AccountSet,
    Settings: () => RoutePaths.Settings,
};

