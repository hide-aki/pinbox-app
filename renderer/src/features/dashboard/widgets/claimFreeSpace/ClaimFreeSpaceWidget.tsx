import React from 'react';
import {Widget} from '../../../../app/components/Widget';
import {translate} from '../../../../utils/translate';
import {useIntl} from 'react-intl';
import {makeStyles, Theme} from '@material-ui/core/styles';

const useStyle = makeStyles((theme: Theme) => ({
        root: {
            position: 'relative',
        },
        bg: {
            top: theme.spacing(1),
            right: theme.spacing(1),
            height: '90%',
            width: '100%',
            position: 'absolute',
            background: `transparent url(/static/media/claimspace.f0baf459.png) no-repeat right`,
            backgroundSize: 'contain',
            zIndex: 1,
        }
    })
);

export const ClaimFreeSpaceWidget: React.FC = () => {
    const classes = useStyle();
    const intl = useIntl();
    const t = translate(intl);
    return (
        <div className={classes.root}>
            <div className={classes.bg}>
            </div>
            <Widget
                title={t('dashboard.claim_space.title')}
                subtitle={t('dashboard.claim_space.subtitle')}
            >
                <p> Claim Free Space</p>
            </Widget>
        </div>
    )
};
