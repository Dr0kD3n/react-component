import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from 'models';
import { IReduxStore } from 'store';
import { logoutUser, toggleSideBar } from 'store/actions';
import { Loader } from 'components/common';
import SubMenu from 'components/DashboardComponents/SubMenu/';
import Logo from 'assets/img/logo.png';
import Location from 'components/common/Location/';
import CurrentDate from 'components/common/CurrentDate/';
import WeatherApplet from 'components/common/WeatherApplet/';
interface INavBarProps {
  user: User;
  dispatch?: (actionCreator: any) => any;
}
const Navbar = class extends React.Component<INavBarProps> {
  public state = { loading: false, showSubMenu: false };
  public render() {
    return (<div className='home__navbar'>
      {this.props.user.id ? (<div >
        <div className="add"><Link to='ping'>add</Link></div>

        <img
          onClick={this.toggleSubMenu}
          width="50"
          src="https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png"
          alt=""
          className="img--circle home__navbar-right"
        />
        {this.state.loading ?
          <Loader className='lds-dual-ring--blue' /> :
          false}
      </div>)
        : (
          <div>
            <div className="home__navbar-left">
              <img src={Logo} alt="logo" onClick={this.toggleSideBar} />
              <Link to='/home'>Home</Link>
              <Link to='/chanel'>Chanel</Link>
              <Link to='/explore'>Explore</Link>
            </div>
            <div className="home__navbar-right" >
              <Link to='/login'>
                <div className="login-btn">
                  login
                </div>
              </Link>
              <Location />
              <CurrentDate />
              <WeatherApplet />
            </div>
          </div>
        )}
      <SubMenu show={this.state.showSubMenu} logout={this.logout} />
    </div>);
  }
  private toggleSideBar = () => {
    if (this.props.dispatch) {
      this.props.dispatch(toggleSideBar());
    }
  }
  private switchLoading = () => {
    this.setState({ loading: !this.state.loading });
  }
  private toggleSubMenu = () => {
    this.setState({ showSubMenu: !this.state.showSubMenu });
  }
  private logout = () => {
    if (!this.props.dispatch) { return; }
    this.switchLoading();
    this.props.dispatch(logoutUser(this.switchLoading));
    window.location.href = '/';
  }
};
const mapStateToProps = (state: IReduxStore) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Navbar);
