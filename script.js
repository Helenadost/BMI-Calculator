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

    genderBtn.forEach(function (btn, index) {
        btn.onclick = function () {
            genderImg.src = `img/${index}.png`;

            removeClass(genderBtn, "active");
            fillSvg(genderBtn, "#000");
            btn.classList.add("active");
            const svg = btn.querySelector("svg");

            if (svg) {
                svg.style.fill = "#fff";
            }
        };
    });

    function removeClass(elements, className) {
        elements.forEach(function (element) {
            element.classList.remove(className);
        });
    };

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

        if (weightInput < 20 || weightInput > 300) input_ok = false;
        if (heightInput < 50 || heightInput > 250) input_ok = false;

        if (fieldsValidation() && input_ok) {
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

    function showResults() {
        resultBox.style.display = "block";
        classification.style.display = "block";
        gender.style.display = "none";
        calculationBox.style.display = "none";
    };

    function showFalseValue() {
        falseValue.style.display = "block";
    };

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



