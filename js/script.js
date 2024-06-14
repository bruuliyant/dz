let doc = document;
let wrapper = doc.querySelector('.wrapper');
let inp = doc.querySelector('input');
let btn = doc.querySelector('button');

axios.get('http://localhost:3527/todos')
    .then(res => {
        let data = res.data;
        console.log(data);
        get_card(data);
    })
    .catch(err => console.log(err));

inp.addEventListener('input', () => {
    txt_inp = inp.value;
    console.log(txt_inp);
});

btn.addEventListener("click", () => {
    let txt_inp = inp.value;
    let date = new Date();
    let time = `${date.getHours()}:${date.getUTCMinutes()}`;

    let obj = {
        title: txt_inp,
        time: time
    };

    axios.post('http://localhost:3527/todos', obj)
        .then(res => {
            get_card([res.data]);
        })
        .catch(err => console.log(err));
    event.preventDefault();
});

let get_card = (arr) => {
    for (let item of arr) {
        let div = doc.createElement('div');
        let p = doc.createElement('p');
        let time = doc.createElement('p');
        let cross = doc.createElement('img');

        p.textContent = item.title;
        time.textContent = item.time;
        cross.src = './img/4879885_close_cross_delete_remove_icon.png';

        div.classList.add('card');
        cross.classList.add('cross');
        time.classList.add('time');

        wrapper.append(div);
        div.append(p);
        div.append(time);
        div.append(cross);

        cross.addEventListener('click', () => {
            axios.delete(`http://localhost:3527/todos/${item.id}`)
                .then(() => {
                    div.remove();
                })
                .catch(err => console.log(err));
        });
    }
};