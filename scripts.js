let questionsData = [];
let currentQuestionsIndex = 0;

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


const displayOptions = document.querySelectorAll(".question-option");

displayOptions.forEach((button) => {
   // 1. Remove the feedback classes
   button.classList.remove("correct", "wrong");

   // 2. Re-enable clicking (important since we disabled it!)
   button.style.pointerEvents = "auto";
   button.style.opacity = "1";
   
   // 3. Clear the background color if you set it manually
   button.style.backgroundColor = ""; 
});




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


   const quesNO=document.getElementById("js-header-line");
    quesNO.innerHTML=`Questions ${currentQuestionsIndex +1 }  of  ${questionsData.length}`;
}


const optionList = document.querySelector(".questions-options-list");

optionList.addEventListener("click", (event) => {

   if (!event.target.classList.contains("question-option")) return;

   const clickedButton = event.target;
   const selectedAnswer = clickedButton.innerText;
   const correctAnswer = questionsData[currentQuestionsIndex].correct_answer;
   const currentScore=document.getElementById("current-score");
   if (selectedAnswer === correctAnswer) {
      clickedButton.classList.add("correct");
      currentScore.innerHTML= currentQuestionsIndex;
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
       alert("Quiz Finished!");
       // Maybe show a "Final Score" screen here? 🏁
   }
});

   prevBtn.addEventListener('click',()=>{
      if (currentQuestionsIndex >0){
          currentQuestionsIndex--;
      showQuestions();
      }
     
   })

   







