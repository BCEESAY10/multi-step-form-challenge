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

//Select plan section
function selectPlan() {
    personalInfoStep.style.display = 'none';
    one.classList.remove('active');
    two.classList.add('active');
    planStep.style.display = 'block';
}

//Add-ons section
function addOns() {
    planStep.style.display = 'none';
    two.classList.remove('active');
    three.classList.add('active');
    document.getElementById('add-on').style.display = 'block';
}

//Summary section
function summary() {
    document.getElementById('add-on').style.display = 'none';
    three.classList.remove('active');
    four.classList.add('active');
    document.getElementById('summary').style.display = 'block';
}

//Return from plan section to personal info section when back button is clicked
document.getElementById('plan-back').addEventListener('click', (event) => {
    event.preventDefault();
    personalInfoStep.style.display = 'block';
    one.classList.add('active');
    two.classList.remove('active');
    planStep.style.display = 'none';
});

//Move from plan section to add-ons section when next button is clicked
const planError = document.getElementById('plan-error');
const planControls = document.getElementById('plan-controls');
document.getElementById('plan-next').addEventListener('click', (event) => {
    event.preventDefault();
    if (cardSelected) {
        planError.innerText = '';
        addOns();
    } else {
        planControls.style.marginTop = '-2em';
        planError.innerText = 'Please select a plan before proceeding.';
    }
});

//Return from add-ons section to plan section when back button is clicked
document.getElementById('add-back').addEventListener('click', (event) => {
    event.preventDefault();
    planStep.style.display = 'block';
    two.classList.add('active');
    three.classList.remove('active');
    document.getElementById('add-on').style.display = 'none';
});

//Move from add-ons section to summary section when next button is clicked
document.getElementById('add-next').addEventListener('click', (event) => {
    event.preventDefault();
    summary();
});

//Return from summary section to add-ons section when back button is clicked
document.getElementById('confirm-back').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('add-on').style.display = 'block';
    three.classList.add('active');
    four.classList.remove('active');
    document.getElementById('summary').style.display = 'none';
});

//Move from summary section to success section when confirm button is clicked
document.getElementById('confirm').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('summary').style.display = 'none';
    document.getElementById('success').style.display = 'block';
});


//Set Functionalities for the plan section
//Whhen yearly is selected, the monthly price is replaced with the yearly price
//When another card is clicked, the active class is removed from the previous card and added to the new card


const toggleSwitch = document.getElementById('toggle-switch');
const fees = document.getElementsByClassName('fee');
const bonuses = document.getElementsByClassName('bonus');

toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('yearly').style.color = 'hsl(213, 96%, 18%)';
    document.getElementById('monthly').style.color = 'hsl(231, 11%, 63%)';
    document.getElementById('monthly').style.fontWeight = '500';
    document.getElementById('yearly').style.fontWeight = '600';

    
        fees[0].innerText = '$90/year';
        fees[1].innerText = '$120/year';
        fees[2].innerText = '$150/year';
    

    for(let i = 0; i < bonuses.length; i++) {
        bonuses[i].innerText = '2 months free';
    }

  } else {
    document.getElementById('monthly').style.color = 'hsl(213, 96%, 18%)';
    document.getElementById('yearly').style.color = 'hsl(231, 11%, 63%)';
    document.getElementById('monthly').style.fontWeight = '600';
    document.getElementById('yearly').style.fontWeight = '500';

        fees[0].innerText = '$9/mo';
        fees[1].innerText = '$12/mo';
        fees[2].innerText = '$15/mo';
    

   for(let i = 0; i < bonuses.length; i++) {
        bonuses[i].innerText = '';
   }
  }
});


//Click card to be active
const cards = document.querySelectorAll('.card');
let cardSelected = false;

cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(card => card.classList.remove('active'));
        card.classList.add('active');
        cardSelected = true;
    });
});