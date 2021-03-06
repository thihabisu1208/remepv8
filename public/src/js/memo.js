new Vue({
	el: '#memo',
	data: {
		shoppingData: '',
		user: {},
		tabs: [
			{
				title: 'コンビニ'
			},
			{
				title: 'スーパー'
			},
			{
				title: 'デパート'
			},
			{
				title: 'ドンキホーテ'
			}
		],
		memos: [
			{
				naiyou: 'Shift押しながらクリックすると消えるよ',
				check: true
			},
			{
				naiyou: '新聞',
				check: false
			},
			{
				naiyou: 'シャンプー',
				check: true
			}
		],
		modal: false,
		input: '',
		send: false
	},
	methods: {
		viewSend() {
			if (this.send) {
				this.send = false;
			} else {
				this.send = !this.send;
			}
		},
		tabplus() {
			let target = document.querySelector('.modal_inner_form_select select')
				.value;
			this.tabs.push({
				title: target
			});
			this.modal = false;
		}
	},
	created() {
		//     firebase.auth().onAuthStateChanged(user => {
		//   this.user = user ? user : {}
		// })
	}
});

// Listen to Auth State Changed
auth.onAuthStateChanged(user => {
	if (user) {
		displayMemo();
	} else {
		alert('ログインしてください');
		window.location = '/index.html';
	}
});

