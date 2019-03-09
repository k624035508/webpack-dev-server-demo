﻿import React from "react";
import { Link } from 'react-router';
import { ajax } from "jquery";
import { updateWalletInfo, updateUserInfo, fetchBannerInfo } from "../actions/usercenter.js";
import StatusContainer from "../containers/user-status.jsx";
import MyAccountPage from "../containers/myaccount.jsx";
import { fetchWalletAndUserInfo } from "../actions/usercenter.js"
import confirm from "../components/tips_confirm.js";
import alert from "../components/tips_alert.js";

/**
 * Number.prototype.format(n, x)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
Number.prototype.format = function (n, x) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

Number.prototype.toNum = function () {
	return this;
}

String.prototype.toNum = function () {
	return parseFloat(this.replace(/[^0-9\.]+/g, ""));
}


class UserCenterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidUpdate() {
		$(".hot-img").eq(0).show().siblings().hide();
		$(".hot-li li").eq(0).addClass("current-li").siblings().removeClass("current-li");
		var leng = $(".hot-img").length;
		var index = 0;
		$(".hot-li li").hover(function () {
			index = $(".hot-li li").index(this);
			$(this).addClass("current-li").siblings().removeClass("current-li");
			$(".hot-img").eq(index).show().siblings().hide();
		});
		$(".inner-ul li.nav-active").removeClass("nav-active");
		$(".inner-ul li:has(> a.active-link)").addClass("nav-active");
	}

	render() {
		return (
			<div className="content-wrap usercenter">
				<div className="nav-left">
					<div className="total-account">
						<p className="account-h">账户总额</p>
						<p className="account-num">{this.props.totalMoney < 1e6
							? this.props.totalMoney.format(2)
							: Math.floor(this.props.totalMoney).format()}<span>&nbsp; 元</span></p>
					</div>
					<ul className="list-unstyled outside-ul">
						<li><Link to="/myaccount" className={"account-link " + (!this.props.children ? "" : "active")} activeClassName="active">账户总览</Link></li>
						{/* <li className="listing"><a className="funds">资金管理<div></div></a>
							<ul className="list-unstyled inner-ul">
								<li><Link to="/mytransaction" activeClassName="active-link">交易明细</Link></li>
								<li><Link to="/recharge" activeClassName="active-link">我要充值</Link></li>
								<li><Link to="/withdraw" activeClassName="active-link">我要提现</Link></li>
								<li className="listing"><a className="investing">投资管理<div></div></a>
									<ul className="list-unstyled inner-ul">
										<li><Link to="/myinvest" activeClassName="active-link">我的投资</Link></li>
										<li><Link to="/invest-record" activeClassName="active-link">投资记录</Link></li>
										<li><Link to="/myrepayments" activeClassName="active-link">回款计划</Link></li>
									</ul>
								</li>
								<li className="listing"><a className="account">账户管理<div></div></a>
									<ul className="list-unstyled inner-ul">
										<li><Link to="/safe" activeClassName="active-link">个人中心</Link></li>
										<li><Link to="/bankaccount" activeClassName="active-link">银行账户</Link></li>
									</ul>
								</li>
								<li className="listing"><a className="pointMall">奖励管理<div></div></a>
									<ul className="list-unstyled inner-ul">
										<li><Link to="/mypoints" activeClassName="active-link">我的积分</Link></li>
										<li><Link to="/mylottery" activeClassName="active-link">我的奖券</Link></li>
										<li><Link to="/invitation" activeClassName="active-link">推荐奖励</Link></li>
									</ul>
								</li>
								<li className="listing"><a className="news">消息管理<div></div></a>
									<ul className="list-unstyled inner-ul">
										<li><Link to="/mynews" activeClassName="active-link">我的消息</Link></li>
										<li><Link to="/settings" activeClassName="active-link">通知设置</Link></li>
									</ul>
								</li>
							</ul>
						</li> */}
					</ul>
				</div>
				{this.props.children || <StatusContainer><MyAccountPage/></StatusContainer>}
			</div>
		)
	}
}
function mapStateToProps(state) {
	var walletInfo = state.walletInfo;
	return {
		totalMoney: walletInfo.idleMoney + walletInfo.lockedMoney + walletInfo.investingMoney + walletInfo.profitingMoney,
		//isLoaner: state.userInfo.isLoaner,
	};
}

import { connect } from 'react-redux';
export default connect(mapStateToProps)(UserCenterPage);