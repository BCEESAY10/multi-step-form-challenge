const nextButton = document.getElementById('next');
const inputFields = document.getElementsByTagName('input');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const personalInfoStep = document.getElementById('personal-info');
const planStep = document.getElementById('select-plan');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');

nextButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    validateForm();
});

const setError = (element, message) => {
    const formGroup = element.parentElement;
    const error = formGroup.querySelector('.error');

    error.innerText = message;
};

const setSuccess = (element) => {
    const formGroup = element.parentElement;
    const error = formGroup.querySelector('.error');

    error.innerText = '';
};

const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
};

function validateForm() {
    for(let i = 0; i < inputFields.length; i++) {
        let name = inputFields[i].value.trim();
        let email = inputFields[i+1].value.trim();
        let phone = inputFields[i+2].value.trim();

        //Name validation
        if(name === '') {
            setError(inputFields[i], 'Name is required');
            return;
        } else {
            setSuccess(inputFields[i]);
        }

        //Email validation
        if(email === '') {
            setError(inputFields[i+1], 'Email is required');
            return;
        } else if(!isValidEmail(email)) {
            setError(inputFields[i+1], 'Email is not valid');
            return;
        }else {
            setSuccess(inputFields[i+1]);
        }

        //Phone number validation
        if(phone === '') {
            setError(inputFields[i+2], 'Phone is required');
            return;
        } else if(phone.length < 7) {
            setError(inputFields[i+2], 'Phone number cannot be less than 7 digits');
            return;
        }else {    
            setSuccess(inputFields[i+2]);
        }

        //If all fields are valid, move to the next step
        selectPlan();
    }
    
}

function selectPlan() {
    personalInfoStep.style.display = 'none';
    one.classList.remove('active');
    two.classList.add('active');
    planStep.style.display = 'block';
}

function addOns() {
    planStep.style.display = 'none';
    two.classList.remove('active');
    three.classList.add('active');
    document.getElementById('add-on').style.display = 'block';
}

function summary() {
    document.getElementById('add-on').style.display = 'none';
    three.classList.remove('active');
    four.classList.add('active');
    document.getElementById('summary').style.display = 'block';
}


document.getElementById('plan-back').addEventListener('click', (event) => {
    event.preventDefault();
    personalInfoStep.style.display = 'block';
    one.classList.add('active');
    two.classList.remove('active');
    planStep.style.display = 'none';
});


document.getElementById('plan-next').addEventListener('click', (event) => {
    event.preventDefault();
    addOns();
});

document.getElementById('add-back').addEventListener('click', (event) => {
    event.preventDefault();
    planStep.style.display = 'block';
    two.classList.add('active');
    three.classList.remove('active');
    document.getElementById('add-on').style.display = 'none';
});

document.getElementById('add-next').addEventListener('click', (event) => {
    event.preventDefault();
    summary();
});

document.getElementById('confirm-back').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('add-on').style.display = 'block';
    three.classList.add('active');
    four.classList.remove('active');
    document.getElementById('summary').style.display = 'none';
});

document.getElementById('confirm').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('summary').style.display = 'none';
    document.getElementById('success').style.display = 'block';
});


//Set Functionalities for the plan section
//Whhen yearly is selected, the monthly price is replaced with the yearly price
//When another card is clicked, the active class is removed from the previous card and added to the new card


const toggleSwitch = document.getElementById('toggle-switch');

toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('yearly').style.color = 'hsl(213, 96%, 18%)';
    document.getElementById('monthly').style.color = 'hsl(231, 11%, 63%)';
    document.getElementById('monthly').style.fontWeight = '500';
    document.getElementById('yearly').style.fontWeight = '600';
  } else {
    document.getElementById('monthly').style.color = 'hsl(213, 96%, 18%)';
    document.getElementById('yearly').style.color = 'hsl(231, 11%, 63%)';
    document.getElementById('monthly').style.fontWeight = '600';
    document.getElementById('yearly').style.fontWeight = '500';
  }
});


//Click card to be active
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(card => card.classList.remove('active'));
        card.classList.add('active');
    });
});