/*!
 * jRaiser 2 Javascript Library
 * validator-step - v1.0.0 (2013-10-06T10:41:35+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("validator/1.0.x/step",["dom/1.0.x/","ajax/1.1.x/","widget/1.0.x/",null],function(e,t,n){"use strict";function u(e,t){var n,i,s=[];r.isArray(e)&&(n=e,e={},e[t]=n);for(t in e){n=e[t];for(i=0;i<n.length;i++)n[i]!=null&&s.push({name:t,value:n[i]})}return s}var r=e("base/1.0.x/"),i=e("dom/1.0.x/"),s=e("ajax/1.1.x/"),o=e("widget/1.0.x/"),a=0;return o.create(function(e){},{_init:function(e){var t=this;t._id=++a,t._vOptions={},t._fields=e.fields||[],typeof t._fields=="string"&&(t._fields=t._fields.split(/\s+/)),t._rule=e.rule;if(typeof t._rule=="string"){var n=[];t._ruleNames=[];var r=t._rule.replace(/(\w+)(?::([^!&|()]+))?/g,function(e,r,i){t._ruleNames.push(r);var s="_helpers_."+r+"(_val_";return i&&(s+=",_refVars_["+(n.push(i)-1)+"]"),s+=")",s}),i=new Function("_val_","_refVars_","_helpers_","return "+r+";");r=null,n.length||(n=null),t._rule=function(e,t){return i(e,n,t)}}e.stepDisabled?t.disableStep():t.enableStep()},_destroy:function(e){delete this._id,delete this._vOptions,delete this._fields,delete this._rule,delete this._ruleNames,delete this._message,delete this._stepDisabled,delete this._remoteCache},id:function(){return this._id},fields:function(){return this._fields.slice()},isRemote:function(){return!!this._options.remoteURL},stepDisabled:function(){return this._stepDisabled},enableStep:function(){this._stepDisabled=!1},disableStep:function(){this._stepDisabled=!0},syncWithValidator:function(e){this._vOptions=r.extend({},e)},exec:function(e,t,n,i){var o=this;if(o.stepDisabled())return 0;var a=o._ruleNames;if(a)for(var f=a.length-1;f>=0;f--)if(!n[a[f]])throw new Error("not such rule("+a[f]+")");o.trigger("beforevalidate",{elements:e.slice()});var l=this._fields,c=l.length;c===1&&(t=t[l[0]]);var h=o._options,p=!0,d;if(c!==1||h.oneByOne===!1||h.remoteURL){c===1&&h.required!==!1&&(p=t.length>0&&t.join("")!=="");if(p&&o._rule)if(h.remoteURL){var v=function(t){o._remoteCache=t,o._message=o._rule.call(window,t);if(o._message)return o._error(e.slice(),!0);o._correct(e.slice(),!0),v=null};if(!i){o._beforeSend(e.slice()),s.send(h.remoteURL,r.mix({data:u(t,l[0]),onsuccess:v},h.ajaxSettings||o._vOptions.ajaxSettings,{overwrite:!1}));return}if("_remoteCache"in o)return v(o._remoteCache)}else{var m;switch(c){case 0:m=[];break;case 1:m=[t.slice()];break;default:m=l.map(function(e){return t[e]?t[e].slice():null})}m.push(n),p=o._rule.apply(window,m),typeof p=="string"&&(o._message=p,p=!1)}p||(d=e.slice())}else{p=h.required===!1||t.length>0;if(p){var d=[];t.every(function(t,r){var i,s=t===""||t==null;if(h.required===!1){if(s)return!0;i=!0}else i=!s;return i&&t!=null&&o._rule&&(i=o._rule.call(window,t,n)),i||d.push(e[r]),p=p&&i,i||!o._vOptions.breakOnError})}else d=e.slice()}if(!p)return o._error(d,!0);o._correct(e.slice())},_makeEventArg:function(e){return e.stepId=this.id(),this._options.eventElements&&(e.elements=r.toArray(i(e.elements).filter(this._options.eventElements))),e},_beforeSend:function(e){var t=this._makeEventArg({elements:e});return this._options.eventMode==1&&this._vOptions.beforeSend&&this._vOptions.beforeSend.call(window,t),this.trigger("beforesend",t),t},_error:function(e,t){var n=this._makeEventArg({elements:e,isRemote:!!t,message:this._message||this._options.message});return this._options.eventMode==1&&this._vOptions.onError&&this._vOptions.onError.call(window,n),this.trigger("error",n),n},_correct:function(e,t){var n=this._makeEventArg({elements:e,isRemote:!!t});return this._options.eventMode==1&&this._vOptions.onCorrect&&this._vOptions.onCorrect.call(window,n),this.trigger("correct",n),n}},{eventMode:1})})