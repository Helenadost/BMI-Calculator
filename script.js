'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const gender = document.querySelector(".gender");
    const genderImg = document.getElementById("gender_img");
    const genderBtn = document.querySelectorAll(".gender_btn");
    const weight = document.getElementById("weight");
    const height = document.getElementById("height");
    const calculationBox = document.querySelector(".calculation_box");
    const calculation = document.getElementById('calculation');
    const falseValue = document.getElementById("false_value");
    const resultBox = document.querySelector(".result_box");
    const resultElement = document.getElementById("result");
    const resultComment = document.getElementById("result_comment");
    const classification = document.querySelector(".classification");
    const restart = document.getElementById('restart');

    // iterate over each gender button
    genderBtn.forEach(function (btn, index) {
        btn.onclick = function () {
            // change img src on click
            genderImg.src = `img/${index}.png`;

            // remove class "active" from all buttons
            removeClass(genderBtn, "active");
            // Set fill to black for all SVG elements
            fillSvg(genderBtn, "#000");
            // Add class "active" to the button that was just clicked
            btn.classList.add("active");
            // Find the SVG within the parent element of the currently clicked button and set the fill to a different color
            const svg = btn.querySelector("svg");
            if (svg) {
                svg.style.fill = "#fff";
            }
        };
    });

    // Function for removing a class from multiple elements
    function removeClass(elements, className) {
        elements.forEach(function (element) {
            element.classList.remove(className);
        });
    };

    // Functions for setting fill for all SVG elements within a given element list
    function fillSvg(elements, fill) {
        elements.forEach(function (element) {
            const svg = element.querySelector("svg");
            if (svg) {
                svg.style.fill = fill;
            }
        });
    };

    calculation.onclick = function () {
        const weightInput = weight.value;
        const heightInput = height.value;
        let input_ok = true;

        // The if conditions verify that the input values are within the specified range and set input_ok to true
        if (weightInput < 20 || weightInput > 300) input_ok = false;
        if (heightInput < 50 || heightInput > 250) input_ok = false;

        // The if condition checks if all input fields are valid (not empty and contain a number) and input_ok is true
        if (fieldsValidation() && input_ok) {
            // BMI calculation
            const result = (Number(weightInput) / (Number(heightInput / 100) * (heightInput / 100))).toFixed(2);
            resultElement.innerHTML = result;

            if (result == 0 || isNaN(result) || !isFinite(result)) {
                showFalseValue();
            } else {
                showResults();
            };

            if (result < 18.5) {
                resultComment.innerHTML = 'Underweight'
            } else if (result >= 18.5 && result <= 24.99) {
                resultComment.innerHTML = 'Normal weight'
            } else if (result >= 25 && result <= 29.99) {
                resultComment.innerHTML = 'Overweight'
            } else if (result >= 30 && result <= 34.99) {
                resultComment.innerHTML = 'Obesity'
            } else if (result >= 35) {
                resultComment.innerHTML = 'Extreme obesity'
            }

        } else {
            showFalseValue();
        }
    };

    // function to display the result
    function showResults() {
        resultBox.style.display = "block";
        classification.style.display = "block";
        gender.style.display = "none";
        calculationBox.style.display = "none";
    };

    // function to display invalid data notification
    function showFalseValue() {
        falseValue.style.display = "block";
    };

    // The fieldsValidation() function checks if the input fields are valid and returns true or false
    function fieldsValidation() {
        if (weight.value.trim() > "" && !isNaN(weight.value.trim())) {
            if (height.value.trim() > "" && !isNaN(height.value.trim())) {
                return true;
            } else return false;
        } else return false;
    }

    // restart function
    restart.onclick = function () {
        weight.value = null;
        height.value = null;
        resultBox.style.display = "none";
        classification.style.display = "none";
        gender.style.display = "block";
        calculationBox.style.display = "block";
        falseValue.style.display = "none";
    };
});



