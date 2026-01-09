let questionsData = [];
let currentQuestionsIndex = 0;
let score = 0; // FIXED: Defined global score variable

async function fetchQuestions() {
   try {
      const response = await fetch(
         "https://opentdb.com/api.php?amount=12&category=19&difficulty=medium&type=multiple"
      );

      if (!response.ok) {
         throw new Error("API rate limit or network error");
      }

      const data = await response.json();

      if (data.response_code !== 0) {
         throw new Error("API returned an error response (code " + data.response_code + ")");
      }

      if (!data.results || data.results.length === 0) {
         throw new Error("No questions received");
      }

      questionsData = data.results;
      showQuestions();

   } catch (error) {
      console.error("Fetch failed:", error.message);

      alert(
         "⚠️ Quiz failed to load!\n\n" +
         "Reason: " + error.message + "\n\n" +
         "This usually happens because:\n" +
         "• The API rate limit was exceeded\n" +
         "• Internet connection issue\n\n" +
         "Please refresh after a few seconds."
      );
   }
}

fetchQuestions();

function shuffleCrypto(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const randomBuffer = new Uint32Array(1);
      crypto.getRandomValues(randomBuffer);
      const j = randomBuffer[0] % (i + 1);
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}

function showQuestions() {
   if (!questionsData || questionsData.length === 0) return;

   const currentData = questionsData[currentQuestionsIndex];
   if (!currentData) return;

   const displayOptions = document.querySelectorAll(".question-option");
   displayOptions.forEach((button) => {
      button.classList.remove("correct", "wrong");
      button.style.pointerEvents = "auto";
      button.style.opacity = "1";
      button.style.backgroundColor = ""; 
   });

   const allOptions = [currentData.correct_answer, ...currentData.incorrect_answers];
   const randomOptions = shuffleCrypto(allOptions);

   const displayQuestion = document.querySelector(".question");
   displayQuestion.innerHTML = currentData.question;

   displayOptions.forEach((button, index) => {
      button.innerHTML = randomOptions[index];
   });

   const quesNO = document.getElementById("js-header-line");
   quesNO.innerHTML = `Questions ${currentQuestionsIndex + 1} of ${questionsData.length}`;
}

const optionList = document.querySelector(".questions-options-list");

optionList.addEventListener("click", (event) => {
   if (!event.target.classList.contains("question-option")) return;

   const clickedButton = event.target;
   const selectedAnswer = clickedButton.innerText;
   const correctAnswer = questionsData[currentQuestionsIndex].correct_answer;
   const currentScoreUI = document.getElementById("current-score");

   if (selectedAnswer === correctAnswer) {
      clickedButton.classList.add("correct");
      // FIXED: Increment the actual score and update UI
      score++; 
      currentScoreUI.innerHTML = score; 
   } else {
      clickedButton.classList.add("wrong");
   }

   const allOptions = document.querySelectorAll(".question-option");
   allOptions.forEach(btn => {
      btn.style.pointerEvents = "none";
      if (btn !== clickedButton) btn.style.opacity = "0.5";
   });
});

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

nextBtn.addEventListener('click', () => {
   if (currentQuestionsIndex < questionsData.length - 1) {
       currentQuestionsIndex++;
       showQuestions();
   } else {
      showResults();
   }
});

prevBtn.addEventListener('click', () => {
   if (currentQuestionsIndex > 0) {
      currentQuestionsIndex--;
      showQuestions();
   }
});

function showResults() {
    const resultContainer = document.getElementById("result-container");
    const finalScoreDisplay = document.getElementById("final-score");
    const questionContainer = document.querySelector(".question-container"); 
    const feedback = document.getElementById("feedback-msg");
    
    // Calculate performance message
    const percentage = (score / questionsData.length) * 100;
    if (percentage >= 80) feedback.innerText = "Exceptional Accuracy!";
    else if (percentage >= 50) feedback.innerText = "Solid Performance.";
    else feedback.innerText = "Data incomplete. Try again.";

    // 3. 3D Receding Effect
   if(questionContainer) {
        // This pushes the background back in 3D space
        questionContainer.style.transform = "perspective(1000px) translateZ(-150px) rotateX(2deg)";
        questionContainer.style.filter = "brightness(0.3) blur(4px)";
        questionContainer.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
    }
  
    finalScoreDisplay.innerText = `${score}/${questionsData.length}`;
    resultContainer.style.display = "flex"; 
}