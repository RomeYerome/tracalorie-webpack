import Storage from './Storage';

`CALORIE TRACKER CLASS`
class CalorieTracker {
    constructor() {
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories();
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkouts();

        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

    }

    // Public Methods/Api
    addMeal(meal) {
        this._meals.push(meal);
        Storage.setMeals(this._meals);
        this._totalCalories += meal.calories;
        Storage.updateTotalCalories(this._totalCalories);
        this._displayNewMeal(meal);
        this._render();
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        Storage.setWorkouts(this._workouts);
        this._totalCalories -= workout.calories;
        Storage.updateTotalCalories(this._totalCalories);
        this._displayNewWorkout(workout);
        this._render();
    }

    removeMeal(id) {
        // const index = this._meals.findIndex(meal => meal.id === id);
        // if (index !== -1) {
        //     const meal = this._meals[index];
        //     this._totalCalories -= meal.calories;
        //     this._meals.splice(index, 1);
        //     this._render();
        // }

        const meal = this._meals.find(meal => meal.id === id);
        this._totalCalories -= meal.calories;
        Storage.updateTotalCalories(this._totalCalories);
        this._meals = this._meals.filter(meal => meal.id !== id);
        Storage.setMeals(this._meals);
        this._render();

    }

    removeWorkout(id) {
        const workout = this._workouts.find(workout => workout.id === id);
        this._totalCalories += workout.calories;
        Storage.updateTotalCalories(this._totalCalories);
        this._workouts = this._workouts.filter(workout => workout.id !== id);
        Storage.setWorkouts(this._workouts);
        this._render();
    }

    filterMealItems(value) {
        // filter meals with value
        this._meals.filter(meal => {
            const mealElement = document.querySelector(`[data-id="${meal.id}"]`);
            if (meal.name.toLowerCase().includes(value))
                mealElement.style.display = 'block';
            else
                mealElement.style.display = 'none';
        });
    }

    filterWorkoutItems(value) {
        // filter workout with value
        this._workouts.filter(workout => {
            const workoutElement = document.querySelector(`[data-id="${workout.id}"]`);
            if (workout.name.toLowerCase().includes(value))
                workoutElement.style.display = 'block';
            else
                workoutElement.style.display = 'none';
        });
    }

    reset() {
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];

        Storage.clearAll();

        this._render();

    }

    setLimit(limit) {
        this._calorieLimit = limit;
        Storage.setCalorieLimit(limit);
        this._displayCaloriesLimit();
        this._render();
    }

    loadItems(items) {
        this._meals.forEach(meal => this._displayNewMeal(meal));
        this._workouts.forEach(workout => this._displayNewWorkout(workout));
    }

    // Private Methods/Api
    _displayCaloriesTotal() {
        const totalCaloriesElement = document.getElementById('calories-total');

        totalCaloriesElement.textContent = this._totalCalories;
    }

    _displayCaloriesLimit() {
        const calorieLimitElement = document.getElementById('calories-limit');

        calorieLimitElement.textContent = this._calorieLimit;
    }

    _displayCaloriesConsumed() {
        const caloriesConsumedElement = document.getElementById('calories-consumed');

        const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0)

        caloriesConsumedElement.textContent = consumed;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedElement = document.getElementById('calories-burned');

        const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0)

        caloriesBurnedElement.textContent = burned;
    }

    _displayCaloriesRemaining() {
        const caloriesRemainingElement = document.getElementById('calories-remaining');

        const progressElement = document.getElementById('calorie-progress');
        const remaining = this._calorieLimit - this._totalCalories;

        caloriesRemainingElement.textContent = remaining;

        if (remaining < 0) {
            caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingElement.parentElement.parentElement.classList.add('bg-danger');

            progressElement.classList.remove('bg-success');
            progressElement.classList.add('bg-danger');
        } else {
            caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingElement.parentElement.parentElement.classList.add('bg-light');

            progressElement.classList.remove('bg-danger');
            progressElement.classList.add('bg-success');
        }
    }

    _displayCaloriesProgress() {
        const progressElement = document.getElementById('calorie-progress');
        const percentage = this._totalCalories / this._calorieLimit * 100;
        const width = Math.min(percentage, 100) || 0;
        progressElement.style.width = `${width}%`;
    }


    _displayNewMeal(meal) {
        const mealItemsElement = document.getElementById('meal-items');

        const mealElement = document.createElement('div');
        mealElement.classList.add('card', 'my-2');

        mealElement.setAttribute('data-id', meal.id);

        mealElement.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
        `;

        mealItemsElement.appendChild(mealElement);


    }


    _displayNewWorkout(workout) {
        const workoutItemsElement = document.getElementById('workout-items');

        const workoutElement = document.createElement('div');
        workoutElement.classList.add('card', 'my-2');

        workoutElement.setAttribute('data-id', workout.id);

        workoutElement.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
        `;

        workoutItemsElement.appendChild(workoutElement);


    }

    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }

}



export default CalorieTracker;