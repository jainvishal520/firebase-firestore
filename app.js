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
db.collection('cafes').where('city', '==', 'noida').orderBy('name').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc)
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


