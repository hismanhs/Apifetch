import "./App.css";
import React, { useState, useEffect } from "react";

export const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/episode/")
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
    <div class="jumbotron text-center">
      <h1>Assignment</h1>
    </div>
      
    <div class="container">
      <div class="row mb-3">
        <div class="col-sm-12">
          <h2 class="text-danger">Search</h2>
          <div>
            <input type="text" placeholder="search episode" onChange={(event)=>{
              fetch(`https://rickandmortyapi.com/api/episode?name=${event.target.value}`)
              .then(response => response.json())
              .then(data => setData(data))
            }}/>
          </div>
        </div>
      </div>

      <div class="row">
        {data && data.results && data.results.map(item => (
          <div class="col-sm-4 shadow-lg p-3 mb-5 bg-white rounded m-1">
             <h2 class="text-primary">{item.name}</h2>
              <p class="text-info">{item.episode}</p>
              <p class="text-secondary">{item.air_date}</p>
          </div>
        ))}
      </div>

      <div class="pagination">
           <a 
            href="javascript:void(0)" 
            onClick={
              ()=>{
                return data && data.info && data.info.prev ? 
                fetch(data.info.prev)
                .then(response => response.json())
                .then(data => setData(data))
                :
                null
              }}
            class={data && data.info && data.info.prev === null ?'disabled':''}
          >&laquo;</a>
           <a 
            href="javascript:void(0)" 
            onClick={()=>{
              return data && data.info && data.info.next ? 
                fetch(data.info.next)
                .then(response => response.json())
                .then(data => setData(data))
                :
                null
            }}
            class={data && data.info && data.info.next === null ?'disabled':''}
            >&raquo;</a>
      </div>
    </div>
   </div>
  );
}