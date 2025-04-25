const quizDataFile = "https://raw.githubusercontent.com/babymath/imp-file/refs/heads/main/quizzes.json";

let currentQuizzes = [];
let selectedSubjectGlobal = "";

// Populate subject filter dynamically
fetch(quizDataFile)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const subjectFilter = document.getElementById("subjectFilter");
    subjectFilter.innerHTML = '<option value="">Select Subject</option>';
    const uniqueSubjects = new Set(); // Track unique subjects
    data.Subject.forEach((subject) => {
      const subjectName = subject.Name.toLowerCase().trim();
      if (subject.Total > 0 && !uniqueSubjects.has(subjectName)) { // Skip subjects with Total = 0
        uniqueSubjects.add(subjectName);
        const option = document.createElement("option");
        option.value = subjectName;
        option.textContent = `${subject.Name.trim()}${" ".repeat(20 - subject.Name.trim().length)}(${subject.Total})`;
        subjectFilter.appendChild(option);
      }
    });
  })
  .catch((error) => {
    console.error(`Error loading subjects:`, error);
    document.getElementById("subjectFilter").innerHTML = '<option value="">Error loading subjects</option>';
    document.getElementById("quizList").innerHTML = `<p style='color: red;'>⚠️ Unable to load subjects. Please check your network or the data source URL.</p>`;
  });

document.getElementById("subjectFilter").onchange = function () {
  const selectedSubject = this.value;
  selectedSubjectGlobal = selectedSubject;

  // Convert selectedSubject to title case to match JSON keys
  const normalizedSubject = selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1).toLowerCase();

  const topicFilter = document.getElementById("topicFilter");
  topicFilter.innerHTML = '<option value="All">All</option>';
  document.getElementById("quizList").innerHTML = "<p>Loading quizzes...</p>";
  currentQuizzes = [];

  if (selectedSubject) {
    fetch(quizDataFile)
      .then((response) => response.json())
      .then((data) => {
        const subjectQuizzes = data[normalizedSubject] || [];
        currentQuizzes = subjectQuizzes.map((quiz) => ({
          file: quiz.File,
          topic: quiz.Topic,
          id: quiz.Id, // Extract id directly from JSON
        }));
        populateTopicFilter(currentQuizzes);
        showQuizSelection();
      })
      .catch((error) => {
        console.error(`Error loading quizzes:`, error);
        document.getElementById("quizList").innerHTML = `<p style='color: red;'>⚠️ Unable to load quizzes.</p>`;
      });
  } else {
    document.getElementById("quizList").innerHTML = "<p>Please select a subject.</p>";
  }
};

function populateTopicFilter(quizzes) {
  const topicFilter = document.getElementById("topicFilter");
  topicFilter.innerHTML = '<option value="All">All</option>';
  const topics = [...new Set(quizzes.map((quiz) => quiz.topic))];
  topics.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicFilter.appendChild(option);
  });
}

document.getElementById("topicFilter").onchange = showQuizSelection;

function showQuizSelection() {
  const quizList = document.getElementById("quizList");
  quizList.innerHTML = "";

  const topicFilterValue = document.getElementById("topicFilter").value;

  let filteredQuizzes =
    topicFilterValue === "All"
      ? currentQuizzes
      : currentQuizzes.filter((quiz) => quiz.topic === topicFilterValue);

  if (filteredQuizzes.length === 0) {
    quizList.innerHTML = "<p>No quizzes found for the selected topic.</p>";
  } else {
    const topicCountMap = {};

    filteredQuizzes.forEach((quiz) => {
      const topic = quiz.topic;
      topicCountMap[topic] = (topicCountMap[topic] || 0) + 1;

      const quizTitle = `${quiz.id}<br>${topic}`; // Button name with id and topic separated by <br>
      const btn = document.createElement("button");
      btn.innerHTML = `<i class="fas fa-clipboard-question"></i> ${quizTitle}`;
      btn.onclick = () => loadQuiz(quiz.file, quizTitle, quiz.id); // Pass quiz ID
      btn.setAttribute("aria-label", `Select ${quiz.id} ${topic}`);
      quizList.appendChild(btn);
    });
  }
}

function loadQuiz(fileName, quizTitle, quizId) {
  const queryParams = new URLSearchParams({
    quizFile: fileName,
    quizTitle: quizTitle,
    quizId: quizId, // Include quiz ID in the URL
  }).toString();

  // Reset filter selections
  document.getElementById("subjectFilter").value = "";
  document.getElementById("topicFilter").innerHTML = '<option value="All">All</option>';
  document.getElementById("quizList").innerHTML = "<p>Please select a subject.</p>";

  window.location.href = `quiz.html?${queryParams}`;
}