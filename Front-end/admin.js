console.log("whatever");

let addCourse_btn = document.getElementById("addCourse_btn");
let updateCourse_btn = document.getElementById("updateCourse_btn");
let deleteCourse_btn = document.getElementById("deleteCourse_btn");
let addTopic_btn = document.getElementById("addTopic_btn");

let addCourseTab = document.getElementById("addCourseTab");
let updateCourseTab = document.getElementById("updateCourseTab");
let deleteCourseTab = document.getElementById("deleteCourseTab");
let addTopicTab = document.getElementById("addTopicTab");

addCourse_btn.addEventListener("click", function () {
  addCourseTab.style.display = "block";
  updateCourseTab.style.display = "none";
  deleteCourseTab.style.display = "none";
  addTopicTab.style.display = "none";
});
updateCourse_btn.addEventListener("click", function () {
  updateCourseTab.style.display = "block";
  deleteCourseTab.style.display = "none";
  addCourseTab.style.display = "none";
  addTopicTab.style.display = "none";
});
deleteCourse_btn.addEventListener("click", function () {
  deleteCourseTab.style.display = "block";
  updateCourseTab.style.display = "none";
  addCourseTab.style.display = "none";
  addTopicTab.style.display = "none";
});
addTopic_btn.addEventListener("click", function () {
  addTopicTab.style.display = "block";
  deleteCourseTab.style.display = "none";
  updateCourseTab.style.display = "none";
  addCourseTab.style.display = "none";
});

// #############################################################################################

let addCourseSubmit_btn = document.getElementById("addCourseSubmit_btn");
let updateCourseSubmit_btn = document.getElementById("updateCourseSubmit_btn");
let deleteCourseSubmit_btn = document.getElementById("deleteCourseSubmit_btn");
let addTopicSubmit_btn = document.getElementById("addTopicSubmit_btn");

addCourseSubmit_btn.addEventListener("click", async () => {
  let addTab = document.getElementById("addTab");
  addTab.innerHTML = "";
  let courseName = document.getElementById("course_title").value;
  let courseDesc = document.getElementById("describe").value;
  let url = new URL("http://127.0.0.1:3000/courses/addCourse");
  let result = await addCourse(url, courseName, courseDesc);
  result = await result.json();

  if (!result.CourseName || !result.CourseDescription) {
    addTab.innerHTML = `<h1 class = text-warning><strong>Error! check your inputs</strong></h1>`;
  } else {
    addTab.innerHTML = `
  <h1 class="text-center fs-3">Course Created Successfully, below are the details.</h1>
  <h3>Course Id: ${result.id}</h3>
  <h3>Course Name: ${result.CourseName}</h3>
  <p>Course Description: ${result.CourseDescription}</p>
  `;
  }
});

updateCourseSubmit_btn.addEventListener("click", async () => {
  let updateTab = document.getElementById("updateTab");
  updateTab.innerHTML = "";
  let oldCourseName = document.getElementById("course_name_old").value;
  let newCourseName = document.getElementById("course_name_new").value;
  let newCourseDesc = document.getElementById("describe_new").value;

  let result = await updateCourse(oldCourseName, newCourseName, newCourseDesc);
  result = await result.json();

  if (!result.id) {
    updateTab.innerHTML = `<h1 class = text-warning><strong>Error! check your inputs</strong></h1>`;
  } else {
    updateTab.innerHTML = `<h1 class="text-center fs-3">Course Updated Successfully, below are the details.</h1>
    <h3>Course Id: ${result.id}</h3>
    <h3>Course New Name: ${result.CourseName}</h3>
    <p>New Description: ${result.CourseDescription}</p>`;
  }
});

deleteCourseSubmit_btn.addEventListener("click", async () => {
  let deleteTab = document.getElementById("deleteTab");
  deleteTab.innerHTML = "";
  let courseName = document.getElementById("course_name_del").value;
  courseName = String(courseName);
  let result = await deleteCourse(courseName);
  result = await result.json();

  if (!result.id) {
    deleteTab.innerHTML = `<h1 class = text-warning><strong>Error! check your inputs</strong></h1>`;
  } else {
    deleteTab.innerHTML = `<h1 class="text-center fs-3">The following course has been deleted successfully</h1>
    <h3>Course Id: ${result.id}</h3>
    <h3>Course Name: ${result.CourseName}</h3>
    <p>Description: ${result.CourseDescription}</p>`;
  }
});

addTopicSubmit_btn.addEventListener("click", async () => {
  let addTopicTab = document.getElementById("addTopicTab");
  // addTopicTab.innerHTML = "";

  let topicCourse = document.getElementById("topic_course_topic").value;
  let topicTitle = document.getElementById("topic_title").value;
  let topicBody = document.getElementById("topic_body").value;
  let videoLink = document.getElementById("topic_link").value;
  let audioLink = document.getElementById("topic_link_audio").value;
  let topicTranscript = document.getElementById("topic_transcript").value;
  console.log(
    topicCourse,
    topicTitle,
    topicBody,
    videoLink,
    audioLink,
    topicTranscript
  );
  let result = await addTopic(
    topicCourse,
    topicTitle,
    topicBody,
    videoLink,
    audioLink,
    topicTranscript
  );
  result = await result.json();

  if (!result.id) {
    addTopicTab.innerHTML = `<h1 class = text-warning><strong>Error! check your inputs</strong></h1>`;
  } else {
    addTopicTab.innerHTML = `<h1 class="text-center fs-3">The following topic has been added successfully</h1>
    <h3>Course Id: ${result.id}</h3>
    <h3>Topic Title: ${result.TopicName}</h3>
    <p>Description: ${result.content}</p>`;
  }
});

async function addCourse(url, courseName, courseDesc) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: courseName,
      desc: courseDesc,
    }),
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
  });
}

async function updateCourse(oldCourseName, newName, newDesc) {
  let url = new URL("http://127.0.0.1:3000/courses/updateCourse");
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify({
      id: oldCourseName,
      newName: newName,
      newDesc: newDesc,
    }),
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
  });
}

async function deleteCourse(courseName) {
  let url = new URL("http://127.0.0.1:3000/courses/deleteCourse");
  return fetch(url, {
    method: "DELETE",
    body: JSON.stringify({
      name: courseName,
    }),
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
  });
}

async function addTopic(course, title, content, video, audio, transcript) {
  let url = new URL("http://127.0.0.1:3000/courses/addTopic");
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      courseName: course,
      title: title,
      content: content,
      videoUrl: video,
      audioUrl: audio,
      videoTranscript: transcript,
    }),
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
  });
}
