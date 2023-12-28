var u=Object.defineProperty;var k=(o,e,t)=>e in o?u(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var n=(o,e,t)=>(k(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();class m{constructor(e,t){this.id=t,this.name=e,this.completed=!1}}const c=class c{static addTask(e,t){c.taskList.push(new m(e,t)),d.renderTasks()}static deleteTask(e){const t=c.taskList.findIndex(i=>i.id===Number(e));c.taskList.splice(t,1),d.renderTasks()}static checkTask(e){const t=c.taskList.find(i=>Number(e.target.id)===i.id);t.completed=e.target.checked}static deleteAllTasks(){c.taskList=[],d.renderTasks()}static deleteCompletedTasks(){const e=c.taskList.filter(t=>!t.completed);c.taskList=e}};n(c,"taskList",[{id:1,name:"Finish to do app",completed:!0},{id:2,name:"Reach the end of thought",completed:!1}]),n(c,"getTaskList",()=>c.taskList);let l=c;class d{static initItems(){const e=document.querySelector("[data-clear-completed]"),t=document.querySelector("[data-clear-all]");document.querySelector("[data-task-form]").addEventListener("submit",d.handleTaskForm),t.addEventListener("click",l.deleteAllTasks),e.addEventListener("click",l.deleteCompletedTasks),d.renderTasks()}static handleTaskForm(e){e.target[0].value&&l.addTask(e.target[0].value,Date.now()),e.target[0].value=null,e.preventDefault()}static deleteAllTasks(){const e=document.querySelector("[data-tasks-ul]");for(;e.firstChild;)e.removeChild(e.firstChild)}static renderTasks(){d.deleteAllTasks(),l.getTaskList().forEach(e=>{const t=`
            <li data-task-li class="tasks__item">
              <label class="tasks__label">
                <input data-task-checkbox type="checkbox" class="tasks__input" id="${e.id}">
                <span class="tasks__checkbox"></span>
                <span class="tasks__text">${e.name}</span>
              </label>
              <button data-delete-button class="tasks__delete" id="${e.id}"></button>
            </li>`;document.querySelector("[data-tasks-ul]").insertAdjacentHTML("beforeend",t);const s=document.querySelector(`[data-delete-button][id="${e.id}"]`),a=document.querySelector(`[data-task-checkbox][id="${e.id}"]`);a.addEventListener("change",d.handleTaskCheckbox),s.addEventListener("click",d.deleteTask),a.checked=e.completed})}static deleteTask(e){l.deleteTask(e.target.id)}static handleTaskCheckbox(e){l.checkTask(e)}}d.initItems();
