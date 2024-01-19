import './css/bootstrap.css';
import { Modal, Collapse } from 'bootstrap';

import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item';

import './css/style.css';
import '@fortawesome/fontawesome-free/js/all';















`APP CLASS`
class App {
    constructor() {
        //Instantiate the calorie tracker object as a property of the app
        this._tracker = new CalorieTracker();

        // Load Event Listeners
        this.loadEventListeners();

        this._tracker.loadItems();

    }

    loadEventListeners() {
        document
            .getElementById('meal-form')
            .addEventListener('submit', this._newItem.bind(this, 'meal'));


        document
            .getElementById('workout-form')
            .addEventListener('submit', this._newItem.bind(this, 'workout'));

        document
            .getElementById('meal-items')
            .addEventListener('click', this._removeItem.bind(this, 'meal'));

        document
            .getElementById('workout-items')
            .addEventListener('click', this._removeItem.bind(this, 'workout'));

        document
            .getElementById('filter-meals')
            .addEventListener('keyup', this._filterItems.bind(this, 'meal'));

        document
            .getElementById('filter-workouts')
            .addEventListener('keyup', this._filterItems.bind(this, 'workout'));

        document
            .getElementById('reset')
            .addEventListener('click', this._reset.bind(this));

        document
            .getElementById('limit-form')
            .addEventListener('submit', this._setLimit.bind(this));
    }

    // // Add a new Meal
    // _newMeal(e) {
    //     e.preventDefault();

    //     // Get Form Handlers
    //     const name = document.getElementById('meal-name');
    //     const calories = document.getElementById('meal-calories');


    //     // Validate Inputs
    //     if (name.value == '' || calories.value == '') {
    //         alert('Please fill in all fields');
    //         return;
    //     }

    //     // Create new meal
    //     const meal = new Meal(name.value, +calories.value);

    //     // Add meal with the tracker instance
    //     this._tracker.addMeal(meal);

    //     // Clear Form
    //     name.value = '';
    //     calories.value = '';


    //     // Collapse Bootstrap Form
    //     const collapseMeal = document.getElementById('collapse-meal');
    //     const bsCollapse = new bootstrap.Collapse(collapseMeal, {
    //         toggle: true
    //     })

    // }


    // Add a new workout
    // _newWorkout(e) {
    //     e.preventDefault();

    //     // Get Form Handlers
    //     const name = document.getElementById('workout-name');
    //     const calories = document.getElementById('workout-calories');


    //     // Validate Inputs
    //     if (name.value == '' || calories.value == '') {
    //         alert('Please fill in all fields');
    //         return;
    //     }

    //     // Create new workout
    //     const workout = new Workout(name.value, +calories.value);

    //     // Add workout with the tracker instance
    //     this._tracker.addWorkout(workout);

    //     // Clear Form
    //     name.value = '';
    //     calories.value = '';


    //     // Collapse Bootstrap Form
    //     const collapseWorkout = document.getElementById('collapse-workout');
    //     const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
    //         toggle: true
    //     })

    // }



    // Add a new item
    _newItem(type, e) {
        e.preventDefault();

        type = type.toLowerCase();
        // Get Form Handlers
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);


        // Validate Inputs
        if (name.value == '' || calories.value == '') {
            alert('Please fill in all fields');
            return;
        }

        // Create new workout or Meal
        const newItem = (type == 'workout') ? new Workout(name.value, +calories.value) : new Meal(name.value, +calories.value);

        // Add workout or Meal with the tracker instance
        type == 'workout' ? this._tracker.addWorkout(newItem) : this._tracker.addMeal(newItem);

        // Clear Form
        name.value = '';
        calories.value = '';


        // Collapse Bootstrap Form
        const collapseForm = document.getElementById(`collapse-${type}`);
        const bsCollapse = new Collapse(collapseForm, {
            toggle: true
        })

    }



    // Remove Item
    _removeItem(type, e) {
        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            // e.target.parentElement.parentElement.parentElement.remove();

            const id = e.target.closest('.card').getAttribute('data-id');

            type === 'meal'
                ? this._tracker.removeMeal(id)
                : this._tracker.removeWorkout(id);

            e.target.closest('.card').remove();
        }
    }


    _filterItems(type, e) {
        // receive input value
        // filter meal items array
        // filter workout items array
        // render filtered items

        const value = e.target.value.toLowerCase().trim();

        type === 'meal'
            ? this._tracker.filterMealItems(value)
            : this._tracker.filterWorkoutItems(value);

    }

    _reset() {
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value = '';
        document.getElementById('filter-workouts').value = '';
    }

    _setLimit(e) {
        e.preventDefault();


        const limit = document.getElementById('limit');

        if (limit.value === '') {
            alert('Please enter a calorie limit');
            return;
        }

        this._tracker.setLimit(+limit.value);
        limit.value = '';

        const modalElement = document.getElementById('limit-modal');
        const modal = Modal.getInstance(modalElement);
        modal.hide();




    }

}




const app = new App();








// const tracker = new CalorieTracker();


// const breakfast = new Meal('Oatmeal', 350);
// const lunch = new Meal('Rice', 900);
// tracker.addMeal(breakfast);
// tracker.addMeal(lunch);

// const run = new Workout('Morning Run', 450);
// tracker.addWorkout(run);

