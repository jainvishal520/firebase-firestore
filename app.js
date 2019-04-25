// we receive snapshot back of the database
// snapshot is basically just a representation of different data inside the collection

// ------- Getting all the documents in the collection ---------
// db.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     })
// })

// // ------- Getting the documents depending on the condition ---------
// db.collection('cafes').where('city', '==', 'noida').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {rr
//         renderCafe(doc)
//     })
// })

// ------- Getting the documents by using orderBy ---------
// db.collection('cafes').where('city', '==', 'noida').orderBy('name').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     })
// })

// ----- Realtime db/ realtime listener -----
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data())
        if(change.type == 'added'){
            renderCafe(change.doc)
        } else if(change.type == 'removed') {
            let li = cafeList.querySelector(`[data-id = ${change.doc.id}]`);
            cafeList.removeChild(li);
        }
    })
})


const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';


    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);


    cafeList.appendChild(li);

    cross.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    })
    form.name.value = '';
    form.city.value = '';
})


//Update and set

//1. update allows you to update one or two  properties without afecting the rest of the document.
//2. set will overwrite completely the whole document, regardless of which property you want to update

// ----- Update ----
// db.collection('cafes').doc('iZM314LPCokOWzbyyFtZ').update({
//     name:'jain'
// })

// ----- Set ----
// db.collection('cafes').doc('iZM314LPCokOWzbyyFtZ').set({
//     name:'jain',
//     city:'noida'
// })