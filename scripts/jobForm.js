//const baseAPI = "https://employmentdecoderapi.onrender.com/";
const baseAPI = "http://localhost:3000/";
const extURL = "job";

const companyIdValue = localStorage.getItem("_id");

document.getElementById("jobCreateForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    const inputFields = jobCreateForm.querySelectorAll("input, textarea");

    const jobData = {};

    inputFields.forEach(function (input) {
        const fieldName = input.id;
        const fieldValue = input.value;

        if (fieldName === "keywords") {
            jobData[fieldName] = fieldValue.split(",").map(function (value) {
                return value.trim();
            });
        } else {
            if (fieldName && fieldValue) {
                jobData[fieldName] = fieldValue;
            }
        }
    });

    jobData["companyId"] = companyIdValue;

    fetch(baseAPI + extURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
    })
        .then((response) => {
            if (response.ok) {
                jobCreateForm.reset();
                location.assign("../pages/company.html");
                return response.json();
            } else {
                alert("Job Creation Failed Failed, please try again!");
                throw new Error("Job Creation Failed");
            }
        })
        .catch((error) => {
            console.error(error);
        });

    //   TODO: Add a banner for successfuly sign up and change signup to firstname + lastnam
});