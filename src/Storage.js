`STORAGE CLASS`
class Storage {
    static getMeals() {
        let meals;
        if (localStorage.getItem('meals') === null)
            meals = [];
        else
            meals = JSON.parse(localStorage.getItem('meals'));

        return meals;
    }

    static getWorkouts() {
        let workouts;
        if (localStorage.getItem('workouts') === null)
            workouts = [];
        else
            workouts = JSON.parse(localStorage.getItem('workouts'));

        return workouts;
    }

    static getCalorieLimit() {
        let calorieLimit;
        if (localStorage.getItem('calorieLimit') === null)
            calorieLimit = 1800;
        else
            calorieLimit = +localStorage.getItem('calorieLimit');

        return calorieLimit;
    }

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    }

    static getTotalCalories() {
        let totalCalories;

        if (localStorage.getItem('totalCalories') === null)
            totalCalories = 0;
        else
            totalCalories = +localStorage.getItem('totalCalories');

        return totalCalories;
    }

    static updateTotalCalories(calories) {
        localStorage.setItem('totalCalories', calories);
    }


    static setMeals(meals) {
        localStorage.setItem('meals', JSON.stringify(meals));
    }

    static setWorkouts(workouts) {
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static clearAll() {
        localStorage.removeItem('meals');
        localStorage.removeItem('workouts');
        localStorage.removeItem('totalCalories');

        // If you want to clear everything including the calorie limit 
        // localStorage.clear();
    }
}


export default Storage;