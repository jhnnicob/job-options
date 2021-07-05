document.querySelector(".button__container")
    .addEventListener('click', () => {
        let text = document.getElementById("filter-jobs").value;
        getJobs().then(jobs => {
            let filteredJob = filterJobs(jobs, text);
            showJobs(filteredJob);
            // console.log("Filter jobs", filteredJob);
        });
    })


function getJobs() {
    return fetch("data.json")
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

function filterJobs(jobs, searchText) {
    if(searchText) {
        let filteredJobs = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText) ||
                job.type.toLowerCase().includes(searchText) ||
                job.company.toLowerCase().includes(searchText) ||
                job.location.toLowerCase().includes(searchText) ||
                job.requirements.content.toLowerCase().includes(searchText)) {
                return true;
            }else {
                return false;
            }
        });
        return filteredJobs;
    }else {
        return jobs;
    }
}

function showJobs(jobs) {
    console.log("Jobs in showJobs", jobs)
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    jobs.forEach(job => {
  
        jobsHTML += `
            <div class="job-card">
                <div class="top">
                    <img src="${job.logo}" />
                    <i class="material-icons">more_horiz</i>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        Apply Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>
            </div>
        `
    });
    jobsContainer.innerHTML = jobsHTML;
}

getJobs().then(data => {
    showJobs(data)
});