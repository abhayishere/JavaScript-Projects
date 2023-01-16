console.log("Welcome to my tic tac toe game")
let bgm=new Audio('./music.mp3')
let gameover=new Audio('./gameover.mp3')
let audioTurn=new Audio('./ting.mp3')
let turn="X";
let win=false;
const changeTurn=()=>{
    return turn==="X"?"0":"X";
}

const checkWin=()=>{
    let winCases=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    let boxes=document.getElementsByClassName('box-text');
    winCases.forEach(e=>{
        if(boxes[e[0]].innerText===boxes[e[1]].innerText && boxes[e[1]].innerText===boxes[e[2]].innerText && boxes[e[0]].innerText!==''){
            console.log(boxes[e[0]].innerText,boxes[e[1]].innerText,boxes[e[2]].innerText)
            document.getElementsByClassName('turn')[0].innerText=turn+" Wins";
            document.querySelector('.img-win').getElementsByTagName('img')[0].style.width="15em";

            win=true
        }

    })
}
// bgm.play();
let boxes=document.getElementsByClassName('box');
Array.from(boxes).forEach(element=>{
    let boxtext=element.querySelector('.box-text') 
    element.addEventListener('click',()=>{
        if(boxtext.innerText===''){
            boxtext.innerText=turn;
            checkWin();
            turn=changeTurn();
            // audioTurn.play();
            console.log(win);
            if(win===false){
                document.getElementsByClassName('turn')[0].innerText="Turn for "+turn;
            }
        }
    })
})

reset.addEventListener('click',()=>{
    let boxtext=document.querySelectorAll('.box-text');
    Array.from(boxtext).forEach(e=>{
        e.innerText="";
    })
    turn="X";
    win=false;
    document.getElementsByClassName('turn')[0].innerText="Turn for "+turn;
    document.querySelector('.img-win').getElementsByTagName('img')[0].style.width="0em";
})