async function renderCourses() {
  let url = new URL("http://127.0.0.1:3000/courses/allCourses");
  return fetch(url).then((data) => {
    return data.json();
  });
}
renderCourses().then((res) => {
  let size = res.length;
  let theHtml = "";
  for (let i = 0; i < size; i++) {
    theHtml += `<div class="card my-1">
       <div class="card-body shadow p-3 mb-1 bg-body-tertiary rounded">
         <h5 class="card-title bg-info">
           <button class = "courseNamebtn" value = "${res[i].CourseName}">${res[i].CourseName}</button>
         </h5>
         <p class="card-text">
           ${res[i].CourseDescription}
         </p>
       </div>
     </div>`;
  }
  let cooon = document.getElementById("cooon");
  cooon.innerHTML = theHtml;
  renderTopics(document.getElementsByClassName("courseNamebtn"));
});

async function renderTopics(topicBtns) {
  let url = new URL("http://127.0.0.1:3000/courses/allTopics");
  for (let i = 0; i < topicBtns.length; i++) {
    topicBtns[i].addEventListener("click", async function () {
      let result = await fetch(url, {
        method: "POST",
        headers: {
          Connection: "keep-alive",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CourseName: topicBtns[i].value,
        }),
      });
      result = await result.json();
      console.log(result);
      let thehtmlq = "";
      let size = result.length;
      for (let i = 0; i < size; i++) {
        thehtmlq += `
                <div class="shadow p-3 mb-1 bg-body-tertiary rounded">
            <h1 class="fs-2 fw-bold text-center">${result[i].TopicName}</h1>
            <div class="row">
              <div class="col-12 col-md-6">
                <p style="text-align: justify">
                  ${result[i].content}
                </p>

                <button
                  class="btn btn-primary main__ask"
                  type="button"
                  name="contact-us"
                >
                  Ask a questions
                </button>
              </div>
              <div class="col-12 col-md-6 text-center py-2">
              
                <video class="section1__item section1__item--video main__iframe w-100" controls>
                  <source src="${result[i].video}" type="video/mp4" />
                  <track
                    src="videos/captions.vtt"
                    kind="captions"
                    label="English"
                    srclang="en"
                  />
                </video>
                <button
                  id="btn1"
                  class="btn btn-primary my-2"
                  type="button"
                  name="show transcript1"
                >
                  Video Transcript
                </button>
                <button
                  id="abtn1"
                  class="btn btn-primary my-2"
                  type="button"
                  name="listen to audio1"
                >
                  Listen to audio
                </button>
              </div>

              <div
                class="transcript"
                id="transcript1"
                style="display: none; text-align: justify"
              >
                <h4 class="main__min-header">Transcript</h4>
                <p>
                  ${result[i].videoTranscript}
                </p>
              </div>
              <div class="main__audio" id="audio1" style="display: none">
                <audio
                  src="${result[i].audio}"
                  controls
                ></audio>
              </div>
            </div>
          </div>
                `;
      }
      localStorage.setItem("key", thehtmlq);
    });
  }
}
