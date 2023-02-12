let ask = document.querySelector("click", function () {
  window.open("contact-us.html", "_blank");
});

let tbtn1 = document.getElementById("btn1");
let trans1 = document.getElementById("transcript1");
let isT1Displayed = false;
tbtn1.addEventListener("click", function () {
  if (isT1Displayed) {
    trans1.style.display = "none";
    isT1Displayed = false;
  } else {
    trans1.style.display = "block";
    isT1Displayed = true;
  }
});

let abtn1 = document.getElementById("abtn1");
let audio1 = document.getElementById("audio1");
let isA1Displayed = false;
abtn1.addEventListener("click", function () {
  if (isA1Displayed) {
    audio1.style.display = "none";
    isA1Displayed = false;
  } else {
    audio1.style.display = "block";
    isA1Displayed = true;
  }
});
let tbtn2 = document.getElementById("btn2");
let trans2 = document.getElementById("transcript2");
let isT2Displayed = false;
tbtn1.addEventListener("click", function () {
  if (isT2Displayed) {
    trans2.style.display = "none";
    isT2Displayed = false;
  } else {
    trans2.style.display = "block";
    isT2Displayed = true;
  }
});

let abtn2 = document.getElementById("abtn2");
let audio2 = document.getElementById("audio2");
let isA2Displayed = false;
abtn1.addEventListener("click", function () {
  if (isA2Displayed) {
    audio2.style.display = "none";
    isA2Displayed = false;
  } else {
    audio2.style.display = "block";
    isA2Displayed = true;
  }
});
let tbtn3 = document.getElementById("btn3");
let trans3 = document.getElementById("transcript3");
let isT3Displayed = false;
tbtn1.addEventListener("click", function () {
  if (isT3Displayed) {
    trans3.style.display = "none";
    isT3Displayed = false;
  } else {
    trans3.style.display = "block";
    isT3Displayed = true;
  }
});

let abtn3 = document.getElementById("abtn3");
let audio3 = document.getElementById("audio3");
let isA3Displayed = false;
abtn1.addEventListener("click", function () {
  if (isA3Displayed) {
    audio3.style.display = "none";
    isA3Displayed = false;
  } else {
    audio3.style.display = "block";
    isA3Displayed = true;
  }
});

//###############################################################

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

      window.open("courses.html");
    });
  }
}
