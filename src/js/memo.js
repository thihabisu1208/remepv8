// Listen to Auth State Changed
auth.onAuthStateChanged(user => {
    if (user) {
        // Display Data
        db.collection('memo').onSnapshot(snapshot => {
            setUpMemo(snapshot.docs);
        }, err => {
            console.log(err.message);
        });
    } else {
        setUpMemo([]);
    }
});

// Displaying Memo
const memoListKonbini = document.querySelector('#memoListKonbini');

let setUpMemo = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const memo = doc.data();
            const li = `
                <li class="memo">${memo.convinence}</li>
            `;
            html += li;
        });

        memoListKonbini.innerHTML = html;
    } else {
        memoListKonbini.innerHTML = '<h5 class="center-align">No Memo</h5>'
    }
};

const memoListSuper = document.querySelector('#memoListSuper');

setUpMemo = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const memo = doc.data();
            const li = `
                <li class="memo">${memo.super}</li>
            `;
            html += li;
        });

        memoListSuper.innerHTML = html;
    } else {
        memoListSuper.innerHTML = '<h5 class="center-align">No Memo</h5>'
    }
};

const memoListDrug = document.querySelector('#memoListDrug');

setUpMemo = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const memo = doc.data();
            const li = `
                <li class="memo">${memo.drug}</li>
            `;
            html += li;
        });

        memoListDrug.innerHTML = html;
    } else {
        memoListDrug.innerHTML = '<h5 class="center-align">No Memo</h5>'
    }
};

const memoListDepart = document.querySelector('#memoListDepart');

setUpMemo = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const memo = doc.data();
            const li = `
                <li class="memo">${memo.depart}</li>
            `;
            html += li;
        });

        memoListDepart.innerHTML = html;
    } else {
        memoListDepart.innerHTML = '<h5 class="center-align">No Memo</h5>'
    }
};

// Create New Memo
const memoInputKonbini = document.querySelector('#memoInputKonbini');
memoInputKonbini.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        db.collection('memo').add({
                convinence: memoInputKonbini.value
            })
            .catch(err => {
                console.log(err.message);
            })
    }
});

const memoInputSuper = document.querySelector('#memoInputSuper');
memoInputSuper.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        db.collection('memo').add({
                super: memoInputSuper.value
            })
            .catch(err => {
                console.log(err.message);
            })
    }
});

const memoInputDrug = document.querySelector('#memoInputDrug');
memoInputDrug.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        db.collection('memo').add({
                drug: memoInputDrug.value
            })
            .catch(err => {
                console.log(err.message);
            })
    }
});

const memoInputDepart = document.querySelector('#memoInputDepart');
memoInputDepart.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        db.collection('memo').add({
                depart: memoInputDepart.value
            })
            .catch(err => {
                console.log(err.message);
            })
    }
});