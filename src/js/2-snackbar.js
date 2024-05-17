import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const delay = parseInt(form.elements.delay.value);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay)
    })

    promise
        .then(delay => {
            iziToast.show({
                title: '✅',
                message: ` Fulfilled promise in ${delay}ms`,
                backgroundColor: '#59A10D',
                messageColor: '#FFF',
            })
        })
        .catch(delay => {
            iziToast.show({
                title: '❌',
                message: ` Rejected promise in ${delay}ms`,
                backgroundColor: '#EF4040',
                messageColor: '#FFF',
            });
        });
});







// iziToast.show({
//     title: 'Hey',
//     message: 'What would you like to add?'
// });