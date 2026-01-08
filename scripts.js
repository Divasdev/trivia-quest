let questionsData = [];
let currentQuestionsIndex = 0;

async function fetchQuestions() {
   const response = await fetch("https://opentdb.com/api.php?amount=12&category=19&difficulty=medium&type=multiple");
   const data = await response.json();

   questionsData = data.results;

   console.log(questionsData)

   showQuestions();
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
   questions = questionsData[currentQuestionsIndex];
   console.log(questions);


   indexedquestion = questions.question
   indexedCorrectAnswer = questions.correct_answer;
   indexedIncorrectAnswer = questions.incorrect_answers;

   options = [indexedCorrectAnswer,
      ...indexedIncorrectAnswer];
   console.log(options);

   randomOptions = shuffleCrypto(options)
   console.log(randomOptions);

   const displayOptions = document.querySelectorAll(".question-option");
   displayOptions.forEach((button, index) => {

      button.innerHTML = randomOptions[index];


   });

   const displayQuestion = document.querySelector(".question");

   displayQuestion.innerHTML = indexedquestion;

   let questionOptionList = document.querySelector(".questions-options-list");


   const nextBtn = document.getElementById("next-btn");
   const prevBtn = document.getElementById("prev-btn");

   nextBtn.addEventListener('click', ()=>{
      if (currentQuestionsIndex< questionsData.length){

          currentQuestionsIndex++;
      showQuestions();

      }
     
   } );

   prevBtn.addEventListener('click',()=>{
      if (currentQuestionsIndex >0){
          currentQuestionsIndex--;
      showQuestions();
      }
     
   })







}