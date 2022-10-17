import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes";
import {Axios} from '../../service'
import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { useEffect } from "react";

var ps;

function Admin() {
	const location = useLocation();
	const mainPanelRef = React.useRef(null);
	const [sidebarOpened, setsidebarOpened] = React.useState(
		document.documentElement.className.indexOf("nav-open") !== -1
		);
		React.useEffect(() => {
			if (navigator.platform.indexOf("Win") > -1) {
				document.documentElement.className += " perfect-scrollbar-on";
				document.documentElement.classList.remove("perfect-scrollbar-off");
				ps = new PerfectScrollbar(mainPanelRef.current, {
					suppressScrollX: true,
				});
				let tables = document.querySelectorAll(".table-responsive");
				for (let i = 0; i < tables.length; i++) {
					ps = new PerfectScrollbar(tables[i]);
				}
			}
			// Specify how to clean up after this effect:
			return function cleanup() {
				if (navigator.platform.indexOf("Win") > -1) {
					ps.destroy();
					document.documentElement.classList.add("perfect-scrollbar-off");
					document.documentElement.classList.remove("perfect-scrollbar-on");
				}
			};
		});
		React.useEffect(() => {
			if (navigator.platform.indexOf("Win") > -1) {
				let tables = document.querySelectorAll(".table-responsive");
				for (let i = 0; i < tables.length; i++) {
					ps = new PerfectScrollbar(tables[i]);
				}
			}
			document.documentElement.scrollTop = 0;
			document.scrollingElement.scrollTop = 0;
			if (mainPanelRef.current) {
				mainPanelRef.current.scrollTop = 0;
			}
		}, [location]);
		// this function opens and closes the sidebar on small devices
		const toggleSidebar = () => {
			document.documentElement.classList.toggle("nav-open");
			setsidebarOpened(!sidebarOpened);
		};
		const getRoutes = (routes) => {
			return routes.map((prop, key) => {
				if (prop.layout === "/admin") {
					return (
						<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
						/>
						);
					} else {
						return null;
					}
				});
			};
			const getBrandText = (path) => {
				for (let i = 0; i < routes.length; i++) {
					if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
						return routes[i].name;
					}
				}
				return "Brand";
			};

			useEffect(()=>{
				;(async()=>{
					try {
						const res = await Axios.get("/admin", {
							headers: {
								'authorizetion': localStorage.getItem("token")
							}
						})
						const data = res.data.data
						localStorage.setItem('admin_data', data.username)
					} catch(err) {
						if (err.response.data && err.response.data.status === 400) {
							localStorage.removeItem('token')
							window.location.href = "/login"
						}
					}
				})()
			})
			
			if (!localStorage.getItem('token')) return <Redirect to="/login" />
			return (
				<BackgroundColorContext.Consumer>
				{({ color }) => (
					<React.Fragment>
					<div className="wrapper">
					<Sidebar
					routes={routes}
					logo={{
						text: "23TV-ADMIN",
						imgSrc: logo,
					}}
					toggleSidebar={toggleSidebar}
					/>
					<div className="main-panel" ref={mainPanelRef} data={color}>
					<AdminNavbar
					brandText={getBrandText(location.pathname)}
					toggleSidebar={toggleSidebar}
					sidebarOpened={sidebarOpened}
					/>
					<Switch>
					{getRoutes(routes)}
					<Redirect from="/admin" to="/admin/category" />
					</Switch>
					</div>
					</div>
					</React.Fragment>
					)}
					</BackgroundColorContext.Consumer>
					);
				}
				
				export default Admin;
				