document.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelector('#addTaskButton');
    let ul = document.querySelector('#taskList');
    let inp = document.querySelector('#taskInput');
let h1=document.querySelector('h1');
    fetch("http://localhost:8080/getlst")
    .then((result)=>{
       return result.json();
    })
    .then((data)=>{

        for(el of data.val){
        console.log(el.Task);
        let li = document.createElement('li');
            let btnDel = document.createElement('button');
            btnDel.innerHTML = "Delete";
            btnDel.classList.add("delete");
            li.innerHTML =el.Task ;
            li.appendChild(btnDel);
            ul.appendChild(li);
        }
        // console.log(data.val[1].Task);

        
    });

    // fetch('http://localhost:8080/getlst')
    // .then((result)=>{
    //     console.log(result);
    // });

    btn.addEventListener('click', () => {
        if (inp.value !== "") {
            let li = document.createElement('li');
            let btnDel = document.createElement('button');
            btnDel.innerHTML = "Delete";
            btnDel.classList.add("delete");
            let str=inp.value;
            console.log(str);
            li.innerHTML =str ;
            fetch('http://localhost:8080/pst', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: `${str}` })
            }).then((res)=>{
return res.json();
            })
            .then((data)=>{
                console.log(data);
            })
            li.appendChild(btnDel);
            ul.appendChild(li);
            inp.value = "";
        }
    });

    ul.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            console.log(event.target.parentElement.innerText.replace("Delete","").trim());
            let data=event.target.parentElement.innerText.replace("Delete","").trim();
            ul.removeChild(event.target.parentElement);
            fetch('http://localhost:8080/del', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: `${data}` })
            }).then((res)=>{
return res.json();
            })
            .then((data)=>{
                console.log(data);
            });
        }
    });
});
