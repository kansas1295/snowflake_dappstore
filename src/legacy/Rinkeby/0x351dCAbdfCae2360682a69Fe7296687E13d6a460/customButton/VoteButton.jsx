/* eslint-disable */
// Button used when transacting. Can be used in multiple places, but currently is generic. Has states for ready, sending, error and success.

import React from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withTheme, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useWeb3Context } from 'web3-react';
import { getEtherscanLink } from '../../../common/utilities';
import { useTransactionManager } from '../../../common/hooks';
import './buttonStyle.scss';


import theme from '../../../common/theme';

const styles = () => ({
  ready: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  },
  sendingPending: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    "&:hover": {
      backgroundColor: theme.palette.grey[500]
    }
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    }
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.success.dark
    }
  }
});

const ProgressIcon = withTheme()(({ theme }) => (
  <CircularProgress size={theme.typography.button.fontSize} />
));

function VoteButton({
  show,
  method,
  readyText,
  classes,
  onTransactionHash,
  onConfirmation,
  transactionOptions,
  disabled
}) {
  const context = useWeb3Context();
  const [
    transactionState,
    transactionData,
    sendTransaction,
    resetTransaction
  ] = useTransactionManager(method, {
    handlers: { transactionHash: onTransactionHash, receipt: onConfirmation },
    transactionOptions: transactionOptions
  });

  
      return (
        <Button
          style={show ? undefined : { display: "none" }}
          variant="contained"
          onClick={sendTransaction}
          disabled={disabled}
        className="voteButton">
          {readyText}
        </Button>
      );
   
}

VoteButton.propTypes = {
  show: PropTypes.bool,
  method: PropTypes.func.isRequired,
  readyText: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  onTransactionHash: PropTypes.func,
  onConfirmation: PropTypes.func,
  transactionOptions: PropTypes.object
};

VoteButton.defaultProps = {
  show: true,
  onTransactionHash: () => {},
  onConfirmation: () => {}
};

export default withStyles(styles)(VoteButton);
