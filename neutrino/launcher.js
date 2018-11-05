require('__entry__');

if (module.hot) {
	require('webpack/hot/log').setLogLevel('none');
	module.hot.accept('__entry__', function () {
		console.clear(); // eslint-disable-line no-console
		try {
			require('__entry__');
		}
		catch (err) {
			console.error(err);
		}
	});
}