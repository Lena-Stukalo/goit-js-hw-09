let delayCounter = 3000;

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submit: document.querySelector('button'),
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  // for (let amountCounter = 1; amountCounter <= 5; amountCounter += 1) {
  //   createPromise(amountCounter, delayCounter)
  //     .then(({ position, delay }) => {
  //       console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  //     })
  //     .catch(({ position, delay }) => {
  //       console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  //     });
  // }
}
