import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');
    const stateInput = document.querySelector('input[name="state"]:checked');

    if (delayInput && stateInput) {
      const delay = parseInt(delayInput.value);
      const state = stateInput.value;

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });

      promise.then(
        delay => {
          iziToast.success({
            title: 'OK',
            message: `✅ Fulfilled promise in  ${delay}ms`,
            position: 'topRight',
          });
        },
        delay => {
          iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
          });
        }
      );
    } else {
      console.log('error');
    }
  });
});
