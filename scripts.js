let questionsData=[];
let currentQuestionsIndex=0;

async function fetchQuestions(){
   const response = await fetch("https://opentdb.com/api.php?amount=12&category=19&difficulty=medium&type=multiple");
   const data= await response.json();

    questionsData=data.results;

   console.log(questionsData)

   showQuestions();
}


fetchQuestions();

function showQuestions(){
   questions=questionsData[currentQuestionsIndex];
   console.log(questions);


   indexedquestion=questions.question
   indexedCorrectAnswer=questions.correct_answer;
   indexedIncorrectAnswer=questions.incorrect_answers;

    options=[indexedCorrectAnswer,indexedIncorrectAnswer];
   shuffle(options);
    console.log(options);

   

   const displayQuestion=document.querySelector(".question");

   displayQuestion.innerHTML= indexedquestion;
   



}