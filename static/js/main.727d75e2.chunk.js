(this["webpackJsonptoggl-easy-reports"]=this["webpackJsonptoggl-easy-reports"]||[]).push([[0],{105:function(e,t,n){e.exports={loadingSpinner:"TogglReport_loadingSpinner__39wB8",projectsGrid:"TogglReport_projectsGrid__30rUC",project:"TogglReport_project__3C9eX"}},129:function(e,t,n){e.exports={icon:"SettingsPopup_icon__BAA6z",restoreSettingsButton:"SettingsPopup_restoreSettingsButton__31HQs"}},170:function(e,t,n){e.exports=n(334)},30:function(e,t,n){e.exports={contentContainer:"AuthenticatedContent_contentContainer__NnNEi",reportContainer:"AuthenticatedContent_reportContainer__scAMV",optionsPanelContainer:"AuthenticatedContent_optionsPanelContainer__3E8Mq",optionsDivider:"AuthenticatedContent_optionsDivider__3BVsA",inputContainer:"AuthenticatedContent_inputContainer__1rD7s",inputLabel:"AuthenticatedContent_inputLabel__1y7sv",inputField:"AuthenticatedContent_inputField__13Gbu"}},332:function(e,t,n){},334:function(e,t,n){"use strict";n.r(t);var r=n(349),a=(n(171),n(0)),o=n.n(a),i=n(7),c=n.n(i),s=n(348),l=n(49),u=n(24),p=n.n(u),d=n(32),h=n(17),f=n(19),m=n(27),g=n(26),O=n(28),y=function e(t,n,r,a,o,i){Object(h.a)(this,e),this.email=t,this.fullName=n,this.imageUrl=r,this.defaultWorkspaceId=a,this.workspaces=o,this.firstDayOfTheWeek=i},b=function e(t,n){Object(h.a)(this,e),this.id=t,this.name=n},v=n(154),j=n.n(v),E=function(){function e(){Object(h.a)(this,e)}return Object(f.a)(e,null,[{key:"reset",value:function(){localStorage.clear()}},{key:"togglApiToken",get:function(){return localStorage.getItem(this.togglApiTokenKey)||""},set:function(e){localStorage.setItem(this.togglApiTokenKey,e)}},{key:"roundProjectDurationsDownToMinutes",get:function(){var e=localStorage.getItem(this.roundProjectDurationsDownToMinutesKey);if(null===e)return 0;var t=JSON.parse(e);return isNaN(t)?0:t},set:function(e){localStorage.setItem(this.roundProjectDurationsDownToMinutesKey,JSON.stringify(e))}}]),e}();E.roundProjectDurationsDownToMinutesKey="TogglEasyReports_Settings_RoundProjectDurationsDownToMinutes",E.togglApiTokenKey="TogglEasyReports_Settings_TogglApiToken";var k=function(){function e(){Object(h.a)(this,e)}return Object(f.a)(e,null,[{key:"fetch",value:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=Object(d.a)(p.a.mark((function e(t){var n,r,a,o,i,c,s=arguments;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:{},r=E.togglApiToken,a=this.buildUrl(t,n),o={headers:{authorization:"Basic ".concat(btoa("".concat(r,":api_token")))},method:"GET"},e.next=6,fetch(a,o);case 6:return i=e.sent,e.next=9,i.json();case 9:if(c=e.sent,!i.ok){e.next=14;break}return e.abrupt("return",c);case 14:throw c;case 15:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}())},{key:"buildUrl",value:function(e,t){return e="".concat(this.BASE_URL).concat(e),"user_agent"in t||(t.user_agent=this.USER_AGENT),"".concat(e,"?").concat(j.a.stringify(t))}}]),e}();k.BASE_URL="https://track.toggl.com",k.USER_AGENT="https://github.com/BenjaVR/toggl-easy-report";var C=function(e){function t(){return Object(h.a)(this,t),Object(m.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(O.a)(t,e),Object(f.a)(t,null,[{key:"getCurrentUser",value:function(){var e=Object(d.a)(p.a.mark((function e(){var t,n,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetch("/api/v8/me");case 2:return t=e.sent,n=t.data,r=n.workspaces.map((function(e){return new b(e.id,e.name)})),e.abrupt("return",new y(n.email,n.fullname,n.image_url,n.default_wid,r,n.beginning_of_week));case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),t}(k);function _(e,t){switch(t.type){case"LOGGING_IN":return{user:void 0,authState:"LOGGING_IN"};case"LOGGED_IN":return{user:t.user,authState:"LOGGED_IN"};case"LOGGING_IN_FAILED":return{user:void 0,authState:"LOGIN_FAILED"};case"LOGGED_OUT":return{user:void 0,authState:"LOGGED_OUT"};default:return e}}var w=o.a.createContext([{user:void 0,authState:"LOGGED_OUT"},function(){}]);function S(){var e=Object(a.useContext)(w),t=Object(l.a)(e,2),n=t[0],r=t[1];return{userState:n,login:Object(a.useCallback)((function(){r({type:"LOGGING_IN"}),C.getCurrentUser().then((function(e){r({type:"LOGGED_IN",user:e})})).catch((function(){r({type:"LOGGING_IN_FAILED"})}))}),[r])}}var T=n(81),D=n.n(T),P=n(46),N=n(343),I=n(336),G=n(339),A=n(11),M=n.n(A),L=function(){function e(){Object(h.a)(this,e)}return Object(f.a)(e,null,[{key:"updateLocale",value:function(e){M.a.updateLocale("en",{week:{dow:e,doy:M.a.localeData().firstDayOfYear()}})}}]),e}(),x=function e(t,n){Object(h.a)(this,e),this.totalTimeInMilliseconds=t,this.projects=n},W=function(){function e(t,n,r,a,o,i){Object(h.a)(this,e),this.id=t,this.title=n,this.timeInMilliseconds=r,this.client=a,this.hexColor=o,this.timeEntries=i}return Object(f.a)(e,[{key:"timeEntriesSummary",get:function(){var e="";this.timeEntries.filter((function(e){return void 0===e.parsedGroupTitle})).sort().forEach((function(t){""!==e&&(e+="\n"),e+="- ".concat(t.parsedEntryTitle)}));var t=this.timeEntries.filter((function(e){return void 0!==e.parsedGroupTitle})),n={};return t.forEach((function(e){var t=e.parsedGroupTitle;-1!==Object.keys(n).indexOf(t)?n[t].push(e):n[t]=[e]})),Object.keys(n).forEach((function(t){""!==e&&(e+="\n\n"),e+=t,n[t].forEach((function(t){e+="\n - ".concat(t.parsedEntryTitle)}))})),e}}]),e}(),R=function e(t,n){Object(h.a)(this,e),this.title=t,this.timeInMilliseconds=n,this.parsedGroupTitle=void 0,this.parsedEntryTitle=void 0,this.groupTimeEntriesRegex=new RegExp("\\[(.+)] - (.+)");var r=this.groupTimeEntriesRegex.exec(this.title);r&&3===r.length?(this.parsedGroupTitle=r[1],this.parsedEntryTitle=r[2]):(this.parsedGroupTitle=void 0,this.parsedEntryTitle=this.title)},F=function(e){function t(){return Object(h.a)(this,t),Object(m.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(O.a)(t,e),Object(f.a)(t,null,[{key:"getSummaryReport",value:function(){var e=Object(d.a)(p.a.mark((function e(t,n){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetch("/reports/api/v2/summary",{workspace_id:"".concat(t),since:n.startOf("week").format("YYYY-MM-DD"),until:n.endOf("week").format("YYYY-MM-DD")});case 2:return r=e.sent,e.abrupt("return",new x(r.total_grand,r.data.map((function(e){return new W(e.id,e.title.project,e.time,e.title.client,e.title.hex_color,e.items.map((function(e){return new R(e.title.time_entry,e.time)})))}))));case 4:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),t}(k),U=function e(t,n,r,a,o,i,c){Object(h.a)(this,e),this.id=t,this.workspaceId=n,this.name=r,this.at=a,this.notes=o,this.hourlyRate=i,this.currency=c},K=function(e){function t(){return Object(h.a)(this,t),Object(m.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(O.a)(t,e),Object(f.a)(t,null,[{key:"getWorkspaceClients",value:function(){var e=Object(d.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetch("/api/v8/workspaces/".concat(t,"/clients"));case 2:return n=e.sent,e.abrupt("return",n.map((function(e){return new U(e.id,e.wid,e.name,e.at,e.notes,e.hrate,e.cur)})));case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),t}(k);function B(){return function(e,t,n){if(!n||"function"!==typeof n.value)throw new TypeError("Can only bind this on methods! ".concat(t," is not a method."));return{configurable:!0,get:function(){var e=n.value.bind(this);return Object.defineProperty(this,t,{configurable:!0,value:e,writable:!0}),e}}}}var Q=n(342);function Y(e){return e}var V={position:"absolute",top:"50%",transform:"translateY(-50%)"},J={textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"};function H(e){return o.a.createElement(Q.a.Option,{value:e.name,key:e.name},e.name)}var z=Y({select:{minWidth:180}}),q=function(e){var t=e.onChange,n=e.className,r=e.clients,i=e.selectedClientName,c=e.isLoading,s=Object(a.useCallback)((function(e){t&&t(e)}),[t]);return o.a.createElement(Q.a,{className:n,style:z.select,placeholder:"Select a workspace client (optional)",defaultActiveFirstOption:!1,value:i,onChange:s,allowClear:!0,loading:c,disabled:c},r.map(H))},X=n(340),Z=n(335),$=n(54);function ee(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function te(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ee(n,!0).forEach((function(t){Object($.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ee(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ne(e,t){switch(t.type){case"RESET":return E.reset(),re();case"SET_TOGGL_API_TOKEN":return E.togglApiToken=t.token,te({},e,{togglApiToken:t.token});case"SET_ROUND_PROJECT_DURATIONS_DOWN_TO_MINUTES":return E.roundProjectDurationsDownToMinutes=t.minutes,te({},e,{roundProjectDurationsDownToMinutes:t.minutes});default:return e}}function re(){return{togglApiToken:E.togglApiToken,roundProjectDurationsDownToMinutes:E.roundProjectDurationsDownToMinutes}}var ae=o.a.createContext([re(),function(){}]);function oe(){var e=Object(a.useContext)(ae),t=Object(l.a)(e,2);return te({},t[0],{dispatch:t[1]})}function ie(e){return Math.round(M.a.duration(e).asMinutes())}function ce(e,t){return("0".repeat(t)+e).slice(-t)}var se=n(105),le=n.n(se);function ue(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function pe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ue(n,!0).forEach((function(t){Object($.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ue(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var de=pe({},J,{display:"block"}),he=Y({projectCard:{marginBottom:4},projectTitleLine:pe({},de),fatProjectTitleLine:pe({},de,{fontWeight:"bold"}),timeEntriesSummary:{whiteSpace:"pre-wrap",overflowWrap:"break-word"}});function fe(e){return a.createElement("div",null,a.createElement("span",{style:he.fatProjectTitleLine},e.title),a.createElement("span",{style:he.projectTitleLine},e.client))}var me=function(e){var t,n=e.project,o=e.projectDurationInMinutes,i=a.useCallback(Object(d.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.a.destroy(),e.prev=1,e.next=4,navigator.clipboard.writeText(n.timeEntriesSummary);case 4:r.a.success("Task content is copied to the clipboard!"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),r.a.error("Could not copy task content to the clipboard: ".concat(e.t0));case 10:case"end":return e.stop()}}),e,null,[[1,7]])}))),[n.timeEntriesSummary]);return a.createElement(X.a,{style:he.projectCard,type:"inner",title:fe(n),extra:(t=o,a.createElement("span",null,a.createElement("b",null,M.a.duration().add(t,"minutes").asHours().toFixed(2))," hours")),hoverable:!0,onClick:i},a.createElement("span",{style:he.timeEntriesSummary},n.timeEntriesSummary))};function ge(e,t){var n=M.a.duration(e,"milliseconds"),r=Math.floor(n.asHours()),o=Math.floor(n.asMinutes())-60*r,i=M.a.duration(t,"minutes"),c=Math.floor(i.asHours()),s=Math.floor(i.asMinutes())-60*r;return a.createElement("span",null,"Total time: ",a.createElement("b",null,ce(r,2)),"h",a.createElement("b",null,ce(o,2)),n.asMilliseconds()!==i.asMilliseconds()&&a.createElement(a.Fragment,null,"\xa0",a.createElement("i",null,a.createElement("small",null,"(rounded: ",ce(c,2),"h",ce(s,2),")"))))}function Oe(e){return a.createElement("div",{key:e.reportProject.id,className:le.a.project},a.createElement(me,{project:e.reportProject,projectDurationInMinutes:e.roundedMinutes}))}var ye=function(e){var t=e.report,n=e.clientName,r=oe().roundProjectDurationsDownToMinutes;if(void 0===t)return a.createElement(X.a,{title:"Loading report..."},a.createElement(Z.a,{className:le.a.loadingSpinner}));var o=void 0===n?t.projects:t.projects.filter((function(e){return e.client===n})),i=o.reduce((function(e,t){return e+t.timeInMilliseconds}),0),c=function(e,t){if(0===t)return e.map((function(e){return{reportProject:e,roundedMinutes:ie(e.timeInMilliseconds)}}));var n=1e3*t*60,r=[],a=0;return e.forEach((function(e){var t=e.timeInMilliseconds+a,o=t%n,i=ie(t-o);r.push({reportProject:e,roundedMinutes:i}),a=o})),r}(o,r),s=c.reduce((function(e,t){return e+t.roundedMinutes}),0);return a.createElement(X.a,{title:ge(i,s),className:le.a.projectsGrid},c.map(Oe))},be=Y({select:{minWidth:180}});function ve(e){return a.createElement(Q.a.Option,{value:e.id,key:e.id},e.name)}var je,Ee,ke,Ce,_e,we=function(e){var t=e.onChange,n=e.className,r=e.workspaces,o=e.selectedWorkspaceId,i=Object(a.useCallback)((function(e){t&&t(e)}),[t]);return a.createElement(Q.a,{className:n,style:be.select,placeholder:"Select a Toggl workspace",defaultActiveFirstOption:!1,value:o,onChange:i},r.map(ve))},Se=n(30),Te=n.n(Se),De=(je=B(),Ee=B(),ke=B(),Ce=B(),_e=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(m.a)(this,Object(g.a)(t).call(this,e))).localStorageKeyIsOptionsToggleOpen="OPTION_IS_OPTIONS_TOGGLE_OPEN",n.optionsCollapseKey="OPTIONS_COLLAPSE_KEY",L.updateLocale(e.user.firstDayOfTheWeek),n.state={selectedWorkspaceId:e.user.defaultWorkspaceId,clients:[],selectedClientName:void 0,selectedDate:M()(),report:void 0,areClientsFetching:!0},n}return Object(O.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.fetchReport()}},{key:"render",value:function(){var e=this.state,t=e.selectedWorkspaceId,n=e.selectedDate,r=e.report,o=e.clients,i=e.selectedClientName,c=e.areClientsFetching,s=this.props.user.workspaces,l=this.shouldOptionsBeOpenOnLoad()?this.optionsCollapseKey:void 0;return a.createElement("div",{className:Te.a.contentContainer},a.createElement(N.a,{defaultActiveKey:l,onChange:this.handleOptionsCollapseChanged},a.createElement(N.a.Panel,{header:"Options",key:this.optionsCollapseKey},a.createElement("div",{className:Te.a.optionsPanelContainer},a.createElement("div",{className:Te.a.inputContainer},a.createElement("span",{className:Te.a.inputLabel},"Workspace:"),a.createElement(we,{className:Te.a.inputField,workspaces:s,selectedWorkspaceId:t,onChange:this.handleWorkspaceSelectorChanged}),a.createElement(I.a,{className:Te.a.optionsDivider,type:"vertical"}),a.createElement("span",{className:Te.a.inputLabel},"Workspace:"),a.createElement(q,{className:Te.a.inputField,clients:o,selectedClientName:i,onChange:this.handleClientSelectorChanged,isLoading:c})),a.createElement(I.a,{className:Te.a.optionsDivider,type:"vertical"}),a.createElement("div",{className:Te.a.inputContainer},a.createElement("span",{className:Te.a.inputLabel},"Week:"),a.createElement(G.a.WeekPicker,{className:Te.a.inputField,value:n,onChange:this.handleWeekPickerChanged,allowClear:!1}))))),a.createElement("div",{className:Te.a.reportContainer},a.createElement(ye,{report:r,clientName:i})))}},{key:"handleOptionsCollapseChanged",value:function(e){e instanceof Array&&e.length>0&&(e=e[0]),localStorage.setItem(this.localStorageKeyIsOptionsToggleOpen,JSON.stringify(e===this.optionsCollapseKey))}},{key:"handleWorkspaceSelectorChanged",value:function(e){var t=this;void 0!==e&&this.setState({selectedWorkspaceId:e},(function(){return t.fetchReport()}))}},{key:"handleClientSelectorChanged",value:function(e){this.setState({selectedClientName:e})}},{key:"handleWeekPickerChanged",value:function(e){var t=this;this.setState({selectedDate:e||void 0},(function(){return t.fetchReport()}))}},{key:"fetchReport",value:function(){var e=this,t=this.state,n=t.selectedDate,a=t.selectedWorkspaceId;void 0!==a&&(this.setState({report:void 0}),void 0!==n&&F.getSummaryReport(a,n).then((function(t){e.setState({report:t},(function(){return e.fetchWorkspace()}))})).catch((function(){r.a.error("Could not fetch the Toggl report.")})))}},{key:"fetchWorkspace",value:function(){var e=this;this.setState({areClientsFetching:!0}),K.getWorkspaceClients(this.state.selectedWorkspaceId).then((function(t){e.setState({clients:t,selectedClientName:void 0})})).finally((function(){e.setState({areClientsFetching:!1})}))}},{key:"shouldOptionsBeOpenOnLoad",value:function(){var e=localStorage.getItem(this.localStorageKeyIsOptionsToggleOpen);return null===e||!0===JSON.parse(e)}}]),t}(a.Component),Object(P.a)(_e.prototype,"handleOptionsCollapseChanged",[je],Object.getOwnPropertyDescriptor(_e.prototype,"handleOptionsCollapseChanged"),_e.prototype),Object(P.a)(_e.prototype,"handleWorkspaceSelectorChanged",[Ee],Object.getOwnPropertyDescriptor(_e.prototype,"handleWorkspaceSelectorChanged"),_e.prototype),Object(P.a)(_e.prototype,"handleClientSelectorChanged",[ke],Object.getOwnPropertyDescriptor(_e.prototype,"handleClientSelectorChanged"),_e.prototype),Object(P.a)(_e.prototype,"handleWeekPickerChanged",[Ce],Object.getOwnPropertyDescriptor(_e.prototype,"handleWeekPickerChanged"),_e.prototype),_e),Pe=n(69);function Ne(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var Ie,Ge,Ae=Y({loadingSpinner:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ne(n,!0).forEach((function(t){Object($.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ne(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},V,{left:"50%",transform:"translate(-50%, -50%)"})}),Me=function(e){function t(){return Object(h.a)(this,t),Object(m.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(O.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return a.createElement(Pe.a,{type:"flex",align:"middle"},a.createElement(Z.a,{style:Ae.loadingSpinner}))}}]),t}(a.Component),Le=function(){return a.createElement("span",null,"FOOTER!")},xe=n(346),We=n(337),Re=(Ie=B(),Ge=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(m.a)(this,Object(g.a)(t).call(this,e))).mediaQuery=void 0,n.mediaQuery=window.matchMedia(e.mediaQuery),n}return Object(O.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return null}},{key:"componentDidMount",value:function(){this.mediaQuery.addEventListener("change",this.handleChange),this.props.onChange(this.mediaQuery.matches)}},{key:"componentWillUnmount",value:function(){this.mediaQuery.removeEventListener("change",this.handleChange)}},{key:"handleChange",value:function(e){this.props.onChange(e.matches)}}]),t}(a.Component),Object(P.a)(Ge.prototype,"handleChange",[Ie],Object.getOwnPropertyDescriptor(Ge.prototype,"handleChange"),Ge.prototype),Ge),Fe=n(55),Ue=n(8),Ke=n(344);function Be(e,t){return t in e}var Qe=n(341),Ye=n(345),Ve=n(347),Je=Qe.a.create({onValuesChange:function(){var e=Object(d.a)(p.a.mark((function e(t,n,r){var a,o,i,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t.initialValues,o=t.onFormFieldChanged,i={},r.togglApiToken!==a.togglApiToken&&(i.togglApiToken=r.togglApiToken),r.roundProjectMinutes!==a.roundProjectMinutes&&(i.roundProjectMinutes=r.roundProjectMinutes),c=Object.keys(i),window.setTimeout((function(){var e=c.reduce((function(e,n){if(!e)return!1;var r=t.form.getFieldError(n);return void 0===r||0===r.length}),!0);o(i,e)}));case 6:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()})((function(e){var t=e.form,n=e.initialValues,r=e.onSave;return o.a.createElement(Qe.a,{layout:"horizontal",onKeyDown:function(e){13===e.keyCode&&(e.preventDefault(),r())}},o.a.createElement(Qe.a.Item,{label:"Toggl API token"},t.getFieldDecorator("togglApiToken",{initialValue:n.togglApiToken})(o.a.createElement(Ye.a,null))),o.a.createElement(Qe.a.Item,{label:"Round projects down to minutes"},t.getFieldDecorator("roundProjectMinutes",{initialValue:n.roundProjectMinutes})(o.a.createElement(Ve.a,{min:0}))))})),He=n(129),ze=n.n(He),qe=function(){var e=oe(),t=S().login,n=Object(a.useState)(!1),o=Object(l.a)(n,2),i=o[0],c=o[1],s=Object(a.useState)({}),u=Object(l.a)(s,2),p=u[0],d=u[1],h=Object(a.useState)(!0),f=Object(l.a)(h,2),m=f[0],g=f[1],O={togglApiToken:e.togglApiToken,roundProjectMinutes:e.roundProjectDurationsDownToMinutes},y=function(){return c(!1)},b=function(){m&&(Be(p,"togglApiToken")&&(e.dispatch({type:"SET_TOGGL_API_TOKEN",token:p.togglApiToken}),t()),Be(p,"roundProjectMinutes")&&e.dispatch({type:"SET_ROUND_PROJECT_DURATIONS_DOWN_TO_MINUTES",minutes:p.roundProjectMinutes}),r.a.success("Successfully updated settings"),y())},v=function(){y()},j=function(){e.dispatch({type:"RESET"}),t(),y()};return a.createElement(a.Fragment,null,a.createElement(Ue.a,{type:"setting",theme:"outlined",className:ze.a.icon,onClick:function(){return c(!0)}}),a.createElement(Ke.a,{title:"Settings",footer:a.createElement(a.Fragment,null,a.createElement(Fe.a,{ghost:!0,type:"danger",className:ze.a.restoreSettingsButton,onClick:j},"Reset defaults"),a.createElement(Fe.a,{onClick:v},"Cancel"),a.createElement(Fe.a,{type:"primary",disabled:!m,onClick:b},"Save")),visible:i,destroyOnClose:!0,maskClosable:!1,onCancel:v},a.createElement(Je,{initialValues:O,onFormFieldChanged:function(e,t){d(e),g(t)},onSave:b})))};function Xe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ze(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Xe(n,!0).forEach((function(t){Object($.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Xe(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var $e,et,tt=Y({avatarContainer:Ze({left:25},V),navbarCenter:{textAlign:"center"},navbarTitle:Ze({color:"white",textTransform:"uppercase",padding:"0 10px"},J),optionsContainer:Ze({marginTop:5,right:25},V)}),nt=($e=B(),et=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(m.a)(this,Object(g.a)(t).call(this,e))).state={isSmallWidth:!0},n}return Object(O.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){var e=this.props.user,t=void 0===e?"":"".concat(e.fullName," (").concat(e.email,")"),n=void 0===e?void 0:e.imageUrl,r=this.state.isSmallWidth?"bottomRight":"right";return a.createElement(a.Fragment,null,a.createElement(Re,{mediaQuery:"(max-width: 500px)",onChange:this.handleWidthMediaQueryChanged}),a.createElement("div",{style:tt.avatarContainer},a.createElement(xe.a,{title:t,placement:r,autoAdjustOverflow:!0},a.createElement(We.a,{size:"small",src:n}))),a.createElement("div",{style:tt.navbarCenter},a.createElement("h1",{style:tt.navbarTitle},"Toggl Easy Reports")),a.createElement("div",{style:tt.optionsContainer},a.createElement(qe,null)))}},{key:"handleWidthMediaQueryChanged",value:function(e){this.setState({isSmallWidth:e})}}]),t}(a.Component),Object(P.a)(et.prototype,"handleWidthMediaQueryChanged",[$e],Object.getOwnPropertyDescriptor(et.prototype,"handleWidthMediaQueryChanged"),et.prototype),et),rt=n(338),at=function(e){function t(){return Object(h.a)(this,t),Object(m.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(O.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return a.createElement(rt.a,{type:"error",message:"Could not login",description:this.renderDescription()})}},{key:"renderDescription",value:function(){return a.createElement(a.Fragment,null,a.createElement("p",null,a.createElement("span",null,"Please enter a valid Toggl API token in the settings."),"\xa0",a.createElement("span",null,"Click on ",a.createElement(Ue.a,{type:"setting",theme:"outlined"})," top right.")),a.createElement("p",null,a.createElement("span",null,"Get your API token"),"\xa0",a.createElement("a",{href:"https://track.toggl.com/app/profile",rel:"noopener noreferrer",target:"_blank"},"here"),"."))}}]),t}(a.Component),ot=function(){var e,t=S(),n=t.userState,i=t.login;switch(Object(a.useEffect)((function(){i()}),[i]),Object(a.useEffect)((function(){switch(n.authState){case"LOGGED_IN":r.a.success("Successfully logged in, ".concat(n.user.fullName,"!"));break;case"LOGGED_OUT":r.a.success("Successfully logged out!");break;case"LOGGING_IN":r.a.loading("Logging in...");break;case"LOGIN_FAILED":r.a.error("Please enter a valid API key!")}}),[n]),n.authState){case"LOGGED_IN":e=o.a.createElement(De,{user:n.user});break;case"LOGIN_FAILED":case"LOGGED_OUT":e=o.a.createElement(at,null);break;case"LOGGING_IN":e=o.a.createElement(Me,null)}return o.a.createElement(s.a,{className:D.a.layout},o.a.createElement(s.a.Header,{className:D.a.header},o.a.createElement(nt,{user:n.user})),o.a.createElement(s.a.Content,{className:D.a.content},e),o.a.createElement(s.a.Footer,{className:D.a.footer},o.a.createElement(Le,null)))};n(332),n(333);r.a.config({maxCount:1,top:45}),c.a.render(o.a.createElement((function(e){var t=Object(a.useState)(re()),n=Object(l.a)(t,1)[0],r=Object(a.useReducer)(ne,n);return o.a.createElement(ae.Provider,{value:r},e.children)}),null,o.a.createElement((function(e){var t=Object(a.useReducer)(_,{user:void 0,authState:"LOGGED_OUT"});return o.a.createElement(w.Provider,{value:t},e.children)}),null,o.a.createElement(ot,null))),document.getElementById("root"))},81:function(e,t,n){e.exports={layout:"App_layout__1DIBs",header:"App_header__3MgOT",content:"App_content__11LHs",innerContent:"App_innerContent__3mfR7",footer:"App_footer__10-3F"}}},[[170,1,2]]]);
//# sourceMappingURL=main.727d75e2.chunk.js.map