function displayMemo() {
	var shoppingData;
	var appData = database.ref();
	appData.on('value', function(event) {
		shoppingData = event.val();
	});

	// Showing Panels
	const tabsLi = document.querySelectorAll('.tabs li');
	const panels = document.querySelectorAll('.memoData');
	for (var i = 0; i < tabsLi.length; i++) {
		tabsLi[i].addEventListener('click', function(e) {
			if (e.target.tagName == 'LI') {
				const targetPanel = document.querySelector(e.target.dataset.target);
				panels.forEach(function(panel) {
					if (panel == targetPanel) {
						panel.classList.add('showMemoData');
					} else {
						panel.classList.remove('showMemoData');
					}
				});
			}
		});
	}

	// Displaying Convenience Stores
	let memoListKonbini = document.querySelector('#memoListKonbini');
	appData.on('value', function(event) {
		memoListKonbini.innerHTML = '';
		shoppingData = event.val();
		var convenienceStoreData = shoppingData.userData.convenienceStore;
		if (convenienceStoreData != null) {
			var convenienceStoreDataKeys = Object.keys(
				shoppingData.userData.convenienceStore
			);
			console.log(convenienceStoreDataKeys);
			if (convenienceStoreDataKeys.length != 0) {
				for (var i = 0; i < convenienceStoreDataKeys.length; i++) {
					memoListKonbini.innerHTML += `<li class="memo_list_inner"><div class="memo_list_inner_naiyou"><p class="convenienceStoreMemo">${convenienceStoreData[i].name}</p></div><div class="memo_list_inner_check"><i class="fas fa-check"></i></div></li>`;
				}

				var convenienceStoreItems = document.querySelectorAll(
					'.memo_list_inner'
				);
				for (var c = 0; c < convenienceStoreItems.length; c++) {
					convenienceStoreItems[c].addEventListener('click', function(e) {
						var clickedPostId = e.target.id;
						var refDB = firebase
							.database()
							.ref('userData/')
							.child('convenienceStore/' + clickedPostId);
						refDB
							.remove()
							.then(function() {
								alert('メモが消されました');
							})
							.catch(function(error) {
								alert('Remove failed: ' + error.message);
							});
					});
				}
			}
		}
	});

	// Display Supermarkets
	let memoListSuper = document.querySelector('#memoListSuper');
	appData.on('value', function(event) {
		memoListSuper.innerHTML = '';
		shoppingData = event.val();
		var superMarketData = shoppingData.userData.superMarket;
		if (superMarketData != null) {
			var superMarketDataKeys = Object.keys(shoppingData.userData.superMarket);
			if (superMarketDataKeys.length != 0) {
				for (var i = 0; i < superMarketDataKeys.length; i++) {
					memoListSuper.innerHTML += `<li class="memo_list_inner"><div class="memo_list_inner_naiyou"><p>${superMarketData[i].name}</p></div><div class="memo_list_inner_check"><i class="fas fa-check"></i></div></li>`;
				}

				var superMarketItems = document.querySelectorAll('.memo_list_inner');
				for (var c = 0; c < superMarketItems.length; c++) {
					superMarketItems[c].addEventListener('click', function(e) {
						var clickedPostId = e.target.id;
						var refDB = firebase
							.database()
							.ref('userData/')
							.child('superMarket/' + clickedPostId);
						refDB
							.remove()
							.then(function() {
								alert('メモが消されました');
							})
							.catch(function(error) {
								alert('Remove failed: ' + error.message);
							});
					});
				}
			}
		}
	});

	// Display Department Stores
	let memoListDepart = document.querySelector('#memoListDepart');
	appData.on('value', function(event) {
		memoListDepart.innerHTML = '';
		shoppingData = event.val();
		var departStoreData = shoppingData.userData.departStore;
		if (departStoreData != null) {
			var departStoreDataKeys = Object.keys(shoppingData.userData.departStore);
			if (departStoreDataKeys.length != 0) {
				for (var i = 0; i < departStoreDataKeys.length; i++) {
					memoListDepart.innerHTML += `<li class="memo_list_inner"><div class="memo_list_inner_naiyou"><p>${departStoreData[i].name}</p></div><div class="memo_list_inner_check"><i class="fas fa-check"></i></div></li>`;
				}

				var departStoreItems = document.querySelectorAll('.memo_list_inner');
				for (var c = 0; c < departStoreItems.length; c++) {
					departStoreItems[c].addEventListener('click', function(e) {
						var clickedPostId = e.target.id;
						var refDB = firebase
							.database()
							.ref('userData/')
							.child('departStore/' + clickedPostId);
						refDB
							.remove()
							.then(function() {
								console.log('メモが消されました');
							})
							.catch(function(error) {
								alert('Remove failed: ' + error.message);
							});
					});
				}
			}
		}
	});

	// Display 100 Yen Shops
	let memoListDollarStore = document.querySelector('#memoListDollarStore');
	appData.on('value', function(event) {
		memoListDollarStore.innerHTML = '';
		shoppingData = event.val();
		var dollarStoreData = shoppingData.userData.dollarStore;
		if (dollarStoreData != null) {
			var dollarStoreDataKeys = Object.keys(shoppingData.userData.dollarStore);
			if (dollarStoreDataKeys.length != 0) {
				for (var i = 0; i < dollarStoreDataKeys.length; i++) {
					memoListDollarStore.innerHTML += `<li class="memo_list_inner"><div class="memo_list_inner_naiyou"><p>${dollarStoreData[i].name}</p></div><div class="memo_list_inner_check"><i class="fas fa-check"></i></div></li>`;
				}

				var dollarStoreItems = document.querySelectorAll('.memo_list_inner');
				for (var c = 0; c < dollarStoreItems.length; c++) {
					dollarStoreItems[c].addEventListener('click', function(e) {
						var clickedPostId = e.target.id;
						var refDB = firebase
							.database()
							.ref('userData/')
							.child('dollarStore/' + clickedPostId);
						refDB
							.remove()
							.then(function() {
								alert('メモが消されました');
							})
							.catch(function(error) {
								alert('Remove failed: ' + error.message);
							});
					});
				}
			}
		}
	});

	// Display Drug
	let memoListDrug = document.querySelector('#memoListDrug');
	appData.on('value', function(event) {
		memoListDrug.innerHTML = '';
		shoppingData = event.val();
		var drugStoreData = shoppingData.userData.drugStore;
		if (drugStoreData != null) {
			var drugStoreDataKeys = Object.keys(shoppingData.userData.drugStore);
			if (drugStoreDataKeys.length != 0) {
				for (var i = 0; i < drugStoreDataKeys.length; i++) {
					memoListDrug.innerHTML += `<li class="memo_list_inner"><div class="memo_list_inner_naiyou"><p>${drugStoreData[i].name}</p></div><div class="memo_list_inner_check"><i class="fas fa-check"></i></div></li>`;
				}

				var drugStoreItems = document.querySelectorAll('.memo_list_inner');
				for (var c = 0; c < drugStoreItems.length; c++) {
					drugStoreItems[c].addEventListener('click', function(e) {
						var clickedPostId = e.target.id;
						var refDB = firebase
							.database()
							.ref('userData/')
							.child('drugStore/' + clickedPostId);
						refDB
							.remove()
							.then(function() {
								alert('メモが消されました');
							})
							.catch(function(error) {
								alert('Remove failed: ' + error.message);
							});
					});
				}
			}
		}
	});

	// Display Donki
	let memoListDonki = document.querySelector('#memoListDonki');
	appData.on('value', function(event) {
		memoListDonki.innerHTML = '';
		shoppingData = event.val();
		var donkiData = shoppingData.userData.donki;
		if (donkiData != null) {
			var donkiDataKeys = Object.keys(shoppingData.userData.donki);
			if (donkiDataKeys.length != 0) {
				for (var i = 0; i < donkiDataKeys.length; i++) {
					memoListDonki.innerHTML += `<li class="memo_list_inner"><div class="memo_list_inner_naiyou"><p>${donkiData[i].name}</p></div><div class="memo_list_inner_check"><i class="fas fa-check"></i></div></li>`;
				}

				var donkiItems = document.querySelectorAll('.memo_list_inner');
				for (var c = 0; c < donkiItems.length; c++) {
					donkiItems[c].addEventListener('click', function(e) {
						var clickedPostId = e.target.id;
						var refDB = firebase
							.database()
							.ref('userData/')
							.child('donki/' + clickedPostId);
						refDB
							.remove()
							.then(function() {
								alert('メモが消されました');
							})
							.catch(function(error) {
								alert('Remove failed: ' + error.message);
							});
					});
				}
			}
		}
	});

	// Create New Convenience Store Memo
	let memoInputKonbini = document.querySelector('#memoInputKonbini');
	memoInputKonbini.addEventListener('keyup', function(event) {
		if (event.keyCode == 13) {
			var content = String(memoInputKonbini.value);
			if (shoppingData.userData.convenienceStore == undefined) {
				shoppingData.userData.convenienceStore = [
					{
						name: content,
						checked: false
					}
				];
			} else {
				shoppingData.userData.convenienceStore.push({
					name: content,
					checked: false
				});
			}
			appData.set(shoppingData);
			memoInputKonbini.value = '';
		}
	});

	// Create New Supermarket Memo
	let memoInputSuper = document.querySelector('#memoInputSuper');
	memoInputSuper.addEventListener('keyup', function(event) {
		if (event.keyCode == 13) {
			var content = String(memoInputSuper.value);
			if (shoppingData.userData.superMarket == undefined) {
				shoppingData.userData.superMarket = [
					{
						name: content,
						checked: false
					}
				];
			} else {
				shoppingData.userData.superMarket.push({
					name: content,
					checked: false
				});
			}
			appData.set(shoppingData);
			memoInputSuper.value = '';
		}
	});

	// Create New Department Store Memo
	let memoInputDepart = document.querySelector('#memoInputDepart');
	memoInputDepart.addEventListener('keyup', function(event) {
		if (event.keyCode == 13) {
			var content = String(memoInputDepart.value);
			if (shoppingData.userData.departStore == undefined) {
				shoppingData.userData.departStore = [
					{
						name: content,
						checked: false
					}
				];
			} else {
				shoppingData.userData.departStore.push({
					name: content,
					checked: false
				});
			}
			appData.set(shoppingData);
			memoInputDepart.value = '';
		}
	});

	// Create New Dollar Store Memo
	let memoInputDollarStore = document.querySelector('#memoInputDollarStore');
	memoInputDollarStore.addEventListener('keyup', function(event) {
		if (event.keyCode == 13) {
			var content = String(memoInputDollarStore.value);
			if (shoppingData.userData.dollarStore == undefined) {
				shoppingData.userData.dollarStore = [
					{
						name: content,
						checked: false
					}
				];
			} else {
				shoppingData.userData.dollarStore.push({
					name: content,
					checked: false
				});
			}
			appData.set(shoppingData);
			memoInputDollarStore.value = '';
		}
	});

	// Create New Drug Store Memo
	let memoInputDrug = document.querySelector('#memoInputDrug');
	memoInputDrug.addEventListener('keyup', function(event) {
		if (event.keyCode == 13) {
			var content = String(memoInputDrug.value);
			if (shoppingData.userData.drugStore == undefined) {
				shoppingData.userData.drugStore = [
					{
						name: content,
						checked: false
					}
				];
			} else {
				shoppingData.userData.drugStore.push({
					name: content,
					checked: false
				});
			}
			appData.set(shoppingData);
			memoInputDrug.value = '';
		}
	});

	// Create New Donki Store Memo
	let memoInputDonki = document.querySelector('#memoInputDonki');
	memoInputDonki.addEventListener('keyup', function(event) {
		if (event.keyCode == 13) {
			var content = String(memoInputDonki.value);
			if (shoppingData.userData.donki == undefined) {
				shoppingData.userData.donki = [
					{
						name: content,
						checked: false
					}
				];
			} else {
				shoppingData.userData.donki.push({
					name: content,
					checked: false
				});
			}
			appData.set(shoppingData);
			memoInputDonki.value = '';
		}
	});
}
