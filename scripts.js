async function fetchQuestions(){
   const response = await fetch("https://opentdb.com/api.php?amount=12&category=19&difficulty=medium&type=multiple");
   const data= await response.json();

   console.log(data)
}


fetchQuestions();