console.log('pagefly script injected')
if (window.location.href.includes('pagefly.io/index.php')) {
	window.addEventListener('load', () => {
		const $ = window.jQuery
		const topBar = document.getElementsByClassName('pb-top-bar__list')[0]
		const easterStatus = localStorage.getItem('easter-enable') === 'true'
		if (!easterStatus) {
			turnOffEaster()
		}
		console.log('easterStatus', easterStatus)
		$(topBar).prepend('<div class="pb-top-bar__item" style="color: white"><input type="checkbox" ' + (easterStatus ? 'checked' : "") + ' id="pb-ext-enable-gift" /> Enable Easter Gift</div>')
		$('#pb-ext-enable-gift').on('change', (e) => {
			console.log('easter status change::', e.target.checked)
			toggleEaster(e.target.checked)
		})
	})
}

function toggleEaster(on = false) {
	if (on) {
		localStorage.setItem('easter-enable', 'true')
		window.location.reload()
	} else {
		turnOffEaster()
	}
}

function turnOffEaster() {
	const x = setTimeout(() => {
		if (window.giftStore) {
			console.log('turned of easter gift')
			window.giftStore.off()
			localStorage.setItem('easter-enable', 'false')
			clearInterval(x)
		}
	}, 1000)
}