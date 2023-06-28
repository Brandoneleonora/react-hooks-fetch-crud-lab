import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import QuestionItem from "./QuestionItem";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  
  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, [])

  // <li key={question.id}>{question.prompt} <ul>{question.answers.map((answer, index) => <li key={index}>{answer}</li>)}</ul><button className="button" onClick={() => {fetch(`http://localhost:4000/questions/${question.id}`, {
  //     method: "DELETE",
  //   })
  //     .then((r) => r.json())
  //     .then(() => handleDeleteItem(question))}}>Delete</button></li>)
    

    let questionList = questions.map(question => <li key={question.id}><QuestionItem question={question} handleDeleteItem={handleDeleteItem} /></li>)

    function handleNewItem(newItem){
      setQuestions([...questions, newItem ])
    }

    function handleDeleteItem(q){
      setQuestions(questions.filter((question) => question.id !== q.id))
    }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddItem={handleNewItem} /> : <QuestionList questionList={questionList} />}
    </main>
  );
}

export default App;
