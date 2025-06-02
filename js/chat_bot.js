let step = 0;
let data = {};
const messages = document.getElementById("messages");

const bot = (text) => {
    const el = document.createElement("div");
    el.className = "msg bot";
    el.innerText = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
}

const user = (text) => {
    const el = document.createElement("div");
    el.className = "msg user";
    el.innerText = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
}

const questions = [
    "Привет! Я помогу с переездом. Как вас зовут?",
    "Из какого города вы переезжаете?",
    "В какой город планируете переезд?",
    "На какую дату планируете?",
    "Есть ли лифт в месте загрузки (да/нет)?",
    "На каком этаже находятся вещи?",
    "Какой объем или сколько комнат примерно?",
    "Есть ли что-то, что стоит знать заранее? (мебель, упаковка и т.д.)"
];

const nextStep = () => {
    if (step < questions.length) {
        bot(questions[step]);
    } else {
        bot("Спасибо! Информация передана нашему оператору. Мы свяжемся с вами для уточнения цены.");
        fetch("https://telegram-server-hask.onrender.com/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }
}

const sendMessage = () => {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    user(text);
    input.value = "";

    switch (step) {
        case 0: data.name = text; break;
        case 1: data.from = text; break;
        case 2: data.to = text; break;
        case 3: data.date = text; break;
        case 4: data.elevator = text; break;
        case 5: data.floor = text; break;
        case 6: data.volume = text; break;
        case 7: data.comment = text; break;
    }

    step++;
    setTimeout(nextStep, 400);
};

window.onload = nextStep;