// This file was generated by modules-webmake (modules for web) project.
// See: https://github.com/medikoo/modules-webmake

(function (modules) {
	'use strict';

	var resolve, getRequire, wmRequire, notFoundError, findFile
	  , extensions = {".js":[],".json":[],".css":[],".html":[]}
	  , envRequire = typeof require === 'function' ? require : null;

	notFoundError = function (path) {
		var error = new Error("Could not find module '" + path + "'");
		error.code = 'MODULE_NOT_FOUND';
		return error;
	};
	findFile = function (scope, name, extName) {
		var i, ext;
		if (typeof scope[name + extName] === 'function') return name + extName;
		for (i = 0; (ext = extensions[extName][i]); ++i) {
			if (typeof scope[name + ext] === 'function') return name + ext;
		}
		return null;
	};
	resolve = function (scope, tree, path, fullPath, state, id) {
		var name, dir, exports, module, fn, found, ext;
		path = path.split(/[\\/]/);
		name = path.pop();
		if ((name === '.') || (name === '..')) {
			path.push(name);
			name = '';
		}
		while ((dir = path.shift()) != null)  {
			if (!dir || (dir === '.')) continue;
			if (dir === '..') {
				scope = tree.pop();
				id = id.slice(0, id.lastIndexOf('/'));
			} else {
				tree.push(scope);
				scope = scope[dir];
				id += '/' + dir;
			}
			if (!scope) throw notFoundError(fullPath);
		}
		if (name && (typeof scope[name] !== 'function')) {
			found = findFile(scope, name, '.js');
			if (!found) found = findFile(scope, name, '.json');
			if (!found) found = findFile(scope, name, '.css');
			if (!found) found = findFile(scope, name, '.html');
			if (found) {
				name = found;
			} else if ((state !== 2) && (typeof scope[name] === 'object')) {
				tree.push(scope);
				scope = scope[name];
				id += '/' + name;
				name = '';
			}
		}
		if (!name) {
			if ((state !== 1) && scope[':mainpath:']) {
				return resolve(scope, tree, scope[':mainpath:'], fullPath, 1, id);
			}
			return resolve(scope, tree, 'index', fullPath, 2, id);
		}
		fn = scope[name];
		if (!fn) throw notFoundError(fullPath);
		if (fn.hasOwnProperty('module')) return fn.module.exports;
		exports = {};
		fn.module = module = { exports: exports, id: id + '/' + name };
		fn.call(exports, exports, module, getRequire(scope, tree, id));
		return module.exports;
	};
	wmRequire = function (scope, tree, fullPath, id) {
		var name, path = fullPath, t = fullPath.charAt(0), state = 0;
		if (t === '/') {
			path = path.slice(1);
			scope = modules['/'];
			if (!scope) {
				if (envRequire) return envRequire(fullPath);
				throw notFoundError(fullPath);
			}
			id = '/';
			tree = [];
		} else if (t !== '.') {
			name = path.indexOf('@') === 0 ? path.split('/', 2).join("/") : path.split('/', 1)[0];
			scope = modules[name];
			if (!scope) {
				if (envRequire) return envRequire(fullPath);
				throw notFoundError(fullPath);
			}
			id = name;
			tree = [];
			path = path.slice(name.length + 1);
			if (!path) {
				path = scope[':mainpath:'];
				if (path) {
					state = 1;
				} else {
					path = 'index';
					state = 2;
				}
			}
		}
		return resolve(scope, tree, path, fullPath, state, id);
	};
	getRequire = function (scope, tree, id) {
		var localRequire = function (path) {
			return wmRequire(scope, [].concat(tree), path, id);
		};
		if (envRequire) localRequire.fromParentEnvironment = envRequire;
		return localRequire
	};
	return getRequire(modules, [], '');
})
({
	"Desktop": {
		"NeurinoJS": {
			"eNeuron.js": function (exports, module, require) {
				
				const eSyn = require('./eSyn.js');
				
				module.exports = class eNeuron {
					constructor(){
						this.V=0;
						this.Isyn=0;
						this.Vrest=0.5;
						this.Vreset=-1;
						this.Vthresh=1;
						this.C=0.5;
						this.R=1;
						this.type="LIF";
						this.OutSyns=[];
						this.InSyns=[];
						this.connectTo=function(neuron){
							this.OutSyns.push(new eSyn(neuron))
							neuron.InSyns.push(this.OutSyns[this.OutSyns.length-1])
						}
				
						this.update=function(Iext,dt){
							this.OutSyns.forEach((syn, i) => syn.update(dt));
							this.V+=((Iext+this.Isyn+((this.Vrest-this.V)/this.R))/this.C)*dt;
							if (this.V>this.Vthresh){
								this.V=this.Vreset;
								this.OutSyns.forEach((syn, i) => syn.fire());
								//console.log("fire !")
							}
						}
						this.computeIsyn=function(){
							this.Isyn=0;
							for (const syn of this.InSyns) { this.Isyn+=syn.I }
						}
					}
				}
			},
			"eSyn.js": function (exports, module, require) {
				module.exports =class eSyn {
					constructor(neuron){
						this.I=0;
						this.I0=0.9;
						this.tau=0.5;
						this.OutNeuron=neuron;
						this.update=function(dt){
							this.I=this.I*Math.exp(-dt/this.tau);
						};
						this.fire=function(){
							this.I+=this.I0;
						};
					}
				}
			},
			"test.js": function (exports, module, require) {
				//const { performance } = require('perf_hooks'); //apparently no need to import it ?
				
				
				
				const eNeuron = require('./eNeuron.js');
				const eSyn = require('./eSyn.js');
				
				n1=new eNeuron();
				n2=new eNeuron();
				
				n1.connectTo(n2);
				n2.connectTo(n1);
				n2.OutSyns[0].I0=-0.02;
				n2.OutSyns[0].tau=15;
				
				console.log(n1.OutSyns);
				let dt=0.02;
				var t=0;
				
				var startTime = performance.now()
				
				for (i=0;i<20/dt;i++){
					t+=dt;
					n1.computeIsyn();
					n2.computeIsyn();
					n1.update(0.9,dt);
					n2.update(0,dt);
					console.log(t+" "+n1.V+" "+n2.V+" "+n1.OutSyns[0].I+" "+n2.OutSyns[0].I);
				}
				
				function mafonction(){
					for (i=0;i<20/dt;i++){
						t+=dt;
						n1.computeIsyn();
						n2.computeIsyn();
						n1.update(0.9,dt);
						n2.update(0,dt);
						console.log(t+" "+n1.V+" "+n2.V+" "+n1.OutSyns[0].I+" "+n2.OutSyns[0].I);
					}
				}
				
				
				var endTime = performance.now()
				
				console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
				
				console.log("Bondour")
				//console.log(n1);
				//console.log(n2);
			}
		}
	}
})("Desktop/NeurinoJS/test");
