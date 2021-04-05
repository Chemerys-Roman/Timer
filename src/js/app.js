import  "../css/style.css";
import React , {useEffect} from 'react';
import ReactDOM from 'react-dom';

const rootElement = document.getElementById("root");

function App() {
  const[initTimer,setInitTimer]=React.useState(0);
  const[timerHours,setTimerHours]=React.useState(0);
  const[timerMinutes,setTimerMinutes]=React.useState(0);
  const[timerSeconds,setTimerSeconds]=React.useState(0);
  const[isOnline,setIsOnline]=React.useState(true);
  useEffect(() => {
       setInitTimer(localStorage.userTimer
      ?JSON.parse(localStorage.userTimer).timer
      :0)
  }, [])
  // localStorage.setItem("userTimer", JSON.stringify({timer: initTimer}))
    const handlerVisibility=(event)=>setIsOnline(!event.target.hidden)
    const handlerUnload=()=>{setInitTimer(prevInitTimer=>{localStorage.setItem("userTimer", JSON.stringify({timer: prevInitTimer}));return prevInitTimer;})};
    useEffect(() => {
      window.addEventListener("visibilitychange",handlerVisibility);
      window.addEventListener("beforeunload",handlerUnload);
      let interval=null;
      if(isOnline)
      {interval=setInterval(() => {setInitTimer(prevInitTimer=>prevInitTimer+1)}, 1000);}
      return ()=>{
        if(isOnline){clearInterval(interval)};
        window.removeEventListener("visibilitychange",handlerVisibility);
        localStorage.setItem("userTimer", JSON.stringify({timer: initTimer}));
      };
    }, [isOnline])

    useEffect(() => {
      const hours=Math.floor(initTimer/3600);
      const minutes=Math.floor((initTimer-hours*3600)/60);
      const seconds = initTimer-hours*3600-minutes*60;
      setTimerHours(hours);
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }, [initTimer])
  
    return   <div className="outputElement" >{timerHours<10?"0"+timerHours:timerHours}:{timerMinutes<10?"0"+timerMinutes:timerMinutes}:{timerSeconds<10?"0"+timerSeconds:timerSeconds}</div>
}
ReactDOM.render(<App  />,rootElement);