let path = require('path');

let node = require('@neutrinojs/node');
let clean = require('@neutrinojs/clean');
let banner = require('@neutrinojs/banner');

module.exports = function (neutrino) {
	const NODE_MODULES = path.resolve(__dirname, '../node_modules');
	const LAUNCHER_PATH = path.resolve(__dirname, './launcher.js');
	let devRun = process.env.NODE_ENV === 'development';

	neutrino.use(node, {
		hot: devRun,
		targets: {
			node: process.versions.node
		}
	});
	neutrino.use(clean, {
		paths: [neutrino.options.output]
	});
	neutrino.use(banner, { pluginId: 'sourcemaps' });

	Object.keys(neutrino.options.mains).forEach(function (key) {
		neutrino.config
			.entry(key)
				.clear()
				.add(LAUNCHER_PATH)
				.when(devRun, function (entry) {
					entry.add(`${require.resolve('webpack/hot/poll')}?1000`);
				})
				.end()
			.resolve.alias
				.set('__entry__', require.resolve(neutrino.options.mains[key]))
				.when(devRun, function (alias) {
					alias.set('webpack/hot/log', require.resolve('webpack/hot/log'));
				});
	});

	neutrino.config
		.devtool('source-map')
		.resolve.modules
			.add(NODE_MODULES)
			.end().end()
		.resolveLoader.modules
			.add(NODE_MODULES)
			.end().end();
};