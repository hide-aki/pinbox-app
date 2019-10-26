import React from 'react';
import {createStyles, lighten, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Button, Radio, TableFooter} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {poolSlice} from './slice';
import {RoutePaths} from '../../routing/routes';
import { useHistory } from 'react-router';
import {selectCurrentPoolId} from './selectors';
import {IPoolDescription} from '../../typings/IPoolDescription';

function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

type Order = 'asc' | 'desc';

function getSorting<K extends keyof any>(
    order: Order,
    orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

interface headCell {
    disablePadding: boolean;
    id: keyof IPoolDescription;
    label: string;
    numeric: boolean;
}

const headCells: headCell[] = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
    {id: 'description', numeric: false, disablePadding: false, label: 'Description'},
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IPoolDescription) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property: keyof IPoolDescription) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        title: {
            padding: theme.spacing(2),
            flex: '1 1 100%',
        },
    }),
);


const EnhancedTableToolbar = () => {
    const classes = useToolbarStyles();
    return (
        <Toolbar className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                    <FormattedMessage id="pools.table.title"/>
                </Typography>
                <Typography variant="subtitle1" id="tableSubtitle">
                    <FormattedMessage id="pools.table.subtitle"/>
                </Typography>
            </div>
        </Toolbar>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        tableWrapper: {
            overflowX: 'auto',
        },
        footer: {},
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);


interface IProps {
    pools: IPoolDescription[],
}

export const PoolsTable: React.FC<IProps> = ({pools}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedPoolId = useSelector<any, string>(selectCurrentPoolId);
    const rows = pools;
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof IPoolDescription>('name');
    const [selected, setSelected] = React.useState<string>(selectedPoolId);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IPoolDescription) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        setSelected(name);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleConfirmPool = () => {
        dispatch(poolSlice.actions.setPool(selected));
        history.push(RoutePaths.Index)
    };

    const isSelected = (name: string) => selected === name;
    const hasSelected = selected.length > 0 && selectedPoolId !== selected;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar/>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.url);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, row.url)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.url}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Radio
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.description}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell padding="checkbox" />
                                <TableCell>
                                <Button
                                    disabled={!hasSelected}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleConfirmPool}>
                                    <FormattedMessage id='button.apply'/>
                                </Button>
                                </TableCell>
                                <TableCell>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    backIconButtonProps={{
                                        'aria-label': 'previous page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'next page',
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        </div>
    );
}
