const main = document.querySelector("#main"); //var은 변수 const는 상수
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 10;
const select = [0,0,0,0,0,0,0,0,0,0];

function calResult(){
    var result = select.indexOf(Math.max(...select));/*inedexof 인덱스 반환 Math.max로 인해서 최대값 반환 ...은 전개구문 선택 배열을 펼쳐줌*/
    return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img'); //이미지 생성
    const imgDiv = document.querySelector('#resultImg'); //이미지를 담을 태그
    var imgURL = 'imgs/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

/*결과 내보내기*/
function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s"; /*1초 동안*/
    qna.style.animation="fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation="fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)});
        
    setResult();
}

/*버튼 만들기*/
function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button'); /*버튼 만들어줌*/
    answer.classList.add('answerList'); /*answerList에 버튼을 담음*/
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);/*버튼이 a에 소속되게*/
    answer.innerHTML = answerText;
   
    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i =0; i<children.length; i++){
            children[i].disabled = true; /*버튼 비활성화*/
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        /*해당 값의 수를 올려줌*/
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let i=0; i<target.length; i++){
                select[target[i]] += 1;
            }
            for(let i=0; i<children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450) 
    },false);
}

/*다음 페이지로 넘어가게 */
function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx ,i);
    }
    /*질문이 진행될때마다 statusBar가 채워짐*/
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

/*beign 이라는 함수는 display켜주고 꺼줌.*/
function begin(){
    main.style.WebkitAnimation = "fadeOut 1s"; /*1초 동안*/
    main.style.animation="fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation="fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}