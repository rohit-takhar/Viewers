import Header from '../components/Header/Header.js';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.oidc && state.oidc.user,
    isOpen: state.ui.userPreferencesModalOpen,
  };
};

const ConnectedHeader = connect(mapStateToProps)(Header);

export default ConnectedHeader;